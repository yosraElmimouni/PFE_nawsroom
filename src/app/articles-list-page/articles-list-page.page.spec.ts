import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesListPagePage } from './articles-list-page.page';

describe('ArticlesListPagePage', () => {
  let component: ArticlesListPagePage;
  let fixture: ComponentFixture<ArticlesListPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesListPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
