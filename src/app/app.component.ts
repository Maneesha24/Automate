import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ADD_FILE, DELETE_FILE } from './store/actions';
import { getFiles } from './utils/getFiles';

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

  constructor(private ngRedux: NgRedux<any>) { }

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
    this.activeFile = event.activeFile._id;
    this.files = event.totalFiles;
  }
}
