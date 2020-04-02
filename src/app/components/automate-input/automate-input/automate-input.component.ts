import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { DELETE_FILE, ADD_FILE } from 'src/app/store/actions';
import { getFiles } from 'src/app/utils/getFiles';
import { UPDATE_FILE } from '../../../store/actions/index';

@Component({
  selector: 'app-automate-input',
  templateUrl: './automate-input.component.html',
  styleUrls: ['./automate-input.component.css']
})
export class AutomateInputComponent implements OnInit, OnChanges {

  @Input() activeFolder;

  @Input() activeFile;

  fileInput = '';

  files: any;

  @select('automate') public automate$: Observable<any>;

  constructor(private ngRedux: NgRedux<any>) { }

  ngOnInit() {
    this.fileInput = this.activeFile.fileBody;
  }

  ngOnChanges() {
    this.fileInput = this.activeFile.fileBody;
  }

  deleteFile(id) {
    this.ngRedux.dispatch({ type: DELETE_FILE, payload: { folderName: this.activeFolder, id }});
    this.fileInput = '';
  }

  onNewFileInput(event, activeFile) {
    this.automate$.subscribe(automate => {
      this.files = getFiles(automate, this.activeFolder);
    });
    this.fileInput = event.target.value;
    if (activeFile._id) {
      const updatedfile = {
        _id: activeFile._id,
        fileBody: this.fileInput,
        updatedAt: new Date()
      };
      this.ngRedux.dispatch({  type: UPDATE_FILE, payload: { folderName: this.activeFolder, updatedfile }});
      this.fileInput = '';
    } else {
      if (this.fileInput.length) {
        const file = {
          _id: `${this.activeFolder}-${this.files[0].length}`,
          fileBody: this.fileInput,
          updatedAt: new Date()
        };
        this.ngRedux.dispatch({  type: ADD_FILE, payload: { folderName: this.activeFolder, file }});
        this.fileInput = '';
      }
    }
  }

}
