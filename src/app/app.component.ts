import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
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
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    AboutComponent,
    DetailsComponent,
    ContactComponent,
    NewsComponent,
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
}
