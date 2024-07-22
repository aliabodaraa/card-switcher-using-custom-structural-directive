import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { interval, from, of, Observable, fromEvent, merge, EMPTY } from 'rxjs';
import {
  reduce,
  scan,
  take,
  tap,
  filter,
  takeWhile,
  switchMap,
  switchMapTo,
  mapTo,
  startWith,
} from 'rxjs/operators';
const COUNTER_FROM = 10;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('startBtn') startBtn!: ElementRef;
  @ViewChild('pauseBtn') pauseBtn!: ElementRef;
  @ViewChild('h1') h1!: ElementRef;

  counter$ = interval(1000);

  ngAfterViewInit() {
    merge(
      fromEvent<MouseEvent>(this.startBtn.nativeElement, 'click').pipe(
        mapTo(true)
      ),
      fromEvent<MouseEvent>(this.pauseBtn.nativeElement, 'click').pipe(
        mapTo(false)
      )
    )
      .pipe(
        switchMap((shouldStart) => (shouldStart ? this.counter$ : EMPTY)),
        mapTo(-1),
        scan((accumulator, current) => {
          return accumulator + current;
        }, COUNTER_FROM),
        takeWhile((value) => value >= 0),
        startWith(COUNTER_FROM),
        tap(console.log)
      )
      .subscribe({
        next: (value: number) => {
          this.h1.nativeElement.innerText = value;
          if (!value) {
            this.h1.nativeElement.innerText = 'Lift Off';
          }
        },
        complete: () => console.log('!COMPLETE'),
      });
  }
}
