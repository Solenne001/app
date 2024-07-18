import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir les articles
  getArticles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  // Méthode pour publier un article
  publishArticle(article: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts`, article);
  }
}
