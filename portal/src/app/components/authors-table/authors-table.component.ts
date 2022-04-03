import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AuthorView} from "../../interfaces/AuthorView";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {Author} from "../../interfaces/Author";
import {AuthorDialogComponent} from "../author-dialog/author-dialog.component";
import {Book} from "../../interfaces/Book";
import {AuthorService} from "../../services/author.service";

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.sass']
})
export class AuthorsTableComponent implements OnInit {
  @Output() private onAdd: EventEmitter<Author> = new EventEmitter<Author>()
  @Output() private onUpdate: EventEmitter<Author> = new EventEmitter<Author>()
  @Output() private onDelete: EventEmitter<number> = new EventEmitter<number>()

  public displayedColumns: string[] = ['number', 'fullName', 'about', 'actions'];
  @Input() public tableSource: MatTableDataSource<AuthorView> = new MatTableDataSource<AuthorView>();
  @Input() public books: Book[] = [];
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

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
    const dialogRef = this.dialog.open(AuthorDialogComponent, {
      width: '350px',
      data: {
        author: null,
        books: this.books
      }
    });

    dialogRef.afterClosed().subscribe((author: Author) => {
      this.onAdd.emit(author)
    });
  }

  public openUpdateDialog(id: number): void {
    this.authorService.getAuthor(id).subscribe((author: Author) => {
      const dialogRef = this.dialog.open(AuthorDialogComponent, {
        width: '350px',
        data: {
          author: author,
          books: this.books
        }
      });

      dialogRef.afterClosed().subscribe((author: Author) => {
        this.onUpdate.emit(author)
      });
    })
  }

  public delete(id: number) {
    this.onDelete.emit(id)
  }

}
