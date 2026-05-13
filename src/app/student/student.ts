import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-student',
  imports: [RouterLink, NgIf],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student {
  isMenuOpen = true;
  isUserMenuOpen = false;
  isNotificationsOpen = false;
  openActionMenu: number | null = null;

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

  toggleActionMenu(rowId: number) {
    this.openActionMenu = this.openActionMenu === rowId ? null : rowId;
  }

  closeActionMenu() {
    this.openActionMenu = null;
  }

  openAbout() {
    this.showAbout = true;
  }

  closeAbout() {
    this.showAbout = false;
  }
}
