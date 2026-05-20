import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgFor, NgIf } from '@angular/common';

import { AlertaService } from '../services/alerta.service';
import { DashboardStats } from '../models';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  stats: DashboardStats | null = null;
  cargando = true;
  isMenuOpen = true;
  isUserMenuOpen = false;
  isNotificationsOpen = false;

  showAbout = false;

  constructor(private alertaService: AlertaService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isNotificationsOpen = false;
    }
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }

  toggleNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    if (this.isNotificationsOpen) {
      this.isUserMenuOpen = false;
    }
  }

  closeNotifications() {
    this.isNotificationsOpen = false;
  }

  openAbout() {
    this.showAbout = true;
  }

  closeAbout() {
    this.showAbout = false;
  }

  ngOnInit(): void {
    this.alertaService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }

}
