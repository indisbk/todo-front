import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './services/data-handler.service';
import {Subscription, zip} from 'rxjs';
import {Category} from './model/Category';
import {Priority} from './model/Priority';
import {concatMap, map, switchMap} from 'rxjs/operators';
import {IntroService} from './services/intro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  categoryMap = new Map<Category, number>();

  tasks: Task[];
  priorities: Priority[];
  categories: Category[];

  getCategoriesSub: Subscription;
  getPrioritiesSub: Subscription;

  selectedCategory: Category;
  private searchTaskText: string;
  private statusFilter: boolean;
  private priorityFilter: Priority;
  private searchCategoryTitle: string;

  // statistics
  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTasksCount: number;
  showStat = true;

  // Sidebar properties
  menuOpened = true;
  menuMode: string;
  menuPosition: string;
  showBackdrop: boolean;

  constructor(
    private dataHandlerService: DataHandlerService,
    private introService: IntroService
  ) {
    this.setMenuValues();
  }

  ngOnInit(): void {
    this.onSelectCategory(null);
    this.getCategoriesSub = this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.getPrioritiesSub = this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);

    this.fillCategories();

    this.introService.startIntroJS(true);
  }

  ngOnDestroy(): void {
    if (this.getCategoriesSub) {
      this.getCategoriesSub.unsubscribe();
    }
    if (this.getPrioritiesSub) {
      this.getPrioritiesSub.unsubscribe();
    }
  }

  // -------------------------------Categories methods----------------------------------------------------------

  // fills in categories and the number of outstanding tasks for each of them (needed to display categories)
  private fillCategories(): void {
    if (this.categoryMap) {
      this.categoryMap.clear();
    }

    this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));

    // for each category count uncompleted tasks
    this.categories.forEach(cat => {
      this.dataHandlerService
        .getUncompletedCountInCategory(cat)
        .subscribe(count => this.categoryMap.set(cat, count));
    });
  }

  onSearchCategory(title: string): void {
    this.searchCategoryTitle = title;
    this.dataHandlerService
      .searchCategories(title)
      .subscribe(categories => {
        this.categories = categories;
        this.fillCategories();
      });
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  onUpdateCategory(category: Category): void {
    this.dataHandlerService
      .updateCategory(category)
      .subscribe(() => this.onSearchCategory(this.searchCategoryTitle));
  }

  onDeleteCategory(category: Category): void {
    this.dataHandlerService
      .deleteCategory(category)
      .subscribe(() => {
        this.selectedCategory = null;
        this.categoryMap.delete(category);
        this.onSearchCategory(this.searchCategoryTitle);
        this.updateTasks();
      });

  }

  onAddCategory(newCategory: Category): void {
    this.dataHandlerService
      .addCategory(newCategory)
      .subscribe(() => this.updateTasks());
  }

  // -------------------------------Tasks methods----------------------------------------------------------

  private updateTasks(): void {
    this.dataHandlerService.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  // Update selected task
  onUpdateTask(task: Task): void {
    this.dataHandlerService
      .updateTask(task)
      .subscribe(() => {
        this.fillCategories();
        this.updateTasksAndStat();
      });
  }

  onDeleteTask(task: Task): void {
    this.dataHandlerService.deleteTask(task).pipe(
      concatMap(deletedtask => {
          return this.dataHandlerService
            .getUncompletedCountInCategory(deletedtask.category)
            .pipe(
              map(count => {
                return ({t: deletedtask, count});
                }
              )
            );
        }
      )).subscribe(result => {

      const t = result.t as Task;
      this.categoryMap.set(t.category, result.count);

      this.updateTasksAndStat();
    });
  }

  onAddTask(newTask: Task): void {
    this.dataHandlerService.addTask(newTask).pipe(// сначала добавляем задачу
      concatMap(task => {
          return this.dataHandlerService
            .getUncompletedCountInCategory(task.category)
            .pipe(
              map(count => {
                return ({t: task, count});
                }
              )
            );
        }
      )).subscribe(result => {

      const t = result.t as Task;

      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }

      this.updateTasksAndStat();
    });
  }

  // -------------------------------Filter tasks methods----------------------------------------------------------

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

  // -------------------------------Statistics methods----------------------------------------------------------

  private updateTasksAndStat(): void {
    this.updateTasks();
    this.updateStat();
  }

  private updateStat(): void {
    zip(
      this.dataHandlerService.getTotalCountInCategory(this.selectedCategory),
      this.dataHandlerService.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandlerService.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandlerService.getUncompletedTotalCount()
    ).subscribe(array => {
      console.log(array);
      this.totalTasksCountInCategory = array[0];
      this.completedCountInCategory = array[1];
      this.uncompletedCountInCategory = array[2];
      this.uncompletedTotalTasksCount = array[3];
    });
  }

  toggleStat(showStat: boolean): void {
    this.showStat = showStat;
  }

  // -------------------------------Sidebar methods----------------------------------------------------------

  // Close sidebar menu
  onCloseMenu(): void {
    this.menuOpened = false;
  }

  // Menu parameters
  setMenuValues(): void {
    this.menuPosition = 'left'; // position by left
    this.menuOpened = true; // menu was opened already
    this.menuMode = 'push'; // just push main content, not to close
    this.showBackdrop = false; // show dark background(for mobile version needed)
  }

  // Show/hide sidebar menu
  toggleMenu(): void {
    this.menuOpened = !this.menuOpened;
  }
}
