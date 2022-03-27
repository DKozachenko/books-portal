import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {AuthorsComponent} from "./components/authors/authors.component";
import {BooksComponent} from "./components/books/books.component";
import {GenresComponent} from "./components/genres/genres.component";
import {ErrorComponent} from "./components/error/error.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'books', component: BooksComponent},
  {path: 'genres', component: GenresComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
