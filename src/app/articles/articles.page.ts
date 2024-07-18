import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  articles: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.apiService.getArticles().subscribe(
      data => {
        this.articles = data;
      },
      error => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    );
  }
}
