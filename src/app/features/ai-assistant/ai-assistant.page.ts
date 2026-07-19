import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AiAssistant, AiChatMessage } from './services/ai-assistant';

interface ChatMessage {
  from: 'user' | 'ai';
  text: string;
  quickReplies?: string[];
}

const WELCOME_TEXT =
  ' Aide intelligente à la rédaction\nQue souhaitez-vous faire aujourd’hui ?';

const QUICK_REPLIES = [
  ' Générer un article',
  ' Résumer texte',
  ' Proposer un titre',
  ' Corriger un texte',
];

// Nombre de messages précédents envoyés à l'IA pour conserver le contexte
const MAX_CONTEXT_MESSAGES = 20;

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.page.html',
  styleUrls: ['./ai-assistant.page.scss'],
  standalone: false,
})
export class AiAssistantPage implements OnInit {
  messages: ChatMessage[] = [];
  inputText = '';
  step = 0;
  resultText = '';
  lastUserMessage = '';
  lastQuickReplies: string[] = [];
  showQuickReplies = false;
  isLoading = false;
  isHistoryLoading = true;

  private userId: number | null = null;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private geminiService: AiAssistant,
  ) {}

  ngOnInit() {
    this.userId = this.getCurrentUserId();
    this.loadHistory();
  }

  private getCurrentUserId(): number | null {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return null;
      const user = JSON.parse(raw);
      return user?.id ?? null;
    } catch {
      return null;
    }
  }

  private loadHistory() {
    if (!this.userId) {
      // Pas d'utilisateur identifié : on ne peut pas persister, on démarre simplement le bot
      this.isHistoryLoading = false;
      this.startBot();
      return;
    }

    this.geminiService.getHistory(this.userId).subscribe({
      next: (history) => {
        this.isHistoryLoading = false;
        if (history && history.length > 0) {
          this.messages = history.reduce<ChatMessage[]>((acc, h) => {
            acc.push({ from: 'user', text: h.question });
            acc.push({ from: 'ai', text: h.resultat });
            return acc;
          }, []);
        } else {
          this.startBot();
        }
      },
      error: () => {
        // Backend indisponible (hors-ligne) : on démarre quand même une conversation locale
        this.isHistoryLoading = false;
        this.startBot();
      },
    });
  }

  startBot() {
    this.messages.push({
      from: 'ai',
      text: WELCOME_TEXT,
      quickReplies: QUICK_REPLIES,
    });

    this.lastQuickReplies = QUICK_REPLIES;
    this.showQuickReplies = false;
  }

  askForTopic() {
    this.messages.push({
      from: 'ai',
      text: 'Très bien \nQuel est le sujet de l’article ?',
    });
    this.step = 1;
  }

  askForTextToSummarize() {
    this.messages.push({
      from: 'ai',
      text: ' Collez le texte à résumer.',
    });
    this.step = 2;
  }
  askForTitle() {
    this.messages.push({
      from: 'ai',
      text: ' Collez le texte à titre.',
    });
    this.step = 3;
  }
  askForCorrection() {
    this.messages.push({
      from: 'ai',
      text: ' Collez le texte à titre.',
    });
    this.step = 4;
  }

  handleQuickReply(reply: string) {
    this.messages.push({
      from: 'user',
      text: reply,
    });

    this.showQuickReplies = false;

    switch (reply) {
      case ' Générer un article':
        this.askForTopic();
        break;
      case ' Résumer texte':
        this.askForTextToSummarize();
        break;
      case ' Proposer un titre':
        this.askForTitle();
        break;
      case ' Corriger un texte':
        this.askForCorrection();
        break;
    }
  }
  toggleQuickReplies() {
    this.showQuickReplies = !this.showQuickReplies;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  sendToAI() {
    if (!this.inputText || !this.inputText.trim()) return;

    const userText = this.inputText.trim();

    this.messages.push({
      from: 'user',
      text: userText,
    });

    this.inputText = '';

    let prompt = '';

    switch (this.step) {
      case 1:
        prompt = `Rédige un article professionnel sur le sujet suivant : ${userText}`;
        break;

      case 2:
        prompt = `Résume ce texte de manière claire et concise : ${userText}`;
        break;

      case 3:
        prompt = `Propose un titre accrocheur pour ce texte : ${userText}`;
        break;

      case 4:
        prompt = `Corrige les fautes dans ce texte : ${userText}`;
        break;

      default:
        prompt = userText;
    }

    this.isLoading = true;
    this.messages.push({
      from: 'ai',
      text: 'Loading ...',
    });
    const loadingIndex = this.messages.length - 1;

    const history = this.buildConversationContext(prompt);

    this.geminiService.sendMessage(history).subscribe({
      next: (aiText: string) => {
        this.isLoading = false;
        const finalText = aiText || 'Erreur dans la réponse';
        this.messages[loadingIndex].text = finalText;
        this.persistExchange(userText, finalText);
        this.step = 0;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.messages[loadingIndex].text =
          'Erreur lors de la communication avec l’IA';
      },
    });
  }

  /**
   * Construit le tableau de messages (rôle/contenu) envoyé à l'IA, en
   * s'appuyant sur l'historique déjà affiché pour conserver le contexte
   * de la conversation. Le dernier message utilisateur est remplacé par
   * le "prompt" enrichi (ex: instructions de rédaction/correction/résumé).
   */
  private buildConversationContext(currentPrompt: string): AiChatMessage[] {
    const displayable = this.messages.filter(
      (m) => m.text !== 'Loading ...' && m.text !== WELCOME_TEXT,
    );

    // Tous les messages sauf le dernier (le message utilisateur qu'on vient d'ajouter)
    const previous = displayable.slice(0, -1).slice(-MAX_CONTEXT_MESSAGES);

    const context: AiChatMessage[] = previous.map((m) => ({
      role: m.from === 'ai' ? 'assistant' : 'user',
      content: m.text,
    }));

    context.push({ role: 'user', content: currentPrompt });

    return context;
  }

  private persistExchange(question: string, resultat: string) {
    if (!this.userId) return;
    this.geminiService.saveExchange(this.userId, question, resultat).subscribe({
      error: (err) => console.error('Erreur sauvegarde historique IA', err),
    });
  }

  async resetConversation() {
    const alert = await this.alertCtrl.create({
      header: 'Nouvelle conversation',
      message: 'Voulez-vous effacer l’historique et recommencer ?',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Effacer',
          role: 'destructive',
          handler: () => this.clearConversation(),
        },
      ],
    });
    await alert.present();
  }

  private clearConversation() {
    this.messages = [];
    this.step = 0;

    if (this.userId) {
      this.geminiService.clearHistory(this.userId).subscribe({
        next: () => this.startBot(),
        error: () => this.startBot(),
      });
    } else {
      this.startBot();
    }
  }

  copyMessage(text: string) {
    navigator.clipboard.writeText(text);
  }
}