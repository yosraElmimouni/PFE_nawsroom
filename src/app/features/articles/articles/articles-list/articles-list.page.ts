import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { AiAssistantPage } from '../../ai-assistant/ai-assistant.page';
import { ArticleStatus, MediaType } from 'src/app/core/models/article.enums';
import { Article } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.page.html',
  styleUrls: ['./articles-list.page.scss'],
  standalone: false,
})
export class ArticlesListPage {
  filter = 'all';

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

  constructor(private router: Router, private modalCtrl:ModalController) {}
  ngOnInit() {
  }

  get filteredArticles() {
    if (this.filter === 'all') return this.articles;
    if (this.filter === 'Publier') return this.articles.filter(a => a.status === 'Publier');
    if (this.filter === 'Brouillon') return this.articles.filter(a => a.status === 'Brouillon');
    return this.articles;
  }

  deleteArticle(id: number) {
    this.articles = this.articles.filter(a => a.id !== id);
  }

  detailleArticle(id: number) {
    this.router.navigate(['/article-detail', id]);
  }


 
}
