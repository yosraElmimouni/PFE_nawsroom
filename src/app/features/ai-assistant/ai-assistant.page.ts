import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Gemini } from 'src/app/core/services/gemini';
interface ChatMessage {
  from: 'user' | 'ai';
  text: string;
  quickReplies?: string[];
}
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
  

  constructor(
    private modalCtrl: ModalController,
    private geminiService: Gemini,
  ) {}

  ngOnInit() {
    this.startBot();
  }

  startBot() {
    this.messages.push({
      from: 'ai',
      text: ' Aide intelligente à la rédaction\nQue souhaitez-vous faire aujourd’hui ?',
      quickReplies: [
        ' Générer un article',
        ' Résumer texte',
        ' Proposer un titre',
        ' Corriger un texte',
      ],
    });

    this.lastQuickReplies = [
      ' Générer un article',
      ' Résumer texte',
      ' Proposer un titre',
      ' Corriger un texte',
    ];

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
    this.geminiService.sendMessage(prompt).subscribe({
      next: (res: any) => {
        const aiText =
          res.candidates?.[0]?.content?.parts?.[0]?.text ||
          'Erreur dans la réponse';
        this.isLoading = false;
        this.messages[loadingIndex].text = aiText;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;

        this.messages[loadingIndex].text =
          'Erreur lors de la communication avec l’IA';
      },
    });
  }
}
