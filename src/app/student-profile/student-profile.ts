import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-student-profile',
  imports: [RouterLink, NgIf],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
      isMenuOpen = true;

  showAbout = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openAbout() {
    this.showAbout = true;
  }

  closeAbout() {
    this.showAbout = false;
  }

}
