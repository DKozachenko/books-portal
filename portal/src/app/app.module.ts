import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgToastModule} from "ng-angular-popup";
import {MatIconModule} from "@angular/material/icon";
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { GenresComponent } from './components/genres/genres.component';
import { ErrorComponent } from './components/error/error.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import { AuthorDialogComponent } from './components/author-dialog/author-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { AuthorReadDialogComponent } from './components/author-read-dialog/author-read-dialog.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import { GenresTableComponent } from './components/genres-table/genres-table.component';
import { GenreDialogComponent } from './components/genre-dialog/genre-dialog.component';
import { GenreReadDialogComponent } from './components/genre-read-dialog/genre-read-dialog.component';
import { BooksTableComponent } from './components/books-table/books-table.component';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import { BookReadDialogComponent } from './components/book-read-dialog/book-read-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    BooksComponent,
    GenresComponent,
    ErrorComponent,
    WelcomeComponent,
    AuthorsTableComponent,
    AuthorDialogComponent,
    AuthorReadDialogComponent,
    GenresTableComponent,
    GenreDialogComponent,
    GenreReadDialogComponent,
    BooksTableComponent,
    BookDialogComponent,
    BookReadDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgToastModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgToastModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
