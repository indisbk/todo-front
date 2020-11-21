/*
CRUD generic interface(async work by rxJs)
 */
import {Observable} from 'rxjs';

export interface CommonDAO<T> {

  add(object: T): Observable<T>;

  get(id: number): Observable<T>;

  delete(id: number): Observable<T>;

  update(object: T): Observable<T>;

  getAll(): Observable<T[]>;
}
