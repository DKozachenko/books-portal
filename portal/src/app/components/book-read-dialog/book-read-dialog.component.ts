import {Component, Inject, OnInit} from '@angular/core';
import {Author} from "../../interfaces/Author";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorDialogComponent} from "../author-dialog/author-dialog.component";
import {Book} from "../../interfaces/Book";
import {BookDialogComponent} from "../book-dialog/book-dialog.component";

@Component({
  selector: 'app-book-read-dialog',
  templateUrl: './book-read-dialog.component.html',
  styleUrls: ['./book-read-dialog.component.sass']
})
export class BookReadDialogComponent implements OnInit {
  public currentBook: Book = {
    title: '',
    description: '',
    size: 0,
    ageLimit: 0,
    datePublication: new Date(),
    writers: [],
    genres: []
  }

  constructor(public dialogRef: MatDialogRef<BookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { book: Book }) { }

  ngOnInit(): void {
    this.currentBook = this.data.book
  }

  public close(): void {
    this.dialogRef.close();
  }
}
