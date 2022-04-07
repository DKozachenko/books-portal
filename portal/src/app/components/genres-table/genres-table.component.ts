import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../../interfaces/Book";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {AuthorDialogComponent} from "../author-dialog/author-dialog.component";
import {AuthorReadDialogComponent} from "../author-read-dialog/author-read-dialog.component";
import {Genre} from "../../interfaces/Genre";
import {GenreView} from "../../interfaces/GenreView";
import {GenreService} from "../../services/genre.service";
import {GenreDialogComponent} from "../genre-dialog/genre-dialog.component";
import {GenreReadDialogComponent} from "../genre-read-dialog/genre-read-dialog.component";

@Component({
  selector: 'app-genres-table',
  templateUrl: './genres-table.component.html',
  styleUrls: ['./genres-table.component.sass']
})
export class GenresTableComponent implements OnInit {
  @Output() private onAdd: EventEmitter<Genre> = new EventEmitter<Genre>()
  @Output() private onUpdate: EventEmitter<Genre> = new EventEmitter<Genre>()
  @Output() private onDelete: EventEmitter<number> = new EventEmitter<number>()
  @Output() private onDeleteAll: EventEmitter<void> = new EventEmitter<void>()

  public displayedColumns: string[] = ['number', 'name', 'actions'];
  @Input() public tableSource: MatTableDataSource<GenreView> = new MatTableDataSource<GenreView>();
  @Input() public books: Book[] = [];
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  constructor(public dialog: MatDialog,
              private genreService: GenreService) { }

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
    const dialogRef = this.dialog.open(GenreDialogComponent, {
      width: '350px',
      data: {
        genre: null,
        books: this.books
      }
    });

    dialogRef.afterClosed().subscribe((genre: Genre) => {
      this.onAdd.emit(genre)
    });
  }

  public openReadDialog(id: number): void {
    this.genreService.getGenre(id).subscribe((genre: Genre) => {
      const dialogRef = this.dialog.open(GenreReadDialogComponent, {
        width: '500px',
        data: {
          genre: genre,
        }
      });
    })
  }

  public openUpdateDialog(id: number): void {
    this.genreService.getGenre(id).subscribe((genre: Genre) => {
      const dialogRef = this.dialog.open(GenreDialogComponent, {
        width: '350px',
        data: {
          genre: genre,
          books: this.books
        }
      });

      dialogRef.afterClosed().subscribe((genre: Genre) => {
        this.onUpdate.emit(genre)
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
