import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {

    if (window && window.localStorage && JSON.parse(window.localStorage.getItem('automate'))) {
      this.automateData = JSON.parse(window.localStorage.getItem('automate'));
      this.activeFolder = JSON.parse(window.localStorage.getItem('automate'))[0].folderName;
    } else {
      window.localStorage.setItem('automate', JSON.stringify([{ folderName: 'Default', files: [] }]));
      this.automateData = JSON.parse(window.localStorage.getItem('automate'));
    }
    this.automateData.map(folder => {
      if (folder && folder.folderName === this.activeFolder) {
        this.files = folder.files;
      }
    });
    this.fileInput = this.files && this.files[this.selectedFileIndex] && this.files[this.selectedFileIndex].body;
  }

  onAddNewFolder() {
    this.showAddFolderInput = true;
  }

  onAddNewFile() {
    this.showAddFileInput = true;
  }

  onFolderClick(event, i) {
    this.activeFolder = event.target.innerText;
    this.automateData.map(folder => {
      if (folder.folderName === this.activeFolder) {
        this.files = folder.files;
      }
    });
    this.selectedFolderIndex = i;
  }

  onFileClick(event, i) {
    this.activeFile = event.target.innerText;
    this.selectedFileIndex = i;
    this.fileInput = this.files[this.selectedFileIndex].body;
  }

  onNewFolderInput(event) {
    const automateData = window && window.localStorage && JSON.parse(window.localStorage.getItem('automate'))
    ? JSON.parse(window.localStorage.getItem('automate')) :
    window.localStorage.setItem('automate', JSON.stringify([{ folderName: 'Default' }]));
    const newFolder = {
      folderName: event.target.value,
      files: []
    };
    automateData.unshift(newFolder);
    window.localStorage.setItem('automate', JSON.stringify(automateData));
    this.showAddFolderInput = false;
    this.automateData = window && window.localStorage && JSON.parse(window.localStorage.getItem('automate'));
  }

  collapsibleFolders() {
    this.showFolderSection = !this.showFolderSection;
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
