import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {map, of, startWith, timer} from "rxjs";
import {TUI_IS_CYPRESS} from "@taiga-ui/cdk";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  @Input() title: string = ""
  @Output() isFinished = new EventEmitter();

  readonly value$ = this.isCypress
    ? of(30)
    : timer(0, 3).pipe(
      map(i => i + 30),
      startWith(30)
    );

  constructor(@Inject(TUI_IS_CYPRESS) private readonly isCypress: boolean) {
    this.value$
      .subscribe(value => value >= 100
        ? this.isFinished.emit()
        : null
      )
  }
}
