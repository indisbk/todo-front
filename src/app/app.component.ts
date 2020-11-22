import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './services/data-handler.service';
import {Subscription} from 'rxjs';
import {Category} from './model/Category';

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
    this.getCategoriesSub = this.dataHandlerService.getCategories().subscribe(categories => {
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

  onSelectTask(task: Task): void {
    console.log(task);
  }
}
