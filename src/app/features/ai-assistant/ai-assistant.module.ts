import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MarkdownModule } from 'ngx-markdown';
import { AiAssistantPageRoutingModule } from './ai-assistant-routing.module';

import { AiAssistantPage } from './ai-assistant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarkdownModule,
    AiAssistantPageRoutingModule
  ],
  declarations: [AiAssistantPage]
})
export class AiAssistantPageModule {}
