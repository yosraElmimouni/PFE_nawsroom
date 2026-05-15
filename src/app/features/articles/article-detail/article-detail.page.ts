import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AiAssistantPage } from '../../ai-assistant/ai-assistant.page';
import { Article } from 'src/app/core/models/article.model';
import { ArticleStatus, MediaType } from 'src/app/core/models/article.enums';
import { ArticleService } from '../services/article';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.article = this.articleService.getArticleById(Number(id)).subscribe({
  next: (data) => {
    this.article = data;
    console.log(this.article);
  },

  error: (err) => {
    console.log(err);
  }
});
  }
  countMediaByType(article: any) {
    return {
      images: article.media?.filter((m: any) => m.type === 'image').length,
      videos: article.media?.filter((m: any) => m.type === 'video').length,
      audios: article.media?.filter((m: any) => m.type === 'audio').length,
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
    return this.article.media?.filter(
      (m: any) => m.type === this.selectedMediaType,
    );
  }

  countMedia(type: string) {
    if (type === 'all') return this.article.media.length;
    return this.article.media?.filter((m: any) => m.type === type).length;
  }

  onMediaFilterChange(event: CustomEvent) {
    const value = event.detail.value;

    if (value === 'all' || value === 'image' || value === 'video') {
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
