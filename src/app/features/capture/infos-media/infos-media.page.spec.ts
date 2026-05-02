import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfosMediaPage } from './infos-media.page';

describe('InfosMediaPage', () => {
  let component: InfosMediaPage;
  let fixture: ComponentFixture<InfosMediaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosMediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
