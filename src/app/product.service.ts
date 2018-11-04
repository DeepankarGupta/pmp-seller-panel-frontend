import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productBaseUrl: string = "http://localhost:8080/api/product"
  constructor(private http: HttpClient) { }

  getProducts(searchBy: string = null, searchValue: string = null, sortBy: string = null, status: number = null, category: number = null) {
    let requestUrl: string = this.productBaseUrl + '?'
    if (searchBy && searchValue) {
      requestUrl += `searchBy=${searchBy}&searchValue=${searchValue}&`
    }
    if (status) {
      requestUrl += `status=${status}&`
    }
    if (category) {
      requestUrl += `category=${category}&`
    }
    if (sortBy) {
      requestUrl += `sortBy=${sortBy}`
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'authentication': localStorage.getItem('JWT'),
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(requestUrl, httpOptions)
  }

  getProductById(productId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'authentication': localStorage.getItem('JWT'),
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.productBaseUrl + "/" + productId, httpOptions)
  }

  addProduct(product: IProduct) {
    let requestUrl: string = this.productBaseUrl
    const httpOptions = {
      headers: new HttpHeaders({
        'authentication': localStorage.getItem('JWT'),
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(requestUrl, product, httpOptions)
  }

  updateProduct(product: IProduct, productId: number) {
    let requestUrl: string = this.productBaseUrl + "/" + productId
    const httpOptions = {
      headers: new HttpHeaders({
        'authentication': localStorage.getItem('JWT'),
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(requestUrl, product, httpOptions)
  }
}
