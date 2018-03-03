import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

private gameTime = 10*60*10;
private ticks = 0;
private subscription;
private timer = Observable.interval(100);
private _turn:boolean = true;

private timeWhite;
private timeBlack;



  constructor() {
    this.timeBlack = this.gameTime;
    this.timeWhite = this.gameTime;
    this.startTimer();
  }

  ngOnInit() {

  }

  stopTimer(){
  	this.subscription.unsubscribe();
  }

  startTimer(){
    this.subscription = this.timer.take(this.gameTime+1).subscribe(t=>this.ticks = t);
  }

  toggleTimer() {
  	this.subscription.unsubscribe();

  	if(this._turn){
  		this.timeWhite = this.timeWhite-this.ticks;
  	} else {
  		this.timeBlack = this.timeBlack-this.ticks;   		
  	}
  	this.ticks = 0;	

  	this.subscription = this.timer.subscribe(t=>{
  		this.ticks = t;
  	    if (this.timeWhite <= 0 || this.timeBlack <= 0) {this.stopTimer()};	
  	});
  	this._turn = !this._turn;
  }
}
