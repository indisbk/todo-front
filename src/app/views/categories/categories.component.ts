import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../model/Category';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: Category[];

  getCategoriesSub: Subscription;

  selectedCategory: Category;

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.getCategoriesSub = this.dataHandlerService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnDestroy(): void {
    if (this.getCategoriesSub) {
      this.getCategoriesSub.unsubscribe();
    }
  }

  showTasksByCategory(category: Category): void {
    this.selectedCategory = category;
    this.dataHandlerService.fillTasksByCategory(category);
  }
}
