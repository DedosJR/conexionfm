import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private apiUrl = 'http://www.conexionfm.com/wp-json/wp/v2/posts';
  private apiDestacado = '';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    // Agrega parámetros a la URL para limitar los posts y obtener solo tres
    const url = `${this.apiUrl}?per_page=3&_embed`;
    return this.http.get<any[]>(url);
  }
  getPostsd(): Observable<any[]> {
    // Agrega parámetros a la URL para limitar los posts y obtener solo tres
    const url = `${this.apiUrl}?per_page=1&_embed`;
    return this.http.get<any[]>(url);
  }
}
