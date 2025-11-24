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
