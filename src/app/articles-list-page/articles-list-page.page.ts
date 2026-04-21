import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-list-page',
  templateUrl: './articles-list-page.page.html',
  styleUrls: ['./articles-list-page.page.scss'],
  standalone:false,
})
export class ArticlesListPagePage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
filter = 'all';

  articles = [
    {
      id: 1,
      title: 'Réforme constitutionnelle : le débat s\'intensifie au parlement',
      excerpt: 'Le gouvernement présente son projet ce mardi, suscitant de vives réactions...',
      status: 'published',
      statusLabel: 'Publié',
      statusColor: 'success',
      category: 'Politique',
      categoryColor: 'primary',
      date: 'Il y a 2h',
      views: 2340,
      comments: 14,
      thumb: 'published-thumb',
    },
    {
      id: 2,
      title: 'Sécheresse : les agriculteurs du sud face à la crise hydrique',
      excerpt: 'Reportage de terrain sur les conséquences de la sécheresse...',
      status: 'draft',
      statusLabel: 'Brouillon',
      statusColor: 'secondary',
      category: 'Environnement',
      categoryColor: 'success',
      date: 'Hier, 18:22',
      words: 347,
      progress: 58,
      thumb: 'draft-thumb',
    },
    {
      id: 3,
      title: 'Élections municipales : les candidats déclarent leurs programmes',
      excerpt: 'Analyse des promesses électorales des principaux candidats...',
      status: 'review',
      statusLabel: 'En révision',
      statusColor: 'warning',
      category: 'Politique',
      categoryColor: 'primary',
      date: '21 avr. 10:05',
      reviewer: 'Y. Ben Ali',
      thumb: 'review-thumb',
    },
    {
      id: 4,
      title: 'Intelligence artificielle et journalisme : menace ou opportunité ?',
      excerpt: 'Tour d\'horizon des outils IA utilisés dans les rédactions modernes...',
      status: 'draft',
      statusLabel: 'Brouillon',
      statusColor: 'secondary',
      category: 'Technologie',
      categoryColor: 'tertiary',
      date: '20 avr. 08:14',
      words: 112,
      progress: 22,
      thumb: 'tech-thumb',
    },
  ];

  get filteredArticles() {
    if (this.filter === 'all') return this.articles;
    if (this.filter === 'published') return this.articles.filter(a => a.status === 'published');
    if (this.filter === 'draft') return this.articles.filter(a => a.status === 'draft');
    if (this.filter === 'review') return this.articles.filter(a => a.status === 'review');
    return this.articles;
  }

  deleteArticle(id: number) {
    this.articles = this.articles.filter(a => a.id !== id);
  }

}
