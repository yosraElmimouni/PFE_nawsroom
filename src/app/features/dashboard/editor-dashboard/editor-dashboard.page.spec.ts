import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorDashboardPage } from './editor-dashboard.page';

describe('EditorDashboardPage', () => {
  let component: EditorDashboardPage;
  let fixture: ComponentFixture<EditorDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
