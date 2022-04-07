import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../../interfaces/Book";
import {BookService} from "../../services/book.service";
import {NgToastService} from "ng-angular-popup";
import {GenreView} from "../../interfaces/GenreView";
import {Genre} from "../../interfaces/Genre";
import {GenreService} from "../../services/genre.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {
  ngOnInit() {
  }

}
