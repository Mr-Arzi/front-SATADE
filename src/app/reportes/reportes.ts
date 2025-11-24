import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reportes',
  imports: [RouterLink, NgIf],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes {
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
