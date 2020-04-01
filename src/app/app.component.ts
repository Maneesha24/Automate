import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'automate';
  automateData = [];
  showAddFolderInput = false;
  showAddFileInput = false;
  activeFolder = '';
  activeFile = '';
  showFolderSection = true;
  selectedFolderIndex = 0;
  selectedFileIndex = 0;
  fileInput = '';
  files = [];

  @select('automate') public automate$: Observable<any>;

  constructor() { }

  ngOnInit() {

    this.automateData.map(folder => {
      if (folder && folder.folderName === this.activeFolder) {
        this.files = folder.files;
      }
    });
    this.fileInput = this.files && this.files[this.selectedFileIndex] && this.files[this.selectedFileIndex].body;
  }

  onAddNewFile() {
    this.showAddFileInput = true;
  }

  onCollapsibleButtonClick(event) {
    this.showFolderSection = event;
  }

  onFileClick(event, i) {
    this.activeFile = event.target.innerText;
    this.selectedFileIndex = i;
    this.fileInput = this.files[this.selectedFileIndex].body;
  }

  onactiveFolderClick(event) {
    this.activeFolder = event;
  }

  onNewFileInput(event) {
    this.fileInput = event.target.value;
    if (event && event.target && event.target.value) {
      this.automateData.map(folder => {
        if (folder.folderName === this.activeFolder) {
          const file = {
            body: event.target.value,
            updatedAt : new Date()
          };
          folder.files.push(file);
          window && window.localStorage && window.localStorage.setItem('automate', JSON.stringify(this.automateData));
          this.automateData = JSON.parse(window.localStorage.getItem('automate'));
          this.automateData.map(folder => {
            if (folder.folderName === this.activeFolder) {
              this.files = folder.files;
            }
          });
        }
      });
    }
  }

  deleteFile(body) {
    this.automateData.map(folder => {
      if (folder.folderName === this.activeFolder) {
        folder.files = folder.files.filter(file => file.body !== body);
      }
    });
    window && window.localStorage && window.localStorage.setItem('automate', JSON.stringify(this.automateData));
    this.automateData = JSON.parse(window.localStorage.getItem('automate'));
    this.automateData.map(folder => {
      if (folder.folderName === this.activeFolder) {
        this.files = folder.files;
      }
    });
    this.fileInput = this.files[this.selectedFileIndex].body;
  }
}
