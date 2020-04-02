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
    this.fetchFiles();
  }

  onAddNewFile() {
    this.showAddFileInput = true;
  }

  collapsibleFiles() {
    this.showFileSection = !this.showFileSection;
    this.collapsibleFileBtnClick.emit(this.showFileSection);
  }

  onFileClick(i, file) {
    this.activeFile =  file.fileBody;
    this.selectedFileIndex = i;
    const fileDetails = {
      totalFiles: [],
      activeFile: file
    };
    this.fileDetails.emit(fileDetails);
  }

  fetchFiles() {
    this.automate$.subscribe(automate => {
      automate.map(folder => {
        if (folder.folderName === this.activeFolder) {
          this.files = folder.files;
        }
      });
    });
  }
}
