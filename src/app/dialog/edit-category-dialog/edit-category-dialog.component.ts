import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../model/Category';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // for work with this dialog window
    @Inject(MAT_DIALOG_DATA) private data: {categoryObj: Category, dialogTitle: string}, // data in dialog reference
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog // for open new dialog window(confirmed for example)
  ) { }

  // Title of dialog window
  dialogTitle: string;
  // Edited task
  category: Category;

  // Temporary field of task title
  tmpTitle: string;

  ngOnInit(): void {
    this.category = this.data.categoryObj;
    this.dialogTitle = this.data.dialogTitle;

    // for view current values
    this.tmpTitle = this.category.title;
  }

  // Press on button 'save' or 'enter'
  onConfirm(): void {
    // init category title by new value
    this.category.title = this.tmpTitle;

    // give to dialogRef changed task for next process
    this.dialogRef.close(this.category);
  }

  // Close dialog window and nothing to do
  onCancel(): void {
    this.dialogRef.close(null);
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${this.category.title}"?
        Задачи не будут удалены!`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // press delete button
      }
    });
  }
}
