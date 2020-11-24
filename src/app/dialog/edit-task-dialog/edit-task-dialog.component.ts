import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // for work with this dialog window
    @Inject(MAT_DIALOG_DATA) private data: {taskObj: Task, dialogTitle: string}, // data in dialog reference
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog // for open new dialog window(confirmed for example)
  ) { }

  categories: Category[];
  priorities: Priority[];

  // Title of dialog window
  dialogTitle: string;
  // Edited task
  task: Task;

  // Temporary field of task title
  tmpTitle: string;
  // Temporary field of task category
  tmpCategory: Category;
  // Temporary field of task priority
  tmpPriority: Priority;

  ngOnInit(): void {
    this.task = this.data.taskObj;
    this.dialogTitle = this.data.dialogTitle;

    // for view current values
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;

    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  // Press on button 'save' or 'enter'
  onConfirm(): void {
    // init task's fields by new values
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;

    // give to dialogRef changed task for next process
    this.dialogRef.close(this.task);
  }

  // Close dialog window and nothing to do
  onCancel(): void {
    this.dialogRef.close(null);
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
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
