export interface Paginated<T> {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  limit: number;
  items: T[];
}

export interface Author {
  id?: number;
  name: string;
  bio?: string;
  birthdate: string;
}

export type PaginatedAuthor = Paginated<Author>;

export interface AuthorQuery {
  page?: string;
  limit?: string;
}

export interface Emty {}

export interface Book {
  id?: number;
  title: string;
  description?: string;
  published_date: string;
  author_id: number;
}

export type PaginatedBook = Paginated<Book>;
