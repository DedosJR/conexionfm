import { Component, HostListener } from '@angular/core';
import {  RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {

  MatCardModule,
} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  sidenavOpen = false;
  showBCSubmenu = false;
  showDeportesSubmenu = false;
  showNewsSubmenu = false;
  msg = 'Mensaje enviado';
  isScrolled = false;



  openSidenav() {
    this.sidenavOpen = true;
  }

  closeSidenav() {
    this.sidenavOpen = false;
  }
  //Scroll para el nav se deslice hacia arriba
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 200; // 200 es la posición de desplazamiento a partir de la cual se oculta el encabezado
  }

  enviarFormulario() {
    // Add your form submission logic here
    console.log('Formulario enviado');
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  showMobileNewsSubmenu = false;
  toggleNewsSubmenu() {
    this.showMobileNewsSubmenu = !this.showMobileNewsSubmenu;
  }
}
