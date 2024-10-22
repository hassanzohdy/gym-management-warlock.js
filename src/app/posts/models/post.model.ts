import { Model, type Casts } from "@warlock.js/cascade";

export class Post extends Model {
  /**
   * Collection name
   */
  public static collection = "posts";

  /**
   * Casts
   */
  protected casts: Casts = {
    title: "string",
    content: "string",
  };
}
