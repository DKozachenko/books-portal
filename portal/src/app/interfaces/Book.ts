import {Author} from "./Author";
import {Genre} from "./Genre";

export interface Book {
  id?: number,
  title: string,
  description: string,
  datePublication: Date,
  size?: number,
  ageLimit?: number,
  writers?: Author[],
  genres?: Genre[]
}
