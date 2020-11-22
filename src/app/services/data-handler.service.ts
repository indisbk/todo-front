import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {TaskDAOArray} from '../data/dao/impl/TaskDAOArray';
import {CategoryDAOArray} from '../data/dao/impl/CategoryDAOArray';

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

  /*fillTasksByCategory(category: Category): void {
    const tasks = TestData.tasks.filter(task => task.category === category);
    this.tasksSubject.next(tasks);
  }*/
}
