import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperationType} from '../OperationType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // for work with this dialog window
    @Inject(MAT_DIALOG_DATA) private data: {taskObj: Task, dialogTitle: string, type: OperationType}, // data in dialog reference
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog // for open new dialog window(confirmed for example)
  ) { }

  categories: Category[];
  priorities: Priority[];

  // Title of dialog window
  dialogTitle: string;
  // Edited task
  task: Task;
  // Type of operation
  operType: OperationType;

  // Temporary field of task title
  tmpTitle: string;
  // Temporary field of task category
  tmpCategory: Category;
  // Temporary field of task priority
  tmpPriority: Priority;
  // Temporary field of task date
  tmpDate: Date;


  ngOnInit(): void {
    this.task = this.data.taskObj;
    this.dialogTitle = this.data.dialogTitle;
    this.operType = this.data.type;

    // for view current values
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;

    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  // Press on button 'save' or 'enter'
  onConfirm(): void {
    // init task's fields by new values
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;

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

  // Activate completed task
  activateTask(): void {
    this.task.completed = false;
    this.dialogRef.close(this.task);
  }

  // Complete task
  finishTask(): void {
    this.task.completed = true;
    this.dialogRef.close(this.task);
  }

  canDelete(): boolean {
    return this.operType === OperationType.EDIT;
  }

  canActivateOrDeactivate(): boolean {
    return this.operType === OperationType.EDIT;
  }
}
