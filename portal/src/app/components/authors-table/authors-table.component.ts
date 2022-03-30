import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AuthorView} from "../../interfaces/AuthorView";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {Author} from "../../interfaces/Author";

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.sass']
})
export class AuthorsTableComponent implements OnInit {
  @Input() public tableSource: MatTableDataSource<AuthorView> = new MatTableDataSource<AuthorView>();
  public displayedColumns: string[] = ['number', 'fullName', 'about', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) { }

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

  public openReadDialog(): void {
    const currentAuthor: Author = {
      id: 0,
      firstName: '',
      lastName: '',
      dateBirth: new Date(),
      aboutText: ''
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: currentAuthor,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
