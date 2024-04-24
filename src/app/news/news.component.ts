import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { HomeComponent } from '../home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCard, MatCardFooter, MatCardImage } from '@angular/material/card';
import { WordpressService } from '../wordpress.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    HomeComponent,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardImage,
    MatCardFooter,
    MatSidenav,
    MatToolbar,
    MatCard,
    NgClass,
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

  constructor(private wordpressService: WordpressService) {}
  ngOnInit(): void {
    //Conexion al servicio para traer los ultmos 10 post
    this.wordpressService.getPostsnews().subscribe((posts) => {
      this.posts = posts;
      //console.log(posts);
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
}
