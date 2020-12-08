import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {TaskDAOArray} from '../data/dao/impl/TaskDAOArray';
import {CategoryDAOArray} from '../data/dao/impl/CategoryDAOArray';
import {Priority} from '../model/Priority';
import {PriorityDAOArray} from '../data/dao/impl/PriorityDAOArray';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor(
    private taskDaoArray: TaskDAOArray,
    private categoryDAOArray: CategoryDAOArray,
    private priorityDAOArray: PriorityDAOArray
  ) {
  }

  getAllCategories(): Observable<Category[]> {
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

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDAOArray.getAll();
  }

  deleteTask(task: Task): Observable<Task> {
    return this.taskDaoArray.delete(task.id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDAOArray.update(category);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.categoryDAOArray.delete(category.id);
  }

  addTask(newTask: Task): Observable<Task> {
    return this.taskDaoArray.add(newTask);
  }
}
