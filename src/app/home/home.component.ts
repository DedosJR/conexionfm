import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { interval, fromEvent, merge } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

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
export class HomeComponent implements OnInit, OnDestroy {
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
  private subscriptions: Subscription = new Subscription();

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

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange() {
    if (document.visibilityState === 'visible') {
      this.refreshContent();
    }
  }

  private refreshContent() {
    // Refresh all content when page becomes visible
    this.loadPosts();
    this.loadBCContent();
    this.loadSportsContent();
    this.loadFeaturedContent();
  }

  private loadPosts() {
    this.subscriptions.add(
      this.wordpressService.getPosts().pipe(
        startWith(null),
        switchMap(() => this.wordpressService.getPosts())
      ).subscribe(posts => {
        this.posts = posts;
      })
    );
  }

  private loadBCContent() {
    this.subscriptions.add(
      this.wordpressService.getPostBc(2).subscribe(bc => {
        this.bc = bc;
      })
    );

    this.subscriptions.add(
      this.wordpressService.getPostsd().subscribe(destacado => {
        this.destacado = destacado;
      })
    );

    this.subscriptions.add(
      this.wordpressService.getPostBccarrousel(2).subscribe(bcpost => {
        this.bcpost = bcpost;
      })
    );
  }

  private loadSportsContent() {
    this.subscriptions.add(
      this.wordpressService.getPostDeportes(4).subscribe(deportesname => {
        this.deportesname = deportesname;
      })
    );

    this.subscriptions.add(
      this.wordpressService.getPostDeportespostSlide(4).subscribe(deportes => {
        this.deportes = deportes;
      })
    );

    this.subscriptions.add(
      this.wordpressService.getPostDeportespost().subscribe(deportespost => {
        this.deportespost = deportespost;
      })
    );
  }

  private loadFeaturedContent() {
    this.subscriptions.add(
      this.wordpressService.getdestacado(3).subscribe(destacadoPost => {
        this.destacadoPost = destacadoPost;
      })
    );
  }

  ngOnInit(): void {
    this.postsprogramas();
    this.refreshContent();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
