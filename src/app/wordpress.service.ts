import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private Bc = 'https://panel.conexionfm.com/wp-json/wp/v2/categories';
  private apiUrl = 'https://panel.conexionfm.com/wp-json/wp/v2/posts';
  private apiDestacado = 'https://panel.conexionfm.com/wp-json/wp/v2/posts';
  private Deportes = 'https://panel.conexionfm.com/wp-json/wp/v2/categories';

  constructor(private http: HttpClient) {}
  //Conexion  al portal de WP para carrousel
  getPosts(): Observable<any[]> {
    let params = new HttpParams().set('per_page', '1').set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  //Conexion  al portal de WP para la sección de news últimos 10
  getPostsnews(): Observable<any[]> {
    let params = new HttpParams().set('per_page', '10').set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  getPostsnewsArticle(): Observable<any[]> {
    let params = new HttpParams().set('per_page', '3').set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  // Conexion al portal de wp para traer últimos 4 post de la categoría de BC
  getPostsd(categoryId = 2): Observable<any[]> {
    let params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '4')
      .set('_embed', '');
    return this.http.get<any[]>(this.apiDestacado, { params });
  }
  //Conexión al portal de wp para traer el ultimo post para destacado de la categoria de BC
  getPostBc(categoryId: number): Observable<any> {
    const url = `${this.Bc}/${categoryId}`;
    return this.http.get<any>(url);
  }
  //deportes para mostrar carrousel
  getPostDeportespostSlide(categoryId = 4): Observable<any[]> {
    let params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '1')
      .set('_embed', '');
    return this.http.get<any[]>(this.apiDestacado, { params });
  }
  //Categoria de deportes para mosrtrar cards
  getPostDeportespost(categoryId = 4): Observable<any[]> {
    let params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '4')
      .set('_embed', '');
    return this.http.get<any[]>(this.apiDestacado, { params });
  }
}
