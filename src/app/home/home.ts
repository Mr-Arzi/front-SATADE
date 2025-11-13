import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isMenuOpen = true;

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

}
