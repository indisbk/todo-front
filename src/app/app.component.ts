import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './services/data-handler.service';
import {Subscription} from 'rxjs';
import {Category} from './model/Category';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  tasks: Task[];

  categories: Category[];

  getCategoriesSub: Subscription;

  selectedCategory: Category;

  constructor(
    private dataHandlerService: DataHandlerService
  ) {
  }

  ngOnInit(): void {
    this.onSelectCategory(null);
    this.getCategoriesSub = this.dataHandlerService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnDestroy(): void {
    if (this.getCategoriesSub) {
      this.getCategoriesSub.unsubscribe();
    }
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;

    this.dataHandlerService.searchTasks(this.selectedCategory)
      .subscribe((tasks => this.tasks = tasks));
  }

  // Update selected task
  onSelectTask(task: Task): void {
    this.dataHandlerService
      .updateTask(task)
      .pipe(
        switchMap(() => {
            return this.dataHandlerService.searchTasks(this.selectedCategory);
          }
        )
      ).subscribe(tasks => this.tasks = tasks);
  }

  onDeleteTask(task: Task): void {
    this.dataHandlerService
      .deleteTask(task)
      .pipe(
        switchMap(() => {
          return this.dataHandlerService.searchTasks(this.selectedCategory);
        })
      ).subscribe(tasks => this.tasks = tasks);
  }

  onUpdateCategory(category: Category): void {
    this.dataHandlerService
      .updateCategory(category)
      .subscribe(() => this.onSelectCategory(this.selectedCategory));
  }

  onDeleteCategory(category: Category): void {
    this.dataHandlerService
      .deleteCategory(category)
      .subscribe(() => {
        this.selectedCategory = null;
        this.onSelectCategory(this.selectedCategory);
      });

  }
}
