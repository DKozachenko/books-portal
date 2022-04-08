import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {GenreView} from "../../interfaces/GenreView";
import {Book} from "../../interfaces/Book";
import {GenreService} from "../../services/genre.service";
import {BookService} from "../../services/book.service";
import {NgToastService} from "ng-angular-popup";
import {Location} from "@angular/common";
import {Genre} from "../../interfaces/Genre";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.sass']
})
export class GenresComponent implements OnInit {

  public tableSource: MatTableDataSource<GenreView> = new MatTableDataSource<GenreView>();
  public genresView: GenreView[] = []
  public books: Book[] = []
  public isLoadingGenres: boolean = true
  public isLoadingBooks: boolean = true
  public isError: boolean = false

  constructor(private genreService: GenreService,
              private bookService: BookService,
              private toastService: NgToastService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.isLoadingGenres = true
    this.isLoadingBooks = true
    this.getAllGenres()
    this.getAllBooks()
  }

  private getAllGenres() {
    this.genreService.getAllGenres().subscribe({
      next: (items: Genre[]) => {
        this.fillGenresView(items)
        this.tableSource = new MatTableDataSource(this.genresView);
        this.isLoadingGenres = false
      },
      error: (err) => {
        this.isError = true
      }
    })
  }

  private getAllBooks() {
    this.bookService.getAllBooks().subscribe((items: Book[]) => {
      this.books = items
      this.isLoadingBooks = false
    })
  }

  private fillGenresView(items: Genre[]) {
    this.genresView = []
    items.forEach((genre: Genre) => {
      const genreView: GenreView = {
        id: genre.id ?? 0,
        number: this.genresView.length + 1,
        name: genre.name
      }

      this.genresView.push(genreView)
    })
  }

  public addGenre(genre: Genre) {
    if (genre) {
      this.isLoadingGenres = true
      this.genreService.addGenre(genre).subscribe((genre: Genre) => {
        this.getAllGenres()
        this.toastService.success({detail: "SUCCESS", summary: `Genre was added with id ${genre.id}`, duration: 3000})
      })
    }
  }

  public updateGenre(genre: Genre) {
    if (genre) {
      this.isLoadingGenres = true
      this.genreService.updateGenre(genre).subscribe((genre: Genre) => {
        this.getAllGenres()
        this.toastService.warning({detail: "WARN", summary: `Genre with id ${genre.id} was updated`, duration: 3000})
      })
    }
  }

  public deleteGenre(id: number): void {
    if (id) {
      this.isLoadingGenres = true
      this.genreService.deleteGenre(id).subscribe((genre: Genre) => {
        this.getAllGenres()
        this.toastService.error({detail: "ERROR", summary: `Genre with id ${genre.id} was deleted`, duration: 3000});
      })
    }
  }

  public deleteAllGenres(): void {
    this.isLoadingGenres = true
    this.genreService.deleteAllGenres().subscribe(() => {
      this.getAllGenres()
      this.toastService.info({detail: "INFO", summary: `You deleted all genres`, duration: 3000})
    })
  }

  public back(): void {
    this.location.back()
  }
}
