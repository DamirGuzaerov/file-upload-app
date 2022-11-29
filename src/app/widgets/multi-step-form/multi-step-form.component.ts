import {Component} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

type Step = 'uploadingFile' | 'signIn' | 'actualizing' | 'downloading';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.css']
})
export class MultiStepFormComponent {

  readonly steps = [`Загружаем реестр и выписки ЕГРН`,
    `Входим в личный кабинет`,
    `Актуализируем`,
    `Скачиваем обновленный реестр`];

  currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('uploadingFile');
  public userForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.userForm = this._fb.group({
      personalInfo: null,
      loginInfo: null
    });
  }

  subformInitialized(name: string, group: FormGroup) {
    this.userForm.setControl(name, group);
  }

  changeStep(currentStep: Step) {
    switch (currentStep) {
      case 'uploadingFile':
          this.currentStepBs.next('signIn');
        break;
      case 'signIn':
          this.currentStepBs.next('actualizing');
        break;
      case 'actualizing':
          this.currentStepBs.next('downloading');
        break;
      case 'downloading':
          this.currentStepBs.next('downloading');
        break;
    }
  }

  submitForm() {
    const formValues = this.userForm.value;
  }
}
