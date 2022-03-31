import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AuthorView} from "../../interfaces/AuthorView";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {Author} from "../../interfaces/Author";
import {AuthorDialogComponent} from "../author-dialog/author-dialog.component";
import {BookService} from "../../services/book.service";
import {Book} from "../../interfaces/Book";
import {AuthorService} from "../../services/author.service";

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.sass']
})
export class AuthorsTableComponent implements OnInit {
  @Input() public tableSource: MatTableDataSource<AuthorView> = new MatTableDataSource<AuthorView>();
  @Input() public books: Book[] = [];
  public displayedColumns: string[] = ['number', 'fullName', 'about', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() onAdd: EventEmitter<Author> = new EventEmitter<Author>()

  constructor(public dialog: MatDialog,
              private authorService: AuthorService) { }

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
    const currentAuthor: Author = {
      firstName: '',
      lastName: '',
      dateBirth: new Date(),
      aboutText: '',
      country: '',
      books: []
    }

    const dialogRef = this.dialog.open(AuthorDialogComponent, {
      width: '350px',
      data: currentAuthor
    });

    dialogRef.afterClosed().subscribe((author: Author) => {
      this.onAdd.emit(author)
    });
  }

}
