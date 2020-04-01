import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgRedux, NgReduxModule } from '@angular-redux/store'
import { automateReducer, automateState } from './store/reducers';
import { AutomateFileModule } from './components/automate-file/automate-file.module';
import { AutomateFolderModule } from './components/automate-folder/automate-folder.module';
import { AutomateInputModule } from './components/automate-input/automate-input.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgReduxModule,
    AutomateFolderModule,
    AutomateFileModule,
    AutomateInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<any>) {
    ngRedux.configureStore(automateReducer, automateState);
    }
}