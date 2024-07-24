import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {
  interval,
  from,
  of,
  Observable,
  fromEvent,
  merge,
  EMPTY,
  Subject,
  ConnectableObservable,
} from 'rxjs';
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
  share,
  multicast,
  refCount,
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
    //old approach
    let obs$ = interval(1000).pipe(
      tap((x) => console.log(x, '   some side effect old approach')),
      multicast(() => new Subject())
    );
    let connectedSub = (obs$ as ConnectableObservable<number>).connect(); //start subscribing to connectableObservable
    let sub1 = obs$.subscribe((x) => console.log('SUBSCRIBER 1 old approach'));
    let sub2 = obs$.subscribe((x) => console.log('SUBSCRIBER 2 old approach'));

    setTimeout(() => {
      connectedSub.unsubscribe(); //we need to unsubscribe from connectedObservable because it will still emitting values although unsubscribing from sub1 and sub2
      sub1.unsubscribe();
      sub2.unsubscribe();
    }, 2000);

    //new approach
    let obs_new$ = interval(1000).pipe(
      tap((x) => console.log(x, '   some side effect new approach')),
      multicast(() => new Subject()),
      refCount() //manage the connect and unsubscribe proccesses from connectableObservable internally for us
    );
    let sub1_new = obs_new$.subscribe((x) =>
      console.log('SUBSCRIBER 1 new approach')
    );
    let sub2_new = obs_new$.subscribe((x) =>
      console.log('SUBSCRIBER 2 new approach')
    );

    setTimeout(() => {
      sub1_new.unsubscribe();
      sub2_new.unsubscribe();
    }, 2000);

    //recent approach
    let obs_recent$ = interval(1000).pipe(
      tap((x) => console.log(x, '   some side effect recent approach')),
      share() //do multicast and refCount behind the scene
    );
    let sub1_recent = obs_recent$.subscribe((x) =>
      console.log('SUBSCRIBER 1 recent approach')
    );
    let sub2_recent = obs_recent$.subscribe((x) =>
      console.log('SUBSCRIBER 2 recent approach')
    );

    setTimeout(() => {
      sub1_recent.unsubscribe();
      sub2_recent.unsubscribe();
    }, 2000);
  }
}
