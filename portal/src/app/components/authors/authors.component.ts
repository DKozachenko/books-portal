import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
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
  public tableSource: MatTableDataSource<AuthorView> = new MatTableDataSource<AuthorView>();
  public authorsView: AuthorView[] = []

  public isLoading: boolean = true

  constructor(private service: AuthorService) {
  }

  ngOnInit(): void {
    this.service.getAllAuthors().subscribe((items: Author[]) => {
      this.authors = items
      this.fillAuthorsView(items)
      this.tableSource = new MatTableDataSource(this.authorsView);
      this.isLoading = false
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

}
