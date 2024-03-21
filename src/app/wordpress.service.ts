import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private Bc = 'http://www.conexionfm.com/wp-json/wp/v2/categories';
  private apiUrl = 'http://www.conexionfm.com/wp-json/wp/v2/posts';
  private apiDestacado = 'http://www.conexionfm.com/wp-json/wp/v2/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    // Use HttpParams to set query parameters
    let params = new HttpParams().set('per_page', '4').set('_embed', '');
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  getPostsd(categoryId = 107): Observable<any[]> {
    let params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '1')
      .set('_embed', '');
    return this.http.get<any[]>(this.apiDestacado, { params });
  }

  getPostBc(categoryId: number): Observable<any> {
    const url = `${this.Bc}/${categoryId}`;
    return this.http.get<any>(url);
  }
}
