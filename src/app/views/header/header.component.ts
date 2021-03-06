import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SettingsDialogComponent} from '../../dialog/settings-dialog/settings-dialog.component';
import {IntroService} from '../../services/intro.service';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  categoryName: string;

  @Input()
  showStat: boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  @Output()
  toggleMenu = new EventEmitter();

  // Type of device
  isMobile: boolean;

  constructor(
    private dialog: MatDialog,
    private introService: IntroService,
    private deviceDetector: DeviceDetectorService
  ) {
    this.isMobile = deviceDetector.isMobile();
  }

  ngOnInit(): void {
  }

  onToggleStat(): void {
    this.toggleStat.emit(!this.showStat);
  }

  // Open settings window
  showSettings(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '500px'
    });
  }

  // Show intro help
  showHelpIntro(): void {
    localStorage.clear();
    this.introService.startIntroJS(true);
  }

  // Hide/show sidebar menu with categories
  onToggleMenu(): void {
    this.toggleMenu.emit();
  }
}
