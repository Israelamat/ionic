import { HttpClient } from '@angular/common/http';
      import { Injectable, inject } from '@angular/core';
      import { Observable, map } from 'rxjs';
      import { Product } from '../interfaces/product';
      import { Comment } from '../interfaces/comment';

      @Injectable({
        providedIn: 'root',
      })
      export class ProductsService {
        #http = inject(HttpClient);

        getProducts(): Observable<Product[]> {
          return this.#http
            .get<{ products: Product[] }>('products')
            .pipe(map((resp) => resp.products));
        }

        getProduct(id: number): Observable<Product> {
          return this.#http
            .get<{ product: Product }>(`products/${id}`)
            .pipe(map((resp) => resp.product));
        }

        addProduct(prod: Product): Observable<Product> {
          return this.#http
            .post<{ product: Product }>('products', prod)
            .pipe(map((resp) => resp.product));
        }

        deleteProduct(idProd: number): Observable<void> {
          return this.#http.delete<void>(`products/${idProd}`);
        }

        addComment(idProd: number, comment: string): Observable<Comment> {
          return this.#http
            .post<{ comment: Comment }>(`products/${idProd}/comments`, {
              text: comment,
            })
            .pipe(map((resp) => resp.comment));
        }

        getComments(idProd: number): Observable<Comment[]> {
          return this.#http
            .get<{ comments: Comment[] }>(`products/${idProd}/comments`)
            .pipe(map((resp) => resp.comments));
        }
      }