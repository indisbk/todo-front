import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';

const COMPLETED_COLOR = '#f8f9fa';
const NO_PRIORITY_COLOR = '#fff';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit, OnDestroy {

  // Field's table for view in template
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];

  // Container for table data
  dataSource = new MatTableDataSource<Task>();

  // link to table components
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  getTasksSub: Subscription;

  constructor(private dataHandlerService: DataHandlerService) { }

  // In runtime of the method all data is inited
  ngAfterViewInit(): void {
    this.addTableObjects();
  }

  ngOnInit(): void {
    this.getTasksSub = this.dataHandlerService.getAllTasks().subscribe(tasks => this.refreshTable(tasks));
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  // Show tasks data
  private refreshTable(tasks: Task[]): void {
    this.dataSource.data = tasks;
    this.addTableObjects();

    // sorting by columns
    this.dataSource.sortingDataAccessor = (task, colName): any => {
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };
  }

  // Return priority color
  getPriorityColor(task: Task): string {
    if (task.completed) {
      return COMPLETED_COLOR;
    }
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return NO_PRIORITY_COLOR;
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort; // component for sort
    this.dataSource.paginator = this.paginator; // component for paginator
  }

  ngOnDestroy(): void {
    if (this.getTasksSub) {
      this.getTasksSub.unsubscribe();
    }
  }
}
