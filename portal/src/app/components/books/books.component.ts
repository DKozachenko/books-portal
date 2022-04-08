import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../../interfaces/Book";
import {BookService} from "../../services/book.service";
import {NgToastService} from "ng-angular-popup";
import {GenreView} from "../../interfaces/GenreView";
import {Genre} from "../../interfaces/Genre";
import {GenreService} from "../../services/genre.service";
import {AuthorService} from "../../services/author.service";
import {Author} from "../../interfaces/Author";
import {BookView} from "../../interfaces/BookView";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {
  public tableSource: MatTableDataSource<BookView> = new MatTableDataSource<BookView>();
  public booksView: BookView[] = []
  public genres: Genre[] = []
  public authors: Author[] = []
  public isLoadingAuthors: boolean = true
  public isLoadingBooks: boolean = true
  public isLoadingGenres: boolean = true
  public isError: boolean = false

  constructor(private authorService: AuthorService,
              private bookService: BookService,
              private genreService: GenreService,
              private toastService: NgToastService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.isLoadingAuthors= true
    this.isLoadingBooks= true
    this.isLoadingGenres = true
    this.getAllAuthors()
    this.getAllGenres()
    this.getAllBooks()
  }

  private getAllAuthors() {
    this.authorService.getAllAuthors().subscribe((items: Author[]) => {
      this.authors = items
      this.isLoadingAuthors = false
    })
  }

  private getAllGenres() {
    this.genreService.getAllGenres().subscribe((items: Genre[]) => {
      this.genres = items
      this.isLoadingGenres = false
    })
  }

  private getAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (items: Book[]) => {
        this.fillBooksView(items)
        this.tableSource = new MatTableDataSource(this.booksView);
        this.isLoadingBooks = false
      },
      error: (err) => {
        this.isError = true
      }
    })
  }

  private fillBooksView(items: Book[]) {
    this.booksView = []
    items.forEach((book: Book) => {
      const bookView: BookView = {
        id: book.id ?? 0,
        number: this.booksView.length + 1,
        title: book.title,
        desc: book.description
      }

      this.booksView.push(bookView)
    })
  }

  public addBook(book: Book) {
    if (book) {
      this.isLoadingBooks = true
      this.bookService.addBook(book).subscribe((book: Book) => {
        this.getAllBooks()
        this.toastService.success({detail:"SUCCESS",summary: `Book was added with id ${book.id}`,duration:3000})
      })
    }
  }

  public updateBook(book: Book) {
    if (book) {
      this.isLoadingBooks = true
      this.bookService.updateBook(book).subscribe((book: Book) => {
        this.getAllBooks()
        this.toastService.warning({detail:"WARN",summary: `Book with id ${book.id} was updated`,duration:3000})
      })
    }
  }

  public deleteBook(id: number): void {
    if (id) {
      this.isLoadingBooks = true
      this.bookService.deleteBook(id).subscribe((book: Book) => {
        this.getAllBooks()
        this.toastService.error({detail:"ERROR",summary:`Book with id ${book.id} was deleted`,duration:3000});
      })
    }
  }

  public deleteAllBooks(): void {
    this.isLoadingBooks = true
    this.bookService.deleteAllBooks().subscribe(() => {
      this.getAllBooks()
      this.toastService.info({detail:"INFO",summary:`You deleted all books`,duration:3000})
    })
  }

  public back(): void {
    this.location.back()
  }
}
