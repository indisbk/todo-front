import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  getCategories(): Observable<Category[]> {
    return of(TestData.categories);
  }
}
