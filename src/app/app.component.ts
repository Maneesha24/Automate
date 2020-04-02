import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { getFiles } from './utils/getFiles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeFolder = '';
  activeFile = {};
  showFolderSection = true;
  showFileSection = true;
  fileInput = '';
  files = [];
  searchInput = '';

  @select('automate') public automate$: Observable<any>;

  constructor() { }

  ngOnInit() {
    this.automate$.subscribe(automate => {
      this.activeFolder = automate[0].folderName;
      // console.log('asdasd', automate[0].folderName);
      this.files = getFiles(automate, this.activeFolder)[0].files;
    });
  }

  onCollapsibleFolderBtnClick(event) {
    this.showFolderSection = event;
  }

  onCollapsibleFileBtnClick(event) {
    this.showFileSection = event;
  }

  onactiveFolderClick(event) {
    this.activeFolder = event;
  }

  onFileDetails(event) {
    this.fileInput = event.activeFile.fileBody;
    this.activeFile = event.activeFile;
    this.files = event.totalFiles;
  }

}
