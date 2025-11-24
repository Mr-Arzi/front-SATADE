import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registrarestudiante',
  imports: [RouterLink, NgIf],
  templateUrl: './registrarestudiante.html',
  styleUrl: './registrarestudiante.css',
})
export class Registrarestudiante {
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
