import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { AiAssistantPage } from '../../ai-assistant/ai-assistant.page';
import { ArticleStatus, MediaType } from 'src/app/core/models/article.enums';
import { Article } from 'src/app/core/models/article.model';
import { ArticleService } from '../services/article';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.page.html',
  styleUrls: ['./articles-list.page.scss'],
  standalone: false,
})
export class ArticlesListPage {
  filter = 'all';

  articles: Article[] = [] ;

  constructor(private router: Router, private modalCtrl:ModalController, private serviceArticle:ArticleService) {}
  ngOnInit() {
  this.serviceArticle.getArticles().subscribe((data: Article[]) => {
    this.articles = data;
  });
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
