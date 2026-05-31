import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { appConfig } from './app.config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: appConfig.providers,
  bootstrap: [AppComponent],
})
export class AppModule {}
