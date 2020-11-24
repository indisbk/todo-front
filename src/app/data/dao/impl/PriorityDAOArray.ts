import {PriorityDAO} from '../interfaces/PriorityDAO';
import {Priority} from '../../../model/Priority';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriorityDAOArray implements PriorityDAO {
  add(object: Priority): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(object: Priority): Observable<Priority> {
    return undefined;
  }
}
