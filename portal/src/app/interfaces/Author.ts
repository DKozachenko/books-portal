import {Book} from "./Book";

export interface Author {
  id?: number,
  firstName: string,
  lastName: string,
  dateBirth: Date,
  aboutText: string,
  country?: string,
  books?: Book[]
}
