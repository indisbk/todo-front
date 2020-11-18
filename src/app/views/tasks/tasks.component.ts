import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Subscription} from 'rxjs';
import {Task} from '../../model/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  tasks: Task[];

  getTasksSub: Subscription;

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.getTasksSub = this.dataHandlerService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy(): void {
    if (this.getTasksSub) {
      this.getTasksSub.unsubscribe();
    }
  }

}
