import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AiAssistantPage } from '../../ai-assistant/ai-assistant.page';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
  standalone: false,
})
export class ArticleDetailPage implements OnInit {
  article: any;
  selectedMediaType: 'all' | 'image' | 'video' = 'all';
  isAddingTag = false;
  newTag = '';
  articles = [
    {
      id: 1,
      status: 'published',
      badgeColor: 'success',
      badgeLabel: 'Publié',
      categorie:"Politique",
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: "Réforme constitutionnelle : le débat s'intensifie au parlement",
      excerpt:
        'Le gouvernement présente son projet ce mardi, suscitant de vives réactions...',
      description:
        "Le gouvernement présente ce mardi matin devant l'Assemblée nationale son projet de réforme constitutionnelle, une initiative qui vise à renforcer les prérogatives du pouvoir exécutif tout en encadrant davantage le contrôle parlementaire. ",
      image: 'assets/icon/imagenews.jpeg',
      media: [
        {
          id: 1,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8',
          label: 'Façade du parlement',
          author: 'Agence nationale',
          date: '2024-09-21',
        },
        {
          id: 2,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620',
          label: 'Séance plénière',
          author: 'Photo Presse',
          date: '2024-09-21',
        },
        {
          id: 3,
          type: 'image',
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg&text=Video',
          label: 'Extrait du débat',
        }
      ],
      progress: 100,
      wordCount: 1250,
      views: 2340,
      comments: 14,
      tags: ['Politique', 'Réforme', 'Parlement', 'Gouvernement', 'Constitution', 'Débat'],
    },

    {
      id: 2,
      status: 'draft',
      badgeColor: 'secondary',
      badgeLabel: 'Brouillon',
      categorie:"Environnement & Agriculture",
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: 'Sécheresse : les agriculteurs du sud face à la crise hydrique',
      excerpt: 'Reportage de terrain sur les conséquences de la sécheresse...',
      description:
        'La sécheresse qui sévit actuellement dans le sud du pays a des conséquences dramatiques pour les agriculteurs, qui voient leurs récoltes menacées et leurs moyens de subsistance compromis.',
      image: 'assets/icon/imagenews.jpeg',
      media: [
        {
          id: 21,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          label: 'Champ asséché',
          author: 'Photo Presse',
          date: '2024-09-20',
        },
        {
          id: 22,
          type: 'video',
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          label: 'Système d’irrigation défaillant',
          author: 'Agence rurale',
          date: '2024-09-20',
        },
        {
          id: 23,
          type: 'video',
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/795548/ffffff.jpg&text=Sécheresse',
          label: 'Témoignage d’un agriculteur',
          duration: '01:45',
        }
      ],
      progress: 58,
      wordCount: 347,
      views: 0,
      comments: 0,
      tags: ['Environnement', 'Agriculture', 'Sécheresse', 'Crise hydrique', 'Climat'],
    },
    {
      id: 3,
      status: 'review',
      badgeColor: 'warning',
      badgeLabel: 'En relecture',
      categorie:"Transport & Urbanisme",
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: 'Lancement du nouveau métro : les défis de la mobilité urbaine',
      excerpt: 'Analyse des enjeux et des perspectives du nouveau métro...',
      description:
        'Le lancement du nouveau métro dans la capitale soulève de nombreux défis en matière de mobilité urbaine.',
      image: 'assets/icon/imagenews.jpeg',
      media: [
        {
          id: 31,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
          label: 'Plan du métro',
          author: 'Direction des transports',
          date: '2024-09-22',
        },
        {
          id: 32,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1518300673615-26c4b35f35c8',
          label: 'Station principale',
          author: 'Urban Photo',
          date: '2024-09-22',
        },
        {
          id: 33,
          type: 'video',
          src: 'https://www.w3schools.com/html/movie.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/607d8b/ffffff.jpg&text=Metro',
          label: 'Vidéo de présentation du métro',
          duration: '02:10',
        }
      ],
      reviewDuration: '3h',
      views: 560,
      comments: 8,
      tags: ['Transport', 'Mobilité', 'Urbanisme', 'Métro', 'Infrastructures'],
    },

    {
      id: 4,
      status: 'published',
      badgeColor: 'success',
      badgeLabel: 'Publié',
      categorie:'Politique',
      date:new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: 'Élections municipales : les enjeux pour les grandes villes',
      excerpt:
        'Zoom sur les candidats et les programmes pour les municipales...',
      description:
        'À l’approche des élections municipales, les grandes villes du pays sont au cœur de l’attention.',
      image: 'assets/icon/imagenews.jpeg',

      media: [
        {
          id: 41,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1503424886306-4e6586f4b171',
          label: 'Meeting électoral',
          author: 'Agence politique',
          date: '2024-09-23',
        },
        {
          id: 42,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1520975922284-0ccfd69b90be',
          label: 'Affiches de campagne',
          author: 'Photo Presse',
          date: '2024-09-23',
        },
        {
          id: 43,
          type: 'video',
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/3f51b5/ffffff.jpg&text=Elections',
          label: 'Discours d’un candidat',
          duration: '02:50',
        }
      ],
      views: 1120,
      comments: 20,
      tags: ['Élections', 'Politique locale', 'Municipales', 'Candidats', 'Programmes'],
    },
  ];

  constructor(private route: ActivatedRoute, private router:Router, private modalCtrl:ModalController) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.article =
      this.articles.find((a) => a.id === +Number(id)) ?? this.articles[0];
  }
countMediaByType(article: any) {
  return {
    images: article.media.filter((m: any) => m.type === 'image').length,
    videos: article.media.filter((m: any) => m.type === 'video').length,
    audios: article.media.filter((m: any) => m.type === 'audio').length,
  };
}
  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      published: 'success',
      draft: 'warning',
      review: 'tertiary',
    };
    return map[status] ?? 'medium';
  }

  get filteredMedia() {
    if (this.selectedMediaType === 'all') {
      return this.article.media;
    }
    return this.article.media.filter(
      (m: any) => m.type === this.selectedMediaType,
    );
  }

  countMedia(type: string) {
    if (type === 'all') return this.article.media.length;
    return this.article.media.filter((m: any) => m.type === type).length;
  }

  onMediaFilterChange(event: CustomEvent) {
    const value = event.detail.value;

    if (
      value === 'all' ||
      value === 'image' ||
      value === 'video' 
    ) {
      this.selectedMediaType = value;
    }
  }
  openVideo(url: string) {
    window.open(url, '_blank');
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

  modifierArticle(id: number) {
    this.router.navigate(['/redaction', id]);
  }


   async openAiAssistant() {
  const modal = await this.modalCtrl.create({
    component: AiAssistantPage,
  });
  await modal.present();
}
}
