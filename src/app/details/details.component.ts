import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { WordpressService } from '../wordpress.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';
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
    NgClass,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  providers: [WordpressService],
})
export class DetailsComponent implements OnInit {
  postId: number = -1; //variable para el id del articulo
  postSlug: any; //variable para el slug de la noticia
  post: any; //Variable para almacenar los detalles del artículo
  bc: any = []; //variable para el almacenamiento de la categoria de BC
  isScrolled = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private wordpressService: WordpressService
  ) {}

  async ngOnInit(): Promise<void> {
    //categorias
    this.wordpressService.getPostBc(2).subscribe((bc) => {
      this.bc = bc;
      //console.log(bc);
    });
    //Mostrar detalles de las noticias dentro del post
    this.route.params.subscribe(async (params) => {
      this.postId = +params['id'];
      this.postSlug = params['slug'];
      await this.loadPostDetails();
    });
  }

  async loadPostDetails() {
    try {
      this.post = await this.http
        .get<any>(
          `http://panel.conexionfm.com/wp-json/wp/v2/posts/${this.postId}`
        )
        .toPromise();
    } catch (error) {
      console.error('Error al cargar los detalles del artículo', error);
    }
  }
  //Mostrar las imagenes de los post
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
  //Cerrar la ventana del sidenav
  closeSidenav() {
    this.sidenavOpen = false;
  }
  //Scroll para el nav se deslice hacia arriba
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 200; // 200 es la posición de desplazamiento a partir de la cual se oculta el encabezado
  }
  //Mostrar la fecha de las publicaciones en las entradas
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, " 'Publlicado ' d - MMMM - yyyy ");
    //return 'Publicado: ' + format(date, "'Fecha' yyyy-MM-dd  'Hora' HH:mm:ss");
  }
}
