import { Component, OnInit,HostListener } from '@angular/core';
import { WordpressService } from '../wordpress.service';
import {RouterLink, RouterModule,} from '@angular/router';
import {CommonModule,} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule,} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-baja-california',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './baja-california.component.html',
  styleUrls: ['./baja-california.component.css'],
  providers: [WordpressService],
})
export class BajaCaliforniaComponent implements OnInit {
  posts: any[] = [];
  loading = true;
  showBCSubmenu = false;
  showDeportesSubmenu = false;
  showNewsSubmenu = false;
  isScrolled = false;
  sidenavOpen = false;
  constructor(
    private wordpressService: WordpressService, ) { }

  ngOnInit(): void {
    this.loadPost();
  }
    loadPost(){
    this.wordpressService.getCatBC().subscribe({
      next: (data: any) => {
        this.posts = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Baja California posts:', error);
        this.loading = false;

    }
    });
  }
  loadMore() {
    this.loading = true;
    this.loadPost();
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
  showMobileNewsSubmenu = false;

  toggleNewsSubmenu() {
    this.showMobileNewsSubmenu = !this.showMobileNewsSubmenu;
  }
}

