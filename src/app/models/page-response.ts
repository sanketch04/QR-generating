import { Employee } from './employee';

export interface PageResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
