import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AboutDialogComponent} from '../../dialog/about/about-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // Current year
  year: Date;


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.year = new Date();
  }

  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent, {
      autoFocus: false,
      width: '400px',
      data: {
        dialogTitle: 'О программе',
        message: 'Приложение "Список дел"'
      }
    });
  }
}
