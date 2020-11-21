import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // Field's table for view in template
   displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];

  // Container for table data
  dataSource: MatTableDataSource<Task>;

  tasks: Task[];

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandlerService.tasksSubject.subscribe(tasks => this.tasks = tasks);

    // initialization is necessarily
    this.dataSource = new MatTableDataSource<Task>();
    this.refreshTable();
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  // Show tasks data
  private refreshTable(): void {
    this.dataSource.data = this.tasks;
  }

  // Return priority color
  getPriorityColor(task: Task): string {
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff';
  }
}
