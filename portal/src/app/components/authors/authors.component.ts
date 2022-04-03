import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Author} from "../../interfaces/Author";
import {AuthorService} from "../../services/author.service";
import {AuthorView} from "../../interfaces/AuthorView";
import {Book} from "../../interfaces/Book";
import {NgToastService} from "ng-angular-popup";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {
  public tableSource: MatTableDataSource<AuthorView> = new MatTableDataSource<AuthorView>();
  public authorsView: AuthorView[] = []
  public books: Book[] = []
  public isLoadingAuthors: boolean = true
  public isLoadingBooks: boolean = true

  constructor(private authorService: AuthorService,
              private bookService: BookService,
              private toastService: NgToastService) {
  }

  ngOnInit(): void {
    this.isLoadingAuthors= true
    this.isLoadingBooks= true
    this.getAllAuthors()
    this.getAllBooks()
  }

  private getAllAuthors() {
    this.authorService.getAllAuthors().subscribe((items: Author[]) => {
      this.fillAuthorsView(items)
      this.tableSource = new MatTableDataSource(this.authorsView);
      this.isLoadingAuthors = false
    })
  }

  private getAllBooks() {
    this.bookService.getAllBooks().subscribe((items: Book[]) => {
      this.books = items
      this.isLoadingBooks = false
    })
  }

  private fillAuthorsView(items: Author[]) {
    this.authorsView = []
    items.forEach((author: Author) => {
      const authorView: AuthorView = {
        id: author.id ?? 0,
        number: this.authorsView.length + 1,
        fullName: author.firstName + " " + author.lastName,
        about: author.aboutText
      }

      this.authorsView.push(authorView)
    })
  }

  public addAuthor(author: Author) {
    if (author) {
      this.isLoadingAuthors = true
      this.authorService.addAuthor(author).subscribe((author: Author) => {
        this.getAllAuthors()
        this.toastService.success({detail:"SUCCESS",summary: `Author was added with id ${author.id}`,duration:3000})
      })
    }
  }

  public updateAuthor(author: Author) {
    if (author) {

      this.isLoadingAuthors = true
      this.authorService.updateAuthor(author).subscribe((author: Author) => {
        console.log(1)
        this.getAllAuthors()
        this.toastService.warning({detail:"WARN",summary: `Author with id ${author.id} was updated`,duration:3000})
      })
    }
  }

  public deleteAuthor(id: number): void {
    if (id) {
      this.isLoadingAuthors = true
      this.authorService.deleteAuthor(id).subscribe((author: Author) => {
        this.getAllAuthors()
        this.toastService.error({detail:"ERROR",summary:`Author with id ${author.id} was deleted`,duration:3000});
      })
    }
  }
}
