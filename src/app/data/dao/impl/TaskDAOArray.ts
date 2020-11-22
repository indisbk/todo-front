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
    return undefined;
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

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return undefined;
  }

  update(object: Task): Observable<Task> {
    return undefined;
  }

  getTasksByCategory(category: Category): Observable<Task[]> {
    return of(TestData.tasks.filter(task => task.category === category));
  }
}
