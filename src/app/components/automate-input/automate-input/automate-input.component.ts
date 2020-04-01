import { Component, OnInit, Input } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { DELETE_FILE, ADD_FILE } from 'src/app/store/actions';
import { getFiles } from 'src/app/utils/getFiles';

@Component({
  selector: 'app-automate-input',
  templateUrl: './automate-input.component.html',
  styleUrls: ['./automate-input.component.css']
})
export class AutomateInputComponent implements OnInit {

  @Input() activeFolder;

  @Input() activeFile;

  fileInput: '';

  files: any;

  @select('automate') public automate$: Observable<any>;

  constructor(private ngRedux: NgRedux<any>) { }

  ngOnInit() {
  }

  deleteFile(id) {
    this.ngRedux.dispatch({ type: DELETE_FILE, payload: { folderName: this.activeFolder, id }});
  }

  onNewFileInput(event) {
    this.automate$.subscribe(automate => {
      this.files = getFiles(automate, this.activeFolder);
    });
    this.fileInput = event.target.value;
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
