import { Component, OnInit, HostListener } from '@angular/core';
import { WordpressService } from '../wordpress.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { catchError, retry, timeout } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deportes',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.css'],
  providers: [WordpressService],
})
export class DeportesComponent implements OnInit {
  posts: any[] = [];
  loading = true;
  error: string | null = null;
  showBCSubmenu = false;
  showDeportesSubmenu = false;
  showNewsSubmenu = false;
  isScrolled = false;
  sidenavOpen = false;


  constructor(
    private wordpressService: WordpressService,
  ) { }

  ngOnInit(): void {
    this.wordpressService.getCatDep().pipe(
      timeout(15000), // 15 seconds timeout
      retry(3), // Retry 3 times
      catchError(error => {
        console.error('Error fetching sports posts:', error);
        this.error = 'Error loading posts. Please try again later.';
        return of([]); // Return empty array on error
      })
    ).subscribe({
      next: (data: any) => {
        this.posts = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Error loading posts. Please try again later.';
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

