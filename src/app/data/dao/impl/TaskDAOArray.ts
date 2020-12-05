import {TaskDAO} from '../interfaces/TaskDAO';
import {Observable, of} from 'rxjs';
import {Category} from '../../../model/Category';
import {Priority} from '../../../model/Priority';
import {Task} from '../../../model/Task';
import {TestData} from '../../TestData';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskDAOArray implements TaskDAO {
  add(object: Task): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    const deletedTask = TestData.tasks.find(task => task.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(deletedTask), 1);
    return of(deletedTask);
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(task => task.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(
    category?: Category,
    searchText?: string,
    status?: boolean,
    priority?: Priority
  ): Observable<Task[]> {
    let filteredTasks = TestData.tasks;
    if (category) {
      filteredTasks = filteredTasks.filter(task => task.category === category);
    }
    if (searchText && searchText.trim() !== '') {
      filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    if (status) {
      filteredTasks = filteredTasks.filter(task => task.completed === status);
    }
    if (priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }
    return of(filteredTasks);
  }

  update(newTask: Task): Observable<Task> {
    const oldTask = TestData.tasks.find(task => task.id === newTask.id);
    TestData.tasks.splice(TestData.tasks.indexOf(oldTask), 1, newTask);
    return of(newTask);
  }

  getTasksByCategory(category: Category): Observable<Task[]> {
    return of(TestData.tasks.filter(task => task.category === category));
  }
}
