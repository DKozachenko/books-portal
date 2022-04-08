import {Component, Inject, OnInit} from '@angular/core';
import {Author} from "../../interfaces/Author";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorDialogComponent} from "../author-dialog/author-dialog.component";
import {Genre} from "../../interfaces/Genre";
import {GenreDialogComponent} from "../genre-dialog/genre-dialog.component";

@Component({
  selector: 'app-genre-read-dialog',
  templateUrl: './genre-read-dialog.component.html',
  styleUrls: ['./genre-read-dialog.component.sass']
})
export class GenreReadDialogComponent implements OnInit {
  public currentGenre: Genre = {
    name: '',
    books: []
  }

  constructor(public dialogRef: MatDialogRef<GenreDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { genre: Genre}) { }

  ngOnInit(): void {
    this.currentGenre = this.data.genre
  }

  public close(): void {
    this.dialogRef.close();
  }
}
