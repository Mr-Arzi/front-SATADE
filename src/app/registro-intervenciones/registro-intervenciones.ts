import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registro-intervenciones',
  imports: [RouterLink,NgIf],
  templateUrl: './registro-intervenciones.html',
  styleUrl: './registro-intervenciones.css',
})
export class RegistroIntervenciones {
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
