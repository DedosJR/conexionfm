import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { WordpressService } from '../wordpress.service';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenav,
    MatToolbar,
    MatSidenavContainer,
    CommonModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  providers: [WordpressService],
})
export class DetailsComponent {
  postId: number = -1;
  postSlug: any;
  post: any; // Variable para almacenar los detalles del artículo
  bc: any = [];
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private wordpressService: WordpressService
  ) {}

  async ngOnInit(): Promise<void> {
    //categorias
    this.wordpressService.getPostBc(107).subscribe((bc) => {
      this.bc = bc;
      //console.log(bc);
    });
    this.route.params.subscribe(async (params) => {
      this.postId = +params['id'];
      this.postSlug = params['slug'];
      await this.loadPostDetails();
    });
  }

  async loadPostDetails() {
    try {
      this.post = await this.http
        .get<any>(`http://conexionfm.com/wp-json/wp/v2/posts/${this.postId}`)
        .toPromise();
    } catch (error) {
      console.error('Error al cargar los detalles del artículo', error);
    }
  }

  getFeaturedMediaUrl(post: any): string | undefined {
    if (
      post?._embedded &&
      post._embedded['wp:featuredmedia'] &&
      post._embedded['wp:featuredmedia'][0].source_url
    ) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return undefined;
  }

  //sinedav
  sidenavOpen = false;
  openSidenav() {
    this.sidenavOpen = true;
  }

  closeSidenav() {
    this.sidenavOpen = false;
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, " 'Publlicado ' d - MMMM - yyyy ");
    //return 'Publicado: ' + format(date, "'Fecha' yyyy-MM-dd  'Hora' HH:mm:ss");
  }
}
