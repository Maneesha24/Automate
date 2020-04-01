import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ADD_FOLDER } from '../../../store/actions/index';

@Component({
  selector: 'app-automate-folder',
  templateUrl: './automate-folder.component.html',
  styleUrls: ['./automate-folder.component.css']
})
export class AutomateFolderComponent implements OnInit {

  @Output() activeFolderClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() collapsibleButtonClick: EventEmitter<any> = new EventEmitter<any>();

  automateData = [];
  showAddFolderInput = false;
  activeFolder: any;
  selectedFolderIndex = 0;
  showFolderSection = true;

  @select('automate') public automate$: Observable<any>;

  constructor(private ngRedux: NgRedux<any>) { }

  ngOnInit() {
    this.fetchFolders();
    this.activeFolder = this.automateData && this.automateData[0] && this.automateData[0].folderName;
    this.activeFolderClick.emit(this.activeFolder);
  }

  onAddNewFolder() {
    this.showAddFolderInput = true;
  }

  onFolderClick(event, i) {
    this.selectedFolderIndex = i;
    this.activeFolder = event.target.innerText;
    this.activeFolderClick.emit(this.activeFolder);
  }

  collapsibleFolders() {
    this.showFolderSection = !this.showFolderSection;
    this.collapsibleButtonClick.emit( this.showFolderSection);
  }

  onNewFolderInput(event) {
    this.activeFolder = event.target.value;
    this.activeFolderClick.emit(this.activeFolder);
    this.showAddFolderInput = false;
    this.ngRedux.dispatch({  type: ADD_FOLDER, payload: { folderName: this.activeFolder }});
    this.fetchFolders();
    this.selectedFolderIndex = 0;
  }

  fetchFolders() {
    this.automate$.subscribe(automateDetails => {
      this.automateData = automateDetails;
    });
  }
}
