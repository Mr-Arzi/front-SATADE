import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-student-profile',
  imports: [RouterLink, CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  isMenuOpen = true;
  isUserMenuOpen = false;
  isNotificationsOpen = false;

  showAbout = false;

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

}
