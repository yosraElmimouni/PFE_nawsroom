import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.page.html',
  styleUrls: ['./articles-list.page.scss'],
  standalone: false,
})
export class ArticlesListPage {
  filter = 'all';

  articles = [
    {
      id:1,   
      status: 'published',
      badgeColor: 'success',
      badgeLabel: 'Publié',
      date: 'Il y a 2h',
      title: 'Réforme constitutionnelle : le débat s\'intensifie au parlement',
      excerpt: 'Le gouvernement présente son projet ce mardi, suscitant de vives réactions...',
      metaIcon: 'eye-outline',
      metaText: '2 340',
      image: 'assets/icon/imagenews.jpeg'
    },
    {
      id:2,
      status: 'draft',
      badgeColor: 'secondary',
      badgeLabel: 'Brouillon',
      date: 'Hier, 18:22',
      title: 'Sécheresse : les agriculteurs du sud face à la crise hydrique',
      excerpt: 'Reportage de terrain sur les conséquences de la sécheresse...',
      metaIcon: 'create-outline',
      metaText: '347 mots · 58%',
      image: 'assets/icon/imagenews.jpeg'
    },
    {
      id:3,
      status: 'review',
      badgeColor: 'warning',
      badgeLabel: 'En relecture',
      date: 'Aujourd\'hui, 09:15',
      title: 'Lancement du nouveau métro : les défis de la mobilité urbaine',
      excerpt: 'Analyse des enjeux et des perspectives du nouveau métro...',
      metaIcon: 'time-outline',
      metaText: 'En relecture depuis 3h',
      image: 'assets/icon/imagenews.jpeg'
    },
    {
      id:4,
      status: 'published',
      badgeColor: 'success',
      badgeLabel: 'Publié',
      date: 'Il y a 30 min',
      title: 'Élections municipales : les enjeux pour les grandes villes',
      excerpt: 'Zoom sur les candidats et les programmes pour les municipales...',
      metaIcon: 'eye-outline',
      metaText: '1 120',
      image: 'assets/icon/imagenews.jpeg'
    },
  ];

  constructor(private router: Router) {}
  ngOnInit() {
  }

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

  detailleArticle(id: number) {
    this.router.navigate(['/article-detail', id]);
  }
}
