import {Book} from "./Book";

export interface Genre {
  id?: number,
  name: string,
  books?: Book[]
}
