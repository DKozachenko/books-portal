import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Author} from "../../interfaces/Author";
import {AuthorService} from "../../services/author.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'aboutText'];
  public tableSource: MatTableDataSource<Author> = new MatTableDataSource<Author>();
  public authors: Author[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service: AuthorService) {
  }

  ngOnInit(): void {
    this.service.getAllAuthors().subscribe((items: Author[]) => {
      this.authors = items
      this.tableSource = new MatTableDataSource(this.authors);

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
