import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
interface ChatMessage {
  from: 'user' | 'ai';
  text: string;
  quickReplies?: string[];
}
@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.page.html',
  styleUrls: ['./ai-assistant.page.scss'],
  standalone:false
})
export class AiAssistantPage implements OnInit {

  messages: ChatMessage[] = [];
inputText = '';
step = 0;
resultText = '';
  lastUserMessage = '';
lastQuickReplies: string[]  = [];
showQuickReplies = false;


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  this.startBot();
}

  startBot() {
  this.messages.push({
  from: 'ai',
  text: '✨ Aide intelligente à la rédaction\nQue souhaitez-vous faire aujourd’hui ?',
  quickReplies: [
    '✍️ Générer un article',
    '✂️ Résumer texte',
    '📰 Proposer un titre',
    '✅ Corriger un texte'
  ]
});

this.lastQuickReplies = [
  '✍️ Générer un article',
  '✂️ Résumer texte',
  '📰 Proposer un titre',
  '✅ Corriger un texte'
];

this.showQuickReplies = false; // cachées au départ
  }

askForTopic() {
  this.messages.push({
    from: 'ai',
    text: 'Très bien ✍️\nQuel est le sujet de l’article ?'
  });
  this.step = 1;
}

askForTextToSummarize() {
  this.messages.push({
    from: 'ai',
    text: '✂️ Collez le texte à résumer.'
  });
  this.step = 2;
}
askForTitle(){
   this.messages.push({
    from: 'ai',
    text: '✂️ Collez le texte à titre.'
  });
  this.step = 3;
}
askForCorrection(){
   this.messages.push({
    from: 'ai',
    text: '✂️ Collez le texte à titre.'
  });
  this.step = 4;
}

handleQuickReply(reply: string) {
  this.messages.push({
    from: 'user',
    text: reply
  });

  this.showQuickReplies = false; // cacher après clic

  switch (reply) {
    case '✍️ Générer un article':
      this.askForTopic();
      break;
    case '✂️ Résumer texte':
      this.askForTextToSummarize();
      break;
    case '📰 Proposer un titre':
      this.askForTitle();
      break;
    case '✅ Corriger un texte':
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

  generateArticle() {
    this.resultText = 'Article généré par IA...';
  }

  summarize() {
    this.resultText = 'Résumé IA du texte...';
  }

proposeTitle() {
    this.resultText = 'Titre proposé par IA';
  }

  correct() {
    this.resultText = 'Texte corrigé par IA';
  }

sendToAI() {
  if (!this.inputText || !this.inputText.trim()) return;

  const userText = this.inputText.trim();

  // 1️⃣ Message utilisateur
  this.messages.push({
    from: 'user',
    text: userText
  });

  this.inputText = '';

  // 2️⃣ Réponse automatique de l’IA selon l’étape
  setTimeout(() => {
    let aiResponse = '';

    switch (this.step) {

      case 1: // Génération article
        aiResponse = `📝 Super ! Je vais rédiger un article sur :
        "${userText}"`;
        this.generateArticle();
        break;

      case 2: // Résumé
        aiResponse = `✂️ Voici un résumé du texte fourni :`;
        this.summarize();
        break;

      case 3: // Titre
        aiResponse = `📰 Voici une proposition de titre pour votre texte :`;
        this.proposeTitle();
        break;

      case 4: // Correction
        aiResponse = `✅ Voici la version corrigée de votre texte :`;
        this.correct();
        break;

      default:
        aiResponse = `🤖 Merci pour votre message. Comment puis-je vous aider ?`;
        break;
    }

    // 3️⃣ Message IA
    this.messages.push({
      from: 'ai',
      text: aiResponse
    });

    // Si un résultat existe, l’afficher
    if (this.resultText) {
      this.messages.push({
        from: 'ai',
        text: this.resultText
      });
    }

  }, 600); // petit délai pour effet "bot"
}

}
