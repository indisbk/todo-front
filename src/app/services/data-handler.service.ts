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

  // ------------------------------------Methods for manipulating tasks---------------------------

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

  deleteTask(task: Task): Observable<Task> {
    return this.taskDaoArray.delete(task.id);
  }

  addTask(newTask: Task): Observable<Task> {
    return this.taskDaoArray.add(newTask);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getTotalCountInCategory(category);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getCompletedCountInCategory(category);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(null);
  }

  // ------------------------------------Methods for manipulating categories---------------------------

  getAllCategories(): Observable<Category[]> {
    return this.categoryDAOArray.getAll();
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDAOArray.update(category);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.categoryDAOArray.delete(category.id);
  }

  addCategory(newCategory: Category): Observable<Category> {
    return this.categoryDAOArray.add(newCategory);
  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryDAOArray.search(title);
  }

  // ------------------------------------Methods for manipulating priorities---------------------------

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDAOArray.getAll();
  }

  addPriority(priority: Priority): Observable<Priority> {
    return this.priorityDAOArray.add(priority);
  }

  deletePriority(id: number): Observable<Priority> {
    return this.priorityDAOArray.delete(id);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.priorityDAOArray.update(priority);
  }
}
