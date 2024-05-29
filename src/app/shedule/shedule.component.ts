import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatCardFooter,
  MatCardImage,
  MatCardModule,
} from '@angular/material/card';
import { HomeComponent } from '../home/home.component';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-shedule',
  standalone: true,
  imports: [
    HomeComponent,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatCardImage,
    MatCardFooter,
    NgClass,
  ],
  templateUrl: './shedule.component.html',
  styleUrl: './shedule.component.css',
})
export class SheduleComponent {
  sidenavOpen = false;
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
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
