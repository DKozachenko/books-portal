import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Author} from "../../interfaces/Author";
import {Book} from "../../interfaces/Book";
import {AuthorDialogComponent} from "../author-dialog/author-dialog.component";

@Component({
  selector: 'app-author-read-dialog',
  templateUrl: './author-read-dialog.component.html',
  styleUrls: ['./author-read-dialog.component.sass']
})
export class AuthorReadDialogComponent implements OnInit {
  public currentAuthor: Author = {
    firstName: '',
    lastName: '',
    aboutText: '',
    dateBirth: new Date(),
    country: '',
    books: []
  }


  constructor(public dialogRef: MatDialogRef<AuthorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { author: Author}) { }

  ngOnInit(): void {
    this.currentAuthor = this.data.author
  }

  public close(): void {
    this.dialogRef.close();
  }

}
