import {PriorityDAO} from '../interfaces/PriorityDAO';
import {Priority} from '../../../model/Priority';
import {Observable} from 'rxjs';

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
    return undefined;
  }

  update(object: Priority): Observable<Priority> {
    return undefined;
  }
}
