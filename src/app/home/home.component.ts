import { Component, OnInit, HostListener } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterOutlet,
  RouterLink,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatCardFooter,
  MatCardImage,
  MatCardModule,
} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { WordpressService } from '../wordpress.service';
import { CommonModule, NgClass, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
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
    MatCardImage,
    MatCardFooter,
    NgClass,
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
  deportes: any = [];
  deportesname: any = [];
  deportespost: any = [];

  constructor(
    private wordpressService: WordpressService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    // Subscribe to route events to scroll to top on navigation end
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  ngOnInit(): void {
    //Conexion al servicio para traer los ultmos 10 post
    this.wordpressService.getPosts().subscribe((posts) => {
      this.posts = posts;
      //console.log(posts);
    });
    //Conexion al servicio para traer los 4 post de categoria BC al destacado
    this.wordpressService.getPostsd().subscribe((destacado) => {
      this.destacado = destacado;
      //console.log(destacado);
    });
    //Conexion al servicio para traer ultimo post de la categoria de BC
    this.wordpressService.getPostBc(2).subscribe((bc) => {
      this.bc = bc;
      // console.log(bc);
    });

    //deportes para mostrar nombre de categoria
    this.wordpressService.getPostDeportes(4).subscribe((deportesname) => {
      this.deportesname = deportesname;
      // console.log(bc);
    });
    //deportes
    this.wordpressService.getPostDeportespostSlide(4).subscribe((deportes) => {
      this.deportes = deportes;
      // console.log(bc);
    });
    //post
    this.wordpressService.getPostDeportespost().subscribe((deportespost) => {
      this.deportespost = deportespost;
      //console.log(destacado);
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
}
