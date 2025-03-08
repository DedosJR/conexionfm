import { Component, HostListener } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterModule,
  NavigationEnd,
  Router,
} from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatCardModule,
} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule, NgClass, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    NgClass,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'conexionfm';
  posts: any = [];
  isScrolled = false;
  sidenavOpen = false;
  showBCSubmenu = false;
  showDeportesSubmenu = false;
  showNewsSubmenu = false;

  // Método para deshabilitar caché
  private getHeaders() {
    return new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    });
  }
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    // Subscribe to route events to scroll to top on navigation end
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([200, 0]);
      }
    });
  }
  //Realizar apertura del sidenav
  openSidenav() {
    this.sidenavOpen = true;
  }
  //Realizar el cerrado del sidenav
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
  // Subscribe to route events to scroll to top on navigation end
  // Add to your component class
  showMobileNewsSubmenu = false;

  toggleNewsSubmenu() {
    this.showMobileNewsSubmenu = !this.showMobileNewsSubmenu;
  }
}
