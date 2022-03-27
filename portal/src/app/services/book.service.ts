import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Book} from "../interfaces/Book";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private controllerName: string = 'Book'

  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.serverConnection}/${this.controllerName}`)
  }

  public getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.serverConnection}/${this.controllerName}/${id}`)
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.serverConnection}/${this.controllerName}`, book)
  }
  public updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${environment.serverConnection}/${this.controllerName}`, book)
  }

  public deleteAllBooks(): Observable<any> {
    return this.http.delete<any>(`${environment.serverConnection}/${this.controllerName}`)
  }

  public deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(`${environment.serverConnection}/${this.controllerName}/${id}`)
  }
}
