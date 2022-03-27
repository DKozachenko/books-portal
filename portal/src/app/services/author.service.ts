import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../interfaces/Author";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private controllerName: string = 'Author'

  constructor(private http: HttpClient) { }

  public getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.serverConnection}/${this.controllerName}`)
  }

  public getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${environment.serverConnection}/${this.controllerName}/${id}`)
  }

  public addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(`${environment.serverConnection}/${this.controllerName}`, author)
  }
  public updateAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(`${environment.serverConnection}/${this.controllerName}`, author)
  }

  public deleteAllAuthors(): Observable<any> {
    return this.http.delete<any>(`${environment.serverConnection}/${this.controllerName}`)
  }

  public deleteAuthor(id: number): Observable<Author> {
    return this.http.delete<Author>(`${environment.serverConnection}/${this.controllerName}/${id}`)
  }
}
