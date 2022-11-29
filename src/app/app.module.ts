import {TuiButtonModule, TuiRootModule} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TuiInputFilesModule, TuiInputModule, TuiProgressModule, TuiStepperModule} from "@taiga-ui/kit";
import { MultiStepFormComponent } from './widgets/multi-step-form/multi-step-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiStepFormComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiProgressModule,
    TuiStepperModule,
    ReactiveFormsModule,
    TuiInputFilesModule,
    TuiInputModule,
    TuiButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
