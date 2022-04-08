import {Component, Inject, OnInit} from '@angular/core';
import {Author} from "../../interfaces/Author";
import {Book} from "../../interfaces/Book";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Genre} from "../../interfaces/Genre";

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.sass']
})
export class BookDialogComponent implements OnInit {
  public newBook: Book = {
    title: '',
    description: '',
    size: 0,
    ageLimit: 0,
    datePublication: new Date(),
    writers: [],
    genres: []
  }
  public genres: Genre[] = []
  public authors: Author[] = []

  public form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    size: new FormControl('', [Validators.min(1)]),
    ageLimit: new FormControl('', [Validators.min(0), Validators.max(18)]),
    datePublication: new FormControl('', [Validators.required]),
    genres: new FormControl(''),
    authors: new FormControl('')
  })

  constructor(public dialogRef: MatDialogRef<BookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { book: Book | null, genres: Genre[], authors: Author[] }) { }

  ngOnInit(): void {
    this.newBook = this.data.book ?? {
      title: '',
      description: '',
      size: 0,
      ageLimit: 0,
      datePublication: new Date(),
      writers: [],
      genres: []
    }
    this.genres = this.data.genres
    this.authors = this.data.authors
  }

  private fillBookGenresByGenreNames(genreNames: string[]): void {
    genreNames.forEach((genreName: string) => {
      const genre: Genre = this.genres.find((g: Genre) => g.name === genreName) ?? {
        id: 0,
        name: ''
      }

      this.newBook.genres?.push(genre)
    })
  }

  public changeGenreNames(event: any): void {
    let genreNames: string[] = []
    if (this.form.get('genres')?.value) {
      genreNames = this.form.get('genres')?.value
    }

    this.newBook.genres = []
    this.fillBookGenresByGenreNames(genreNames)
  }

  private fillBookAuthorsByAuthorNames(authorNames: string[]): void {
    authorNames.forEach((authorName: string) => {
      const author: Author = this.authors.find((a: Author) => a.firstName === authorName) ?? {
        firstName: '',
        lastName: '',
        aboutText: '',
        dateBirth: new Date(),
        country: '',
      }

      this.newBook.writers?.push(author)
    })
  }

  public changeAuthorNames(event: any): void {
    let authorNames: string[] = []
    if (this.form.get('authors')?.value) {
      authorNames = this.form.get('authors')?.value
    }

    this.newBook.writers = []
    this.fillBookAuthorsByAuthorNames(authorNames)
  }

  public close(): void {
    this.dialogRef.close();
  }
}
