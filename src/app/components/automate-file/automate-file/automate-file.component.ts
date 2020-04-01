import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-automate-file',
  templateUrl: './automate-file.component.html',
  styleUrls: ['./automate-file.component.css']
})
export class AutomateFileComponent implements OnInit {

  @Input() activeFolder;

  constructor() { }

  ngOnInit() {
  }

}
