import { Component, OnInit } from '@angular/core';
import {Priority} from '../../model/Priority';
import {MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  priorities: Priority[];

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private dataHandlerService: DataHandlerService
  ) { }

  ngOnInit(): void {
    this.dataHandlerService
      .getAllPriorities()
      .subscribe(priorities => this.priorities = priorities);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  // since we change the values in the arrays, then the changes are immediately reflected in the task list (no additional update required)

  // Add new priority
  onAddPriority(priority: Priority): void {
    this.dataHandlerService.addPriority(priority).subscribe();
  }

  // Delete priority
  onDeletePriority(priority: Priority): void {
    this.dataHandlerService.deletePriority(priority.id).subscribe();
  }

  // Update priority
  onUpdatePriority(priority: Priority): void {
    this.dataHandlerService.updatePriority(priority).subscribe();
  }
}
