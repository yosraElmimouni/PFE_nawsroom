import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardJournalistePage } from './dashboard-journaliste.page';

describe('DashboardJournalistePage', () => {
  let component: DashboardJournalistePage;
  let fixture: ComponentFixture<DashboardJournalistePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardJournalistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
