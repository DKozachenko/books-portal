import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Author} from "../../interfaces/Author";
import {AuthorService} from "../../services/author.service";
import {AuthorView} from "../../interfaces/AuthorView";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {
  private authors: Author[] = []
  public displayedColumns: string[] = ['number', 'fullName', 'about', 'actions'];
  public tableSource: MatTableDataSource<AuthorView> = new MatTableDataSource<AuthorView>();

  public authorsView: AuthorView[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service: AuthorService) {
  }

  ngOnInit(): void {
    this.service.getAllAuthors().subscribe((items: Author[]) => {
      this.authors = items
      items.forEach((author: Author) => {
        const authorView: AuthorView = {
          id: author.id ?? 0,
          number: this.authorsView.length + 1,
          fullName: author.firstName + " " + author.lastName,
          about: author.aboutText
        }

        this.authorsView.push(authorView)
      })

      this.tableSource = new MatTableDataSource(this.authorsView);

      this.tableSource.paginator = this.paginator;
      this.tableSource.sort = this.sort;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();

    if (this.tableSource.paginator) {
      this.tableSource.paginator.firstPage();
    }
  }

}
