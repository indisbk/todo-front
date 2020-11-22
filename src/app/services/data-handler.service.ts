import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {TaskDAOArray} from '../data/dao/impl/TaskDAOArray';
import {CategoryDAOArray} from '../data/dao/impl/CategoryDAOArray';
import {Priority} from '../model/Priority';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor(
    private taskDaoArray: TaskDAOArray,
    private categoryDAOArray: CategoryDAOArray
  ) {
  }

  getCategories(): Observable<Category[]> {
    return this.categoryDAOArray.getAll();
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  getTasksByCategory(category: Category): Observable<Task[]> {
    return this.taskDaoArray.getTasksByCategory(category);
  }

  // Filtered tasks by parameters
  searchTasks(
    category?: Category,
    searchText?: string,
    status?: boolean,
    priority?: Priority
  ): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }
}
