import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  // API REST de WordPress variables privadas//
  private apiUrl = 'https://panel.conexionfm.com/wp-json/wp/v2/posts';
  private Deportes = 'https://panel.conexionfm.com/wp-json/wp/v2/categories';

  constructor(private http: HttpClient) {}
  // Método para deshabilitar caché//

  //Conexion  al portal de WP para carrousel//
  getPosts(): Observable<any[]> {
    let params = new HttpParams().set('per_page', '1').set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  //Artículo recomendado//
  getPostsnewsArticle(): Observable<any[]> {
    let params = new HttpParams().set('per_page', '3').set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  //Sección de news últimos 10//
  getPostsnews(): Observable<any[]> {
    let params = new HttpParams().set('per_page', '10').set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  //Últimos 4 post de la categoría de BC//
  getPostsd(categoryId = 2): Observable<any[]> {
    let params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '4')
      .set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  //traer nombre de categoria bc//
  getPostBc(categoryId: number): Observable<any> {
    const url = `${this.Deportes}/${categoryId}`;
    return this.http.get<any>(url);
  }
  //Baja California patra mostrar en carrousel//
  getPostBccarrousel(categoryId = 2): Observable<any[]> {
    let params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '1')
      .set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  //Destacado//
  getdestacado(categoryId = 3): Observable<any[]> {
    let params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '1')
      .set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  //Deportes para mostrar carrousel//
  getPostDeportespostSlide(categoryId = 4): Observable<any[]> {
    let params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '1')
      .set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  //Categoria de deportes para mosrtrar cards//
  getPostDeportespost(categoryId = 4): Observable<any[]> {
    let params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '4')
      .set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  //Deportes para mostrar nombre de categoria//
  getPostDeportes(categoryId: number): Observable<any> {
    const url = `${this.Deportes}/${categoryId}`;
    return this.http.get<any>(url);
  }
  // Nuevo método para obtener los detalles de una entrada específica.//
  getPostById(postId: number): Observable<any> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.get<any>(url);
  }
}
/*Fichero para mostrar los servicios de la coneexion hacia el panel de control de wordpress de conexionFM, 
con este archivo de servicios conectamos a la base de datos de la plataforma para consumir la API de WP y mostrar
los post de las categorias, así como los nombres de las mismas.  
 */