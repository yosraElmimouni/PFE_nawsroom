import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormAjoutArticlePage } from './form-ajout-article.page';

describe('FormAjoutArticlePage', () => {
  let component: FormAjoutArticlePage;
  let fixture: ComponentFixture<FormAjoutArticlePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAjoutArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
