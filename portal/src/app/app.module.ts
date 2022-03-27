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
import {MatSortHeader, MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    BooksComponent,
    GenresComponent,
    ErrorComponent,
    WelcomeComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
