import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-alerts',
  imports: [RouterLink, NgIf],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
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

  showIntervention = false;
  selectedStudent = '';

  abrirIntervencion(nombre: string) {
    this.selectedStudent = nombre;
    this.showIntervention = true;
  }

  cerrarIntervencion() {
    this.showIntervention = false;
    this.selectedStudent = '';
  }



}
