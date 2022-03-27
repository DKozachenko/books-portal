import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Genre} from "../interfaces/Genre";

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private controllerName: string = 'Genre'

  constructor(private http: HttpClient) { }

  public getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.serverConnection}/${this.controllerName}`)
  }

  public getGenre(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${environment.serverConnection}/${this.controllerName}/${id}`)
  }

  public addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${environment.serverConnection}/${this.controllerName}`, genre)
  }
  public updateGenre(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${environment.serverConnection}/${this.controllerName}`, genre)
  }

  public deleteAllGenres(): Observable<any> {
    return this.http.delete<any>(`${environment.serverConnection}/${this.controllerName}`)
  }

  public deleteGenre(id: number): Observable<Genre> {
    return this.http.delete<Genre>(`${environment.serverConnection}/${this.controllerName}/${id}`)
  }
}
