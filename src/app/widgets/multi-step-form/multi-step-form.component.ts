import {Component} from '@angular/core';
import {BehaviorSubject, finalize, map, Observable, of, Subject, switchMap, timer} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { TuiFileLike } from '@taiga-ui/kit';

type Step = 'uploadingFile' | 'signIn' | 'actualizing' | 'downloading';

const stepLabels = [`Загружаем реестр и выписки ЕГРН`,
  `Входим в личный кабинет`,
  `Актуализируем`,
  `Скачиваем обновленный реестр`];

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.css']
})
export class MultiStepFormComponent {

  stepLabels: Array<string>;

  currentStepBs: BehaviorSubject<Step>;
  currentStepIndex: number

  public formGroup: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      uploadFile: null,
      email: ['mail@mail.ru',[Validators.required,Validators.email]]
    });

    this.loadingFiles$ = new Subject<TuiFileLike | null>()
    this.loadedFiles$ = this.formGroup.controls["uploadFile"].valueChanges.pipe(
      switchMap(file => (file ? this.makeRequest(file) : of(null))),
    );

    this.stepLabels = stepLabels
    this.currentStepBs = new BehaviorSubject<Step>('uploadingFile')

    this.currentStepIndex = 0
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
    this.currentStepIndex++;
  }

  readonly loadingFiles$;
  readonly loadedFiles$;
  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);

    return timer(3000).pipe(
      map(() => {
          return file;
      }),
      finalize(() => this.loadingFiles$.next(null)),
    );
  }
}
