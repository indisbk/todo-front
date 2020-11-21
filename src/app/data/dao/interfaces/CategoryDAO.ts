import {CommonDAO} from './CommonDAO';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';

/*
Category dao interface for specific methods
 */
export interface CategoryDAO extends CommonDAO<Category> {

  // Search category by title
  search(title: string): Observable<Category[]>;
}
