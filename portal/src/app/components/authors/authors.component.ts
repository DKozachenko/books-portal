import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Author} from "../../interfaces/Author";
import {AuthorService} from "../../services/author.service";
import {AuthorView} from "../../interfaces/AuthorView";
import {Book} from "../../interfaces/Book";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {
  public tableSource: MatTableDataSource<AuthorView> = new MatTableDataSource<AuthorView>();
  public authorsView: AuthorView[] = []
  public isLoading: boolean = true

  constructor(private authorService: AuthorService,
              private toastService: NgToastService) {
  }

  ngOnInit(): void {
    this.isLoading= true
    this.getAllAuthors()
  }

  private getAllAuthors() {
    this.authorService.getAllAuthors().subscribe((items: Author[]) => {
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

  public addAuthor(author: Author) {
    if (author) {
      this.isLoading= true
      this.authorService.addAuthor(author).subscribe((author: Author) => {
        this.getAllAuthors()
        this.toastService.success({detail:"SUCCESS",summary: `Author was added with id ${author.id}`,duration:3000})
      })
    }
  }
}
