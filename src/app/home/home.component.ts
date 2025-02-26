import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { WordpressService } from '../wordpress.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [WordpressService],
})
export class HomeComponent implements OnInit {
  sidenavOpen = false;
  posts: any = [];
  destacado: any = [];
  isScrolled = false;
  bc: any = [];
  bcpost: any = [];
  deportes: any = [];
  deportesname: any = [];
  deportespost: any = [];
  destacadoPost: any = [];
  programas: any[] = [];

  constructor( private wordpressService: WordpressService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    // Subscribe to route events to scroll to top on navigation end
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([300, 0]);
      }
    });
  }
  //Mostrar programas
  postsprogramas(): void {
    this.programas = [
      'assets/webp/Las-Noticias.webp',
      'assets/webp/Los-Pillos.webp',
      'assets/webp/Voces-Ecologicas.webp',
      'assets/webp/Enlazate-a-la-Vida.webp',
    ];
  }
  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/placeholder.png'; // Imagen de respaldo
  }

  ngOnInit(): void {
    //Mostrar programas
    this.postsprogramas();
    //Suscripción al servicio para traer los últimos 10 post en general//
    this.wordpressService.getPosts().subscribe((posts) => {
      this.posts = posts;
      //console.log(posts);
    });
    //Suscripción al servicio para traer último post de la categoría de BC//
    this.wordpressService.getPostBc(2).subscribe((bc) => {
      this.bc = bc;
      //console.log(bc);
    });
    //Conexion al servicio para traer los 4 post de categoria BC al destacado
    this.wordpressService.getPostsd().subscribe((destacado) => {
      this.destacado = destacado;
      //console.log(destacado);
    });

    // traer post de baja california para slide
    this.wordpressService.getPostBccarrousel(2).subscribe((bcpost) => {
      this.bcpost = bcpost;
    });
    //deportes para mostrar nombre de categoria
    this.wordpressService.getPostDeportes(4).subscribe((deportesname) => {
      this.deportesname = deportesname;
      //console.log(deportesname);
    });
    //deportes
    this.wordpressService.getPostDeportespostSlide(4).subscribe((deportes) => {
      this.deportes = deportes;
      //console.log(deportes);
    });
    //Destacado
    this.wordpressService.getdestacado(3).subscribe((destacadoPost) => {
      this.destacadoPost = destacadoPost;
    });
    //post
    this.wordpressService.getPostDeportespost().subscribe((deportespost) => {
      this.deportespost = deportespost;
      //console.log(deportespost);
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
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }
  trackByIndex(index: number, item: string): number {
    return index;
  }
}
