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

  getTasksSub: Subscription;

  getCategoriesSub: Subscription;

  constructor(
    private dataHandlerService: DataHandlerService
  ) {
  }

  ngOnInit(): void {
    this.getTasksSub = this.dataHandlerService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.getCategoriesSub = this.dataHandlerService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnDestroy(): void {
    if (this.getTasksSub) {
      this.getTasksSub.unsubscribe();
    }
    if (this.getCategoriesSub) {
      this.getCategoriesSub.unsubscribe();
    }
  }
}
