import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Params } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WordpressService } from '../wordpress.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';
import { switchMap } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CommonModule,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [WordpressService],
})
export class DetailsComponent implements OnInit {
  postId: number = -1;
  postSlug: string = '';
  post: any;
  bc: any[] = [];
  isScrolled = false;
  article: any = [];
  sidenavOpen = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private wordpressService: WordpressService,
    private metaService: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.wordpressService.getPostsnewsArticle().subscribe((article) => {
      this.article = article;
    });

    this.wordpressService.getPostBc(2).subscribe((bc) => {
      this.bc = bc;
    });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.postId = +params['id'];
          this.postSlug = params['slug'];
          return this.loadPostDetails();
        })
      )
      .subscribe(
        (post) => (this.post = post),
        (error) =>
          console.error('Error al cargar los detalles del artículo', error)
      );
  }

  loadPostDetails() {
    return this.http.get<any>(
      `https://panel.conexionfm.com/wp-json/wp/v2/posts/${this.postId}`
    );
  }

  getFeaturedMediaUrl(post: any): string | undefined {
    if (post?._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return undefined;
  }

  openSidenav() {
    this.sidenavOpen = true;
  }

  closeSidenav() {
    this.sidenavOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 200;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, " 'Publicado ' d - MMMM - yyyy ");
  }
  setMetaTags(post: any): void {
    this.titleService.setTitle(post.title.rendered);
    this.metaService.addTags([
      { name: 'description', content: post.excerpt.rendered },
      { property: 'og:title', content: post.title.rendered },
      { property: 'og:description', content: post.excerpt.rendered },
      {
        property: 'og:image',
        content: post._embedded['post.featured_image'][0].source_url,
      },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'article' },
    ]);
  }
}
