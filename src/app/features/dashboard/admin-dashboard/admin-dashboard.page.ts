import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: false
})
export class AdminDashboardPage implements OnInit {

  systemHealth = [
    { name: 'API Backend',       value: 92, colorClass: 'green' },
    { name: 'Firebase Storage',  value: 67, colorClass: 'blue'  },
    { name: 'API IA (GPT-4o)',   value: 78, colorClass: 'amber' },
    { name: 'MongoDB',           value: 95, colorClass: 'green' },
  ];

  recentUsers = [
    { initials: 'AH', name: 'Amine Hajji',    lastSeen: 'Actif il y a 5 min',  role: 'Journaliste', avatarClass: 'av-brown', roleClass: 'role-journalist' },
    { initials: 'KM', name: 'Karim Mansouri', lastSeen: 'Actif il y a 12 min', role: 'Éditeur',     avatarClass: 'av-green', roleClass: 'role-editor'     },
    { initials: 'LB', name: 'Leila Benali',   lastSeen: 'Actif il y a 1h',     role: 'Journaliste', avatarClass: 'av-blue',  roleClass: 'role-journalist' },
  ];

  constructor() { }

  ngOnInit() { }

}