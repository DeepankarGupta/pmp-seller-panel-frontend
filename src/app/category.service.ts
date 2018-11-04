import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryBaseUrl: string = "http://localhost:8080/api/category"
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.categoryBaseUrl);
  }
}
