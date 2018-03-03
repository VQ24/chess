import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { TimerComponent } from './timer/timer.component';
import { TimePipe } from './time.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TimerComponent,
    TimePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
