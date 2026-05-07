import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VeilleInfoPage } from './veille-info.page';

describe('VeilleInfoPage', () => {
  let component: VeilleInfoPage;
  let fixture: ComponentFixture<VeilleInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VeilleInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
