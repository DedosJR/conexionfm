import { Component, OnInit, HostListener } from '@angular/core';
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
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { WordpressService } from '../wordpress.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
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
    MatGridListModule,
    HttpClientModule,
    MatCardImage,
    MatCardFooter,
    NgClass,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [WordpressService],
})
export class HomeComponent implements OnInit {
  sidenavOpen = false;
  posts: any = [];
  destacado: any = [];
  isScrolled = false;
  bc: any = [];

  constructor(private wordpressService: WordpressService) {}

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
