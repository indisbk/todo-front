import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './services/data-handler.service';
import {Subscription} from 'rxjs';
import {Category} from './model/Category';
import {Priority} from './model/Priority';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  tasks: Task[];

  priorities: Priority[];

  categories: Category[];

  getCategoriesSub: Subscription;
  getPrioritiesSub: Subscription;

  selectedCategory: Category;
  private searchTaskText: string;
  private statusFilter: boolean;
  private priorityFilter: Priority;

  constructor(
    private dataHandlerService: DataHandlerService
  ) {
  }

  ngOnInit(): void {
    this.onSelectCategory(null);
    this.getCategoriesSub = this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.getPrioritiesSub = this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  ngOnDestroy(): void {
    if (this.getCategoriesSub) {
      this.getCategoriesSub.unsubscribe();
    }
    if (this.getPrioritiesSub) {
      this.getPrioritiesSub.unsubscribe();
    }
  }

  private updateTasks(): void {
    this.dataHandlerService.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.updateTasks();
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
      .subscribe(() => this.updateTasks());
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

  onFilterTasksByText(searchText: string): void {
    this.searchTaskText = searchText;
    this.updateTasks();
  }

  onFilterTasksByStatus(status: boolean): void {
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority): void {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  onAddTask(newTask: Task): void {
    this.dataHandlerService
      .addTask(newTask)
      .subscribe(() => this.updateTasks());
  }
}
