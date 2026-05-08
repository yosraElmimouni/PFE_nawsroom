import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AiAssistantPage } from '../../ai-assistant/ai-assistant.page';
import { Article } from 'src/app/core/models/article.model';
import { ArticleStatus, MediaType } from 'src/app/core/models/article.enums';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.page.html',
  styleUrls: ['./add-article.page.scss'],
  standalone: false,
})
export class AddArticlePage implements OnInit {
  article: any = {
    title: '',
    description: '',
    tags: [],
    status: 'Brouillon',
  };
  categories: string[] = [
    'Politique',
    'Économie',
    'Société',
    'International',
    'Sport',
    'Tech',
  ];

  selectedCategory: string | null = null;
  isAddingCategory = false;
  newCate = '';

  isEditMode = false;
  isAddingTag = false;
  newTag = '';
  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
  ) {}

  articles: Article[] = [
    {
      id: 1,
      status: ArticleStatus.Publier,
      // badgeColor: 'success',
      // badgeLabel: 'Publié',
      categorie: 'Politique',
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      title: "Réforme constitutionnelle : le débat s'intensifie au parlement",
      description:
        "Le gouvernement présente ce mardi matin devant l'Assemblée nationale son projet de réforme constitutionnelle, une initiative qui vise à renforcer les prérogatives du pouvoir exécutif tout en encadrant davantage le contrôle parlementaire. ",
      image: 'assets/icon/imagenews.jpeg',
      media: [
        {
          id: 1,
          type: MediaType.Image,
          src: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8',
          label: 'Façade du parlement',
          author: 'Agence nationale',
          date: '2024-09-21',
        },
        {
          id: 2,
          type: MediaType.Image,
          src: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620',
          label: 'Séance plénière',
          author: 'Photo Presse',
          date: '2024-09-21',
        },
        {
          id: 3,
          type: MediaType.Video,
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg&text=Video',
          label: 'Extrait du débat',
        },
      ],

      tags: [
        'Politique',
        'Réforme',
        'Parlement',
        'Gouvernement',
        'Constitution',
        'Débat',
      ],
    },

    {
      id: 2,
      status: ArticleStatus.Brouillon,
      // badgeColor: 'warning',
      // badgeLabel: 'Brouillon',
      categorie: 'Environnement & Agriculture',
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      title: 'Sécheresse : les agriculteurs du sud face à la crise hydrique',
      description:
        'La sécheresse qui sévit actuellement dans le sud du pays a des conséquences dramatiques pour les agriculteurs, qui voient leurs récoltes menacées et leurs moyens de subsistance compromis.',
      image: 'assets/icon/imagenews.jpeg',
      media: [
        {
          id: 21,
          type: MediaType.Image,
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          label: 'Champ asséché',
          author: 'Photo Presse',
          date: '2024-09-20',
        },
        {
          id: 22,
          type: MediaType.Image,
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          label: 'Système d’irrigation défaillant',
          author: 'Agence rurale',
          date: '2024-09-20',
        },
        {
          id: 23,
          type: MediaType.Video,
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/795548/ffffff.jpg&text=Sécheresse',
          label: 'Témoignage d’un agriculteur',
          duration: '01:45',
        },
      ],

      tags: [
        'Environnement',
        'Agriculture',
        'Sécheresse',
        'Crise hydrique',
        'Climat',
      ],
    },
    {
      id: 3,
      status: ArticleStatus.Brouillon,
      // badgeColor: 'warning',
      // badgeLabel: 'En relecture',
      categorie: 'Transport & Urbanisme',
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      title: 'Lancement du nouveau métro : les défis de la mobilité urbaine',
      description:
        'Le lancement du nouveau métro dans la capitale soulève de nombreux défis en matière de mobilité urbaine.',
      image: 'assets/icon/imagenews.jpeg',
      media: [
        {
          id: 31,
          type: MediaType.Image,
          src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
          label: 'Plan du métro',
          author: 'Direction des transports',
          date: '2024-09-22',
        },
        {
          id: 32,
          type: MediaType.Image,
          src: 'https://images.unsplash.com/photo-1518300673615-26c4b35f35c8',
          label: 'Station principale',
          author: 'Urban Photo',
          date: '2024-09-22',
        },
        {
          id: 33,
          type: MediaType.Video,
          src: 'https://www.w3schools.com/html/movie.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/607d8b/ffffff.jpg&text=Metro',
          label: 'Vidéo de présentation du métro',
          duration: '02:10',
        },
      ],

      tags: ['Transport', 'Mobilité', 'Urbanisme', 'Métro', 'Infrastructures'],
    },

    {
      id: 4,
      status: ArticleStatus.Publier,
      // badgeColor: 'success',
      // badgeLabel: 'Publié',
      categorie: 'Politique',
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      title: 'Élections municipales : les enjeux pour les grandes villes',
      description:
        'À l’approche des élections municipales, les grandes villes du pays sont au cœur de l’attention.',
      image: 'assets/icon/imagenews.jpeg',

      media: [
        {
          id: 41,
          type: MediaType.Image,
          src: 'https://images.unsplash.com/photo-1503424886306-4e6586f4b171',
          label: 'Meeting électoral',
          author: 'Agence politique',
          date: '2024-09-23',
        },
        {
          id: 42,
          type: MediaType.Image,
          src: 'https://images.unsplash.com/photo-1520975922284-0ccfd69b90be',
          label: 'Affiches de campagne',
          author: 'Photo Presse',
          date: '2024-09-23',
        },
        {
          id: 43,
          type: MediaType.Video,
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/3f51b5/ffffff.jpg&text=Elections',
          label: 'Discours d’un candidat',
          duration: '02:50',
        },
      ],

      tags: [
        'Élections',
        'Politique locale',
        'Municipales',
        'Candidats',
        'Programmes',
      ],
    },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.article = this.getArticleById(+id);
      this.selectedCategory = this.article.categorie;
    }
  }

  async saveDraft() {
    const toast = await this.toastCtrl.create({
      message: 'Brouillon enregistré avec succès',
      duration: 2000,
      color: 'warning',
      position: 'top',
    });
    await toast.present();
  }

  // Publication de l'article
  async publishArticle() {
    const toast = await this.toastCtrl.create({
      message: ' Article publié avec succès !',
      duration: 2500,
      color: 'success',
      position: 'top',
    });
    await toast.present();
  }

  // Ajout de média
  async addMedia() {
    const toast = await this.toastCtrl.create({
      message: ' Fonctionnalité de capture à connecter',
      duration: 2000,
      color: 'primary',
      position: 'bottom',
    });
    await toast.present();
  }

  // Actions IA
  async aiImprove() {
    const toast = await this.toastCtrl.create({
      message: ' IA : Amélioration du texte en cours...',
      duration: 2000,
      color: 'tertiary',
      position: 'bottom',
    });
    await toast.present();
  }

  async aiTitle() {
    const toast = await this.toastCtrl.create({
      message: ' IA : Génération de titres en cours...',
      duration: 2000,
      color: 'tertiary',
      position: 'bottom',
    });
    await toast.present();
  }

  async aiKeywords() {
    const toast = await this.toastCtrl.create({
      message: ' IA : Extraction des mots-clés...',
      duration: 2000,
      color: 'tertiary',
      position: 'bottom',
    });
    await toast.present();
  }

  async aiSummary() {
    const toast = await this.toastCtrl.create({
      message: ' IA : Résumé automatique en cours...',
      duration: 2000,
      color: 'tertiary',
      position: 'bottom',
    });
    await toast.present();
  }

  // Envoi message IA
  async sendAiMessage() {
    const toast = await this.toastCtrl.create({
      message: " Message envoyé à l'IA",
      duration: 1500,
      color: 'tertiary',
      position: 'bottom',
    });
    await toast.present();
  }
  getArticleById(id: number) {
    return this.articles.find((a) => a.id === id);
  }
  startAddingTag() {
    this.isAddingTag = true;
  }

  addTag() {
    const tag = this.newTag.trim();

    if (tag) {
      this.article.tags = [...(this.article.tags || []), tag];
    }

    this.newTag = '';
    this.isAddingTag = false;
  }
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.article.categorie = category;
  }

  startAddingCategory() {
    this.isAddingCategory = true;
    this.newCate = '';
  }
  addCategory() {
    const category = this.newCate.trim();

    if (!category) {
      this.isAddingCategory = false;
      return;
    }

    // éviter les doublons
    if (!this.categories.includes(category)) {
      this.categories.push(category);
    }

    this.selectedCategory = category;
    this.article.categorie = category;

    this.newCate = '';
    this.isAddingCategory = false;
  }

  onCategoryChange(value: string) {
    if (value === '__add__') {
      this.startAddingCategory();
    }
  }

  async openAiAssistant() {
    const modal = await this.modalCtrl.create({
      component: AiAssistantPage,
    });
    await modal.present();
  }
}
