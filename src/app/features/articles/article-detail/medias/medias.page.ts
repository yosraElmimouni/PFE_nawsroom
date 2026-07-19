import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Media } from 'src/app/core/models/media.model';
import { ArticleService } from '../../services/article.service';
import { MediaType } from 'src/app/core/models/enums/MediaType';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.page.html',
  styleUrls: ['./medias.page.scss'],
  standalone: false,
})
export class MediasPage implements OnInit {
  @Input() id!: number;

  @Input() media: 'image' | 'video' | 'audio' = 'image';
  readonly MediaType = MediaType;
  medias: Media[] = [];
  activeTab: 'image' | 'video' | 'audio' = 'image';
  filteredMedias: Media[] = [];

  constructor(
    private modalCtrl: ModalController,
    private articleService: ArticleService,
  ) {}

  ngOnInit() {
    this.getAllMedias();
    this.activeTab = this.media;
  }

  filterMedias() {
    this.filteredMedias = this.medias.filter((m) => m.type === this.activeTab);
  }

  switchTab(tab: MediaType) {
    this.activeTab = tab;
    this.filterMedias();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  getAllMedias() {
    this.articleService.getMedias(this.id).subscribe({
      next: (response: Media[]) => {
        this.medias = response;

        this.filteredMedias = this.medias.filter((item) => {
          return item.type.toLowerCase() === this.media.toLowerCase();
        });

        console.log(this.filteredMedias);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
