import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Author} from "../../interfaces/Author";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../services/book.service";
import {Book} from "../../interfaces/Book";
import {forkJoin} from "rxjs";
import {Event} from "@angular/router";

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.sass']
})
export class AuthorDialogComponent implements OnInit {
  public newAuthor: Author = {
    firstName: '',
    lastName: '',
    aboutText: '',
    dateBirth: new Date(),
    country: '',
    books: []
  }

  public form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    aboutText: new FormControl('', [Validators.required, Validators.maxLength(768)]),
    dateBirth: new FormControl('', [Validators.required]),
    country: new FormControl(''),
    books: new FormControl('')
  })

  public books: Book[] = []

  constructor(public dialogRef: MatDialogRef<AuthorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Author,
              private bookService: BookService) { }

  ngOnInit(): void {
    this.newAuthor = this.data

    this.bookService.getAllBooks().subscribe((books: Book[]) => {
      this.books = books
      console.log(this.books)
    })
  }

  public close(): void {
    this.dialogRef.close();
  }

  public changeBookNames(event: any): void {
    let bookNames: string[] = []

    if (this.form.get('books')?.value) {
      bookNames = this.form.get('books')?.value
    }

    this.newAuthor.books = []

    bookNames.forEach((bookName: string) => {
      const book: Book = this.books.find((b: Book) => b.title === bookName) ?? {id: 0, title: '', size: 0, description: '', datePublication: new Date(), ageLimit: 0, writers: [], genres: []}


      this.newAuthor.books?.push(book)
    })
  }
}
