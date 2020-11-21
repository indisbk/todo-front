import {CommonDAO} from './CommonDAO';
import {Task} from '../../../model/Task';
import {Category} from '../../../model/Category';
import {Priority} from '../../../model/Priority';
import {Observable} from 'rxjs';

/*
Task dao interface for specific methods
 */
export interface TaskDAO extends CommonDAO<Task> {

  // Search tasks by any parameters
  search(
    category: Category,
    searchText: string,
    status: boolean,
    priority: Priority
  ): Observable<Task[]>;

  // Completed tasks count in category
  getCompletedCountInCategory(category: Category): Observable<number>;

  // Uncompleted tasks count in category
  getUncompletedCountInCategory(category: Category): Observable<number>;

  // Total tasks count in category
  getTotalCountInCategory(category: Category): Observable<number>;

  // Total tasks count
  getTotalCount(): Observable<number>;
}
