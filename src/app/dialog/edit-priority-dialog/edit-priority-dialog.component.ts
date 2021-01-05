import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperationType} from '../OperationType';

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})

// Create/Edit priority window
export class EditPriorityDialogComponent implements OnInit {

  dialogTitle: string; // title for dialog window
  priorityTitle: string;
  operationType: OperationType;

  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      priorityTitle: string,
      dialogTitle: string,
      operationType: OperationType
    },
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.priorityTitle = this.data.priorityTitle;
    this.dialogTitle = this.data.dialogTitle;
    this.operationType = this.data.operationType;

  }

  // Press OK
  onConfirm(): void {
    this.dialogRef.close(this.priorityTitle);
  }

  // Press to cancel (nothing to save and close the window)
  onCancel(): void {
    this.dialogRef.close(false);
  }

  // Press to delete
  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить приоритет: "${this.priorityTitle}"? (в задачи проставится '')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }


  canDelete(): boolean {
    return this.operationType === OperationType.EDIT;
  }
}
