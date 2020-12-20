import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
// Card for viewing statistics
export class StatCardComponent implements OnInit {

  @Input()
  completed = false;

  @Input()
  iconName: string;

  @Input()
  firstCount: any;

  @Input()
  countTotal: any;

  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
