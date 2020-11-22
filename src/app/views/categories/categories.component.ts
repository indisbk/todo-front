import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() categories: Category[];

  @Output() selectCategory = new EventEmitter<Category>();

  selectedCategory: Category;

  constructor() { }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category): void {
    // nothing to do if category doesn't changed
    if (this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category;
    // call out handler and send to it chosen category
    this.selectCategory.emit(this.selectedCategory);
  }
}
