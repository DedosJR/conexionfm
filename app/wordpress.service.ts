import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError}from 'rxjs';
import { retry, catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private apiUrl = 'https://panel.conexionfm.com/wp-json/wp/v2/posts';
  private categoriesUrl = 'https://panel.conexionfm.com/wp-json/wp/v2/categories';
  private timeoutDuration = 10000;

  constructor(private http: HttpClient) {}


  private getWithConfig(url: string, params: HttpParams): Observable<any> {
    return this.http.get<any>(url, { params }).pipe(
      timeout(this.timeoutDuration),
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => 'Error connecting to the server. Please try again later.');
  }

  // Home Page Methods
  getPostsnews(): Observable<any[]> {
    const params = new HttpParams().set('per_page', '5').set('_embed', '');
    return this.getWithConfig(this.apiUrl, params);
  }

  getPosts(): Observable<any[]> {
    const params = new HttpParams().set('per_page', '1').set('_embed', '');
    return this.getWithConfig(this.apiUrl, params);
  }

  getPostsnewsArticle(): Observable<any[]> {
    const params = new HttpParams().set('per_page', '3').set('_embed', '');
    return this.getWithConfig(this.apiUrl, params);
  }

  // Baja California Methods
  getPostsd(categoryId = 2): Observable<any[]> {
    const params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '4')
      .set('_embed', '');
    return this.getWithConfig(this.apiUrl, params);
  }

  getCatBC(categoryId = 2): Observable<any[]> {
    const params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '40')
      .set('_embed', '');
    return this.getWithConfig(this.apiUrl, params);
  }

  getPostBc(categoryId: number): Observable<any> {
    return this.getWithConfig(`${this.categoriesUrl}/${categoryId}`, new HttpParams());
  }

  getPostBccarrousel(categoryId = 2): Observable<any[]> {
    const params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '1')
      .set('_embed', '');
    return this.getWithConfig(this.apiUrl, params);
  }

  // Featured Posts
  getdestacado(categoryId = 3): Observable<any[]> {
    const params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '1')
      .set('_embed', '');
    return this.getWithConfig(this.apiUrl, params);
  }

  // Sports Methods
  getPostDeportespostSlide(categoryId = 4): Observable<any[]> {
    const params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '1')
      .set('_embed', '');
    return this.getWithConfig(this.apiUrl, params);
  }

  getPostDeportespost(categoryId = 4): Observable<any[]> {
    const params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '4')
      .set('_embed', '');
    return this.getWithConfig(this.apiUrl, params);
  }

  getCatDep(categoryId = 4): Observable<any[]> {
    const params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', '40')
      .set('_embed', '');
    return this.getWithConfig(this.apiUrl, params);
  }

  getPostDeportes(categoryId: number): Observable<any> {
    return this.getWithConfig(`${this.categoriesUrl}/${categoryId}`, new HttpParams());
  }

  // Single Post Method
  getPostById(postId: number): Observable<any> {
    return this.getWithConfig(`${this.apiUrl}/${postId}`, new HttpParams());
  }
}
