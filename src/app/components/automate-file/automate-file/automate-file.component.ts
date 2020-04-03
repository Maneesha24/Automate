import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-automate-file',
  templateUrl: './automate-file.component.html',
  styleUrls: ['./automate-file.component.css']
})
export class AutomateFileComponent implements OnInit, OnChanges {

  @Input() activeFolder;
  @Input() searchTarget;
  @Output() fileDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output() collapsibleFileBtnClick: EventEmitter<any> = new EventEmitter<any>();
  @select('automate') public automate$: Observable<any>;

  showAddFileInput = false;
  showFileSection = true;
  activeFile: any;
  selectedFileIndex = 0;
  files = [];

  constructor() { }

  ngOnInit() {
    this.fetchFiles();
    this.selectedFileIndex = -1;
  }

  ngOnChanges() {
    this.selectedFileIndex = -1;
    this.fetchFiles();
    const fileDetails = {
      totalFiles: [],
      activeFile: {}
    };
    this.fileDetails.emit(fileDetails);
  }

  /**
   * Function to collapsible file section
   */
  collapsibleFiles() {
    this.showFileSection = !this.showFileSection;
    this.collapsibleFileBtnClick.emit(this.showFileSection);
  }

  /**
   * Function to select active file
   */
  onFileClick(i, file) {
    this.activeFile =  file.fileBody;
    this.selectedFileIndex = i;
    const fileDetails = {
      totalFiles: [],
      activeFile: file
    };
    this.fileDetails.emit(fileDetails);
  }

  /**
   * Function to fetch all files from active folder
   */
  fetchFiles() {
    this.automate$.subscribe(automate => {
      automate.map(folder => {
        if (folder.folderName === this.activeFolder) {
          this.files = folder.files;
        }
      });
    });
  }

  /**
   * Function to format date in required format
   */
  formatDate(date) {
    return  `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`;
  }
}
