import { Component, HostListener } from '@angular/core';
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

  // ====== POPUP INTERVENCIÓN ======
  showIntervention = false;
  selectedStudent: string | null = null;
  popoverX = 0;
  popoverY = 0;

  abrirIntervencion(nombre: string, event: MouseEvent) {
    event.stopPropagation(); // que no se propague al documento
    this.selectedStudent = nombre;
    this.showIntervention = true;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.popoverX = rect.left;
    this.popoverY = rect.bottom + 8; // un poquito debajo del botón
  }

  cerrarIntervencion() {
    this.showIntervention = false;
    this.selectedStudent = null;
  }

  // Cierre automático al hacer clic fuera
  @HostListener('document:click')
  onDocumentClick() {
    if (this.showIntervention) {
      this.cerrarIntervencion();
    }
  }
}

