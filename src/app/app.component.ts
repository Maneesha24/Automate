import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  automateData = [];
  activeFolder = '';
  activeFile = {};
  showFolderSection = true;
  showFileSection = true;
  fileInput = '';
  files = [];

  @select('automate') public automate$: Observable<any>;

  constructor() { }

  ngOnInit() {
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
