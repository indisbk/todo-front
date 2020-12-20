import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  @Input()
  completeTasksInCategory: number;

  @Input()
  unCompleteTasksInCategory: number;

  @Input()
  totalTasksInCategory: number;

  constructor() { }

  ngOnInit(): void {
  }

}
