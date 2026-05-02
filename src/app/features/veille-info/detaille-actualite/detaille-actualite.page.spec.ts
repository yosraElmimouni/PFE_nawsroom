import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailleActualitePage } from './detaille-actualite.page';

describe('DetailleActualitePage', () => {
  let component: DetailleActualitePage;
  let fixture: ComponentFixture<DetailleActualitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleActualitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
