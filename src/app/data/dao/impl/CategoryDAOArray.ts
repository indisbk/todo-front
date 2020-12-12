import {CategoryDAO} from '../interfaces/CategoryDAO';
import {Observable, of} from 'rxjs';
import {Category} from '../../../model/Category';
import {Injectable} from '@angular/core';
import {TestData} from '../../TestData';

@Injectable({
  providedIn: 'root'
})
export class CategoryDAOArray implements CategoryDAO {
  add(category: Category): Observable<Category> {
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory();
    }
    TestData.categories.push(category);
    return of(category);
  }

  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(category => category.id)) + 1;
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });
    const deletedCategory = TestData.categories.find(category => category.id === id);
    TestData.categories.splice(TestData.categories.indexOf(deletedCategory), 1);
    return of(deletedCategory);
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(newCategory: Category): Observable<Category> {
    const oldCategory = TestData.categories.find(category => category.id === newCategory.id);
    TestData.categories.splice(TestData.categories.indexOf(oldCategory), 1, newCategory);
    return of(newCategory);
  }
}
