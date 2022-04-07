import {Component, Inject, OnInit} from '@angular/core';
import {Book} from "../../interfaces/Book";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Genre} from "../../interfaces/Genre";

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.sass']
})
export class GenreDialogComponent implements OnInit {
  public newGenre: Genre = {
    name: '',
    books: []
  }
  public books: Book[] = []

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    books: new FormControl('')
  })


  constructor(public dialogRef: MatDialogRef<GenreDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { genre: Genre | null, books: Book[] }) { }

  ngOnInit(): void {
    this.newGenre = this.data.genre ?? {
      name: '',
      books: []
    }
    this.books = this.data.books
  }

  private fillGenreBooksByBookNames(bookNames: string[]): void {
    bookNames.forEach((bookName: string) => {
      const book: Book = this.books.find((b: Book) => b.title === bookName) ?? {
        id: 0,
        title: '',
        description: '',
        datePublication: new Date(),
        size: 0,
        ageLimit: 0,
        writers: [],
        genres: []
      }

      this.newGenre.books?.push(book)
    })
  }

  public changeBookNames(event: any): void {
    let bookNames: string[] = []
    if (this.form.get('books')?.value) {
      bookNames = this.form.get('books')?.value
    }

    this.newGenre.books = []
    this.fillGenreBooksByBookNames(bookNames)
  }

  public close(): void {
    this.dialogRef.close();
  }

}
