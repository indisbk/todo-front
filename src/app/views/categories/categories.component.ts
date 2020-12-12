import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../model/Category';
import {MatDialog} from '@angular/material/dialog';
import {Task} from '../../model/Task';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {OperationType} from '../../dialog/OperationType';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() categories: Category[];

  @Output() selectCategory = new EventEmitter<Category>();
  @Output() updateCategory = new EventEmitter<Category>();
  @Output() deleteCategory = new EventEmitter<Category>();
  @Output() addCategory = new EventEmitter<Category>();

  @Input() selectedCategory: Category;

  indexMouseMove: number;

  constructor(private dialog: MatDialog) { }

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

  showEditIcon(index: number): void {
    this.indexMouseMove = index;
  }

  openEditDialog(category: Category): void {
    this.dialog
      .open(EditCategoryDialogComponent, {
        data: {
          categoryObj: category,
          dialogTitle: 'Редактирование категории'
        },
        autoFocus: false // give the user a choice
      })
      .afterClosed()
      .subscribe(result => {
        if (result === 'delete') {
          this.deleteCategory.emit(category);
          return;
        }
        if (result as Task) {
          this.updateCategory.emit(category);
          return;
        }
      });
  }

  openAddDialog(): void {
    const newCategory = new Category(null, '');
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      maxWidth: '400px',
      data: {
        categoryObj: newCategory,
        dialogTitle: 'Добавление новой категории',
        type: OperationType.ADD
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(newCategory);
      }
    });
  }
}
