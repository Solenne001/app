// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServices {
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

// publish.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api.service'; // Assurez-vous que le chemin est correct
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {
  articleForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  async publishArticle() {
    const article = this.articleForm.value;
    this.apiService.publishArticle(article).subscribe(
      async response => {
        const toast = await this.toastController.create({
          message: 'Article publié avec succès',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
      },
      async (error: HttpErrorResponse) => {
        let message = 'Erreur lors de la publication de l\'article';
        if (error.status === 0) {
          message += ': Problème de réseau ou de CORS';
        } else {
          message += `: ${error.message}`;
        }

        const toast = await this.toastController.create({
          message: message,
          duration: 2000,
          color: 'danger'
        });
        await toast.present();

        console.error('Erreur lors de la publication de l\'article', error);
      }
    );
  }
}
