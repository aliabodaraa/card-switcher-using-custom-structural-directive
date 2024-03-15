import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IfLoadedDirective } from './directives/if-loaded.directive';

@NgModule({
  declarations: [AppComponent, IfLoadedDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
