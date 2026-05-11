import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { AiAssistantPage } from '../ai-assistant/ai-assistant.page';

@Component({
  selector: 'app-veille-info',
  templateUrl: './veille-info.page.html',
  styleUrls: ['./veille-info.page.scss'],
  standalone:false,
})
export class VeilleInfoPage implements OnInit {

 
version="1.0"
  activeModule: string = 'redaction';
  activeTab: 'progress' | 'published' | 'draft' = 'progress';
  today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  profile = {
        name: 'Amine H.',
        role: 'Journaliste',
        initials: 'AH'
      };
  filteredFeedItems: any[] = [];

sources: string[] = [];
domaines: string[] = [];

selectedSource: string = '';
selectedDomaine: string = '';
isAiGenerate:boolean=false;
  articles = [
    {
      id: 1,
      status: 'published',
      badgeColor: 'success',
      badgeLabel: 'Publié',
      date: new Date('2024-09-21T14:30:00'),
      title: "Réforme constitutionnelle : le débat s'intensifie au parlement",
      domaine: 'Politique',
      excerpt:
        'Le gouvernement présente son projet ce mardi, suscitant de vives réactions...',
      description:
        "Le gouvernement présente ce mardi matin devant l'Assemblée nationale son projet de réforme constitutionnelle, une initiative qui vise à renforcer les prérogatives du pouvoir exécutif tout en encadrant davantage le contrôle parlementaire. ",
      image: 'assets/icon/error.webp',
      media: [
        {
          id: 1,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8',
          label: 'Façade du parlement',
          author: 'Agence nationale',
          date: new Date('2024-09-21T14:30:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
          id: 2,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620',
          label: 'Séance plénière',
          author: 'Photo Presse',
          date: new Date('2024-09-21T14:30:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
          id: 3,
          type: 'video',
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg&text=Video',
          label: 'Extrait du débat',
        },
        {
          id: 4,
          type: 'file',
          src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          label: 'Projet de réforme constitutionnelle',
          size: '2.4 MB',
        },
      ],
      progress: 100,
      wordCount: 1250,
      views: 2340,
      comments: 14,
    },

    {
      id: 2,
      status: 'draft',
      badgeColor: 'secondary',
      badgeLabel: 'Brouillon',
      date: new Date('2024-09-20T10:00:00'),
      title: 'Sécheresse : les agriculteurs du sud face à la crise hydrique',
      excerpt: 'Reportage de terrain sur les conséquences de la sécheresse...',
      domaine: 'Environnement',
      description:
        'La sécheresse qui sévit actuellement dans le sud du pays a des conséquences dramatiques pour les agriculteurs, qui voient leurs récoltes menacées et leurs moyens de subsistance compromis.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
      media: [
        {
          id: 21,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          label: 'Champ asséché',
          author: 'Photo Presse',
          date: new Date('2024-09-20T10:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
          id: 22,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          label: 'Système d’irrigation défaillant',
          author: 'Agence rurale',
          date: new Date('2024-09-20T10:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
          id: 23,
          type: 'video',
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/795548/ffffff.jpg&text=Sécheresse',
          label: 'Témoignage d’un agriculteur',
          duration: '01:45',
        },
        {
          id: 24,
          type: 'file',
          src: 'https://www.who.int/docs/default-source/wpro---documents/countries/viet-nam/climate-change-and-health-viet-nam.pdf',
          label: 'Rapport sur l’impact de la sécheresse',
          size: '3.1 MB',
        },
      ],
      progress: 58,
      wordCount: 347,
      views: 0,
      comments: 0,
    },
    {
      id: 3,
      status: 'review',
      badgeColor: 'warning',
      badgeLabel: 'En relecture',
      date: new Date('2024-09-22T09:15:00'),
      title: 'Lancement du nouveau métro : les défis de la mobilité urbaine',
      excerpt: 'Analyse des enjeux et des perspectives du nouveau métro...',
      domaine: 'Transport',
      description:
        'Le lancement du nouveau métro dans la capitale soulève de nombreux défis en matière de mobilité urbaine.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
      media: [
        {
          id: 31,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
          label: 'Plan du métro',
          author: 'Direction des transports',
          date: new Date('2024-09-22T09:15:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
          id: 32,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1518300673615-26c4b35f35c8',
          label: 'Station principale',
          author: 'Urban Photo',
          date: new Date('2024-09-22T09:15:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
          id: 33,
          type: 'video',
          src: 'https://www.w3schools.com/html/movie.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/607d8b/ffffff.jpg&text=Metro',
          label: 'Vidéo de présentation du métro',
          duration: '02:10',
        },
        {
          id: 34,
          type: 'file',
          src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          label: 'Étude de faisabilité du projet métro',
          size: '1.8 MB',
        },
      ],
      reviewDuration: '3h',
      views: 560,
      comments: 8,
    },

    {
      id: 4,
      status: 'published',
      badgeColor: 'success',
      badgeLabel: 'Publié',
      date: new Date('2024-09-23T11:00:00'),
      title: 'Élections municipales : les enjeux pour les grandes villes',
      domaine: 'Politique',
      excerpt:
        'Zoom sur les candidats et les programmes pour les municipales...',
      description:
        'À l’approche des élections municipales, les grandes villes du pays sont au cœur de l’attention.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
      media: [
        {
          id: 41,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1503424886306-4e6586f4b171',
          label: 'Meeting électoral',
          author: 'Agence politique',
          date: new Date('2024-09-23T11:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
          id: 42,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1520975922284-0ccfd69b90be',
          label: 'Affiches de campagne',
          author: 'Photo Presse',
          date: new Date('2024-09-23T11:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
          id: 43,
          type: 'video',
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/3f51b5/ffffff.jpg&text=Elections',
          label: 'Discours d’un candidat',
          duration: '02:50',
        },
        {
          id: 44,
          type: 'file',
          src: 'https://www.oecd.org/gov/regulatory-policy/public-consultation-report.pdf',
          label: 'Programme électoral – résumé',
          size: '2.9 MB',
        },
      ],
      views: 1120,
      comments: 20,
    },
  ];
 feedItems = [
  {
    id: 1,
    source: 'MAP — Maghreb Arabe Presse',
    domaine: 'Politique',
    date: new Date('2026-05-11'),
    title: 'Maroc–France : signature d’un nouveau partenariat stratégique renforcé',
    summary:
      'Le Maroc et la France ont signé à Rabat un accord de partenariat stratégique visant à renforcer la coopération bilatérale dans plusieurs secteurs clés. Cet accord couvre notamment la coopération économique, la transition énergétique, l’enseignement supérieur, la formation professionnelle ainsi que la sécurité régionale. Les deux parties ont réaffirmé leur volonté de consolider leurs relations historiques à travers des projets concrets favorisant l’investissement, l’innovation et la stabilité régionale.',
  },
  {
    id: 2,
    source: 'Reuters Afrique',
    domaine: 'Sport',
    date: new Date('2026-05-11'),
    title: 'CAN 2025 : avancées majeures sur les infrastructures et l’organisation',
    summary:
      'La Confédération africaine de football, en coordination avec la FIFA, a confirmé l’état d’avancement satisfaisant des préparatifs de la Coupe d’Afrique des Nations 2025. Les travaux de construction et de rénovation des stades progressent conformément aux calendriers établis, tandis que les autorités sportives mettent l’accent sur la logistique, la sécurité et l’accueil des supporters. Cette édition est présentée comme un tournant majeur pour le football africain.',
  },
  {
    id: 3,
    source: 'Le Monde Afrique',
    domaine: 'Économie',
    date: new Date('2026-05-11'),
    title: 'Croissance économique : le Maroc affiche des perspectives encourageantes',
    summary:
      'L’économie marocaine affiche des signes de reprise solides, soutenus par une amélioration de la production agricole, une hausse des exportations industrielles et un regain de l’investissement public. Selon les dernières analyses économiques, la croissance est portée également par le dynamisme du secteur automobile, des énergies renouvelables et du tourisme. Les experts soulignent toutefois l’importance de maîtriser l’inflation et de renforcer l’emploi des jeunes.',
  },
  {
    id: 4,
    source: 'Hespress',
    domaine: 'Société',
    date: new Date('2026-05-12'),
    title: 'Éducation : lancement d’un programme national de digitalisation des écoles',
    summary:
      'Le ministère de l’Éducation nationale a annoncé le lancement d’un vaste programme de digitalisation visant à moderniser les établissements scolaires publics. Ce projet prévoit l’équipement des écoles en matériel informatique, la formation des enseignants aux outils numériques et le développement de contenus pédagogiques interactifs. L’objectif est de réduire la fracture numérique et d’améliorer la qualité de l’enseignement.',
  },
];
selectedDate: string = new Date().toISOString();
isDateModalOpen: boolean = false;

  


  constructor( private router:Router,
    private modalCtrl:ModalController
  ) {}

  async ngOnInit() {
  this.feedItems = this.feedItems.map(item => ({
    ...item,
    isAiGenerating: false,
    aiSummary: null
  }));

  this.applyFilters();

  this.sources = [...new Set(this.feedItems.map(item => item.source))];
  this.domaines = [...new Set(this.feedItems.map(item => item.domaine))];
}
 
  // navigateTo(module: string): void {
  //   this.activeModule = module;
  //     const path = routes.find(r => r.path === module)?.path;
  //     if (path) {
  //       this.router.navigate([`/${path.toLocaleLowerCase()}`]);
  //     } else {
  //       console.warn('No route found for module:', module);
  //     }

//   formatDate(value: any): string {
//   return value instanceof Date
//     ? value.toLocaleDateString('fr-FR', {
//         dateStyle: 'short',
//         timeStyle: 'short'
//       })
//     : '';
// }
applyFilters() {
  this.filteredFeedItems = this.feedItems.filter(item => {
    const matchSource =
      !this.selectedSource || item.source === this.selectedSource;

    const matchDomaine =
      !this.selectedDomaine || item.domaine === this.selectedDomaine;

    let matchDate = true;
    if (this.selectedDate) {
      const selected = new Date(this.selectedDate);
      const itemDate = new Date(item.date);
      matchDate =
        itemDate.getFullYear() === selected.getFullYear() &&
        itemDate.getMonth() === selected.getMonth() &&
        itemDate.getDate() === selected.getDate();
    }

    return matchSource && matchDomaine && matchDate;
  });
}

openDatePicker() {
  this.isDateModalOpen = true;
}

onDateSelected() {
  this.isDateModalOpen = false;
  this.applyFilters();
}

clearDate(event: Event) {
  event.stopPropagation();
  this.selectedDate = '';
  this.applyFilters();
}
goToProduction() {
  this.router.navigate(['/articles'], {
    queryParams: { view: 'production' }
  });
}
AiResume(item: any) {
  if (item.aiSummary || item.isAiGenerating) return;

  item.isAiGenerating = true;

  setTimeout(() => {
    item.aiSummary =
      "Accord stratégique entre les deux pays visant à développer les énergies renouvelables, avec un accent particulier sur l’hydrogène vert et le solaire.";
    item.isAiGenerating = false;
  }, 1200);
}
goToDetail(item: any) {
  this.router.navigate(['/veille/detaille-actualite', item.id], {
    state: { item }
  });
}


async openAiAssistant() {
  const modal = await this.modalCtrl.create({
    component: AiAssistantPage,
  });
  await modal.present();
}


}


