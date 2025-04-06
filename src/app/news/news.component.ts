import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WordpressService } from '../wordpress.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CommonModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  providers: [WordpressService],
})
export class NewsComponent implements OnInit {
  sidenavOpen = false;
  posts: any = [];
  destacado: any = [];
  isScrolled = false;
  bc: any = [];
  deportes: any = [];
  deportespost: any = [];
  loading: boolean = true;
  showBCSubmenu = false;
  showDeportesSubmenu = false;
  showNewsSubmenu = false;
  constructor(private wordpressService: WordpressService) {}

  ngOnInit(): void {
    //Conexion al servicio para traer los ultmos 10 post
    this.wordpressService.getPostsnews().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      }
    });
  }
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
  showMobileNewsSubmenu = false;

  toggleNewsSubmenu() {
    this.showMobileNewsSubmenu = !this.showMobileNewsSubmenu;
  }
}
