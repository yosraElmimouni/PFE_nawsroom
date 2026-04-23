import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedactionPage } from './redaction.page';

describe('RedactionPage', () => {
  let component: RedactionPage;
  let fixture: ComponentFixture<RedactionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
