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
    this.wordpressService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
    this.wordpressService.getPostsd().subscribe((destacado) => {
      this.destacado = destacado;
    });
    this.wordpressService.getPostBc(107).subscribe((bc) => {
      this.bc = bc;
      console.log(bc);
    });
  }

  openSidenav() {
    this.sidenavOpen = true;
  }

  closeSidenav() {
    this.sidenavOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 200; // 200 es la posición de desplazamiento a partir de la cual se oculta el encabezado
  }
}
