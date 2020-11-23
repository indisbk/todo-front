import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // for work with this dialog window
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], // data in dialog reference
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog // for open new dialog window(confirmed for example)
  ) { }

  // Title of dialog window
  dialogTitle: string;
  // Edited task
  task: Task;

  // Temporary field of task title
  tmpTitle = '';

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
  }

  // Press on button 'save' or 'enter'
  onConfirm(): void {
    // init task title by new value
    this.task.title = this.tmpTitle;
    // give to dialogRef changed task for next process
    this.dialogRef.close(this.task);
  }

  // Close dialog window and nothing to do
  onCancel(): void {
    this.dialogRef.close(null);
  }
}
