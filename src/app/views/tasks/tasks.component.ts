import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../model/Category';

const COMPLETED_COLOR = '#f8f9fa';
const NO_PRIORITY_COLOR = '#fff';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  // Field's table for view in template
  displayedColumns: string[] = [
    'color',
    'id',
    'title',
    'date',
    'priority',
    'category',
    'select',
    'operations'
  ];

  // Container for table data
  dataSource = new MatTableDataSource<Task>();

  // link to table components
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private tasks: Task[];

  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() selectCategory = new EventEmitter<Category>();

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

  onToggleStatus(task: Task): void {
    task.completed = !task.completed;
    this.editTask.emit(task);
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
        data: {
          taskObj: task,
          dialogTitle: 'Редактирование задачи'
        },
        autoFocus: false // give the user a choice
      })
      .afterClosed()
      .subscribe(result => {
        if (result === 'delete') {
          this.deleteTask.emit(task);
          return;
        }
        if (result as Task) {
          this.editTask.emit(task);
          return;
        }
      });
  }

  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: '500px',
        data: {
          dialogTitle: 'Подтвердите действие',
          message: `Вы действительно хотите удалить задачу: "${task.title}"?`
        },
        autoFocus: false
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
          this.deleteTask.emit(task);
        }
      });
  }

  onSelectCategory(category: Category): void {
    // call out handler and send to it chosen category
    this.selectCategory.emit(category);
  }
}
