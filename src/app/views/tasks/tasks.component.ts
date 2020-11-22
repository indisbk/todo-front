import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';

const COMPLETED_COLOR = '#f8f9fa';
const NO_PRIORITY_COLOR = '#fff';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  // Field's table for view in template
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];

  // Container for table data
  dataSource = new MatTableDataSource<Task>();

  // link to table components
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private tasks: Task[];

  @Output() selectTask = new EventEmitter<Task>();

  constructor(private dialog: MatDialog) {
  }

  // In runtime of the method all data is inited
  ngAfterViewInit(): void {
    this.addTableObjects();
  }

  ngOnInit(): void {
    this.fillTable();
  }

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  // Show tasks data
  private fillTable(): void {
    this.dataSource.data = this.tasks;
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

  openEditTaskDialog(task: Task): void {
    this.dialog
      .open(EditTaskDialogComponent, {
        data: [task, 'Редактирование задачи'],
        autoFocus: false // give the user a choice
      })
      .afterClosed()
      .subscribe();
  }
}
