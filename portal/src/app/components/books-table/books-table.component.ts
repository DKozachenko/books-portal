import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Author} from "../../interfaces/Author";
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../../interfaces/Book";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {AuthorDialogComponent} from "../author-dialog/author-dialog.component";
import {AuthorReadDialogComponent} from "../author-read-dialog/author-read-dialog.component";
import {BookView} from "../../interfaces/BookView";
import {Genre} from "../../interfaces/Genre";
import {BookService} from "../../services/book.service";
import {BookDialogComponent} from "../book-dialog/book-dialog.component";
import {BookReadDialogComponent} from "../book-read-dialog/book-read-dialog.component";

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.sass']
})
export class BooksTableComponent implements OnInit {
  @Output() private onAdd: EventEmitter<Book> = new EventEmitter<Book>()
  @Output() private onUpdate: EventEmitter<Book> = new EventEmitter<Book>()
  @Output() private onDelete: EventEmitter<number> = new EventEmitter<number>()
  @Output() private onDeleteAll: EventEmitter<void> = new EventEmitter<void>()

  public displayedColumns: string[] = ['number', 'title', 'description', 'actions'];
  @Input() public tableSource: MatTableDataSource<BookView> = new MatTableDataSource<BookView>();
  @Input() public genres: Genre[] = [];
  @Input() public authors: Author[] = [];
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  constructor(public dialog: MatDialog,
              private bookService: BookService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tableSource.paginator = this.paginator;
    this.tableSource.sort = this.sort;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();

    if (this.tableSource.paginator) {
      this.tableSource.paginator.firstPage();
    }
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '350px',
      data: {
        book: null,
        genres: this.genres,
        authors: this.authors
      }
    });

    dialogRef.afterClosed().subscribe((book: Book) => {
      this.onAdd.emit(book)
    });
  }

  public openReadDialog(id: number): void {
    this.bookService.getBook(id).subscribe((book: Book) => {
      const dialogRef = this.dialog.open(BookReadDialogComponent, {
        width: '500px',
        data: {
          book: book,
        }
      });
    })
  }

  public openUpdateDialog(id: number): void {
    this.bookService.getBook(id).subscribe((book: Book) => {
      const dialogRef = this.dialog.open(BookDialogComponent, {
        width: '350px',
        data: {
          book: book,
          genres: this.genres,
          authors: this.authors
        }
      });

      dialogRef.afterClosed().subscribe((book: Book) => {
        this.onUpdate.emit(book)
      });
    })
  }

  public delete(id: number) {
    this.onDelete.emit(id)
  }

  public deleteAll(): void {
    this.onDeleteAll.emit()
  }
}
