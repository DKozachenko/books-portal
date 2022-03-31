import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Author} from "../../interfaces/Author";
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../services/book.service";
import {Book} from "../../interfaces/Book";

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.sass']
})
export class AuthorDialogComponent implements OnInit {
  public newAuthor: Author = {
    id: 0,
    firstName: '',
    lastName: '',
    aboutText: '',
    dateBirth: new Date(),
    country: '',
    books: []
  }

  public form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    aboutText: new FormControl(''),
    dateBirth: new FormControl(''),
    country: new FormControl(''),
    books: new FormControl('')
  })

  public books: Book[] = []

  constructor(public dialogRef: MatDialogRef<AuthorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Author,
              private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((books: Book[]) => {
      this.books = books
      console.log(this.books)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public add(): void {
    console.log(this.form)
  }

}
