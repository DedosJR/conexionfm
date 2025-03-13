import { NgModule, isDevMode } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//import { ServiceWorkerModule } from '@angular/service-worker';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SafeHtmlPipe } from '../app/SafeHtmlPipe';
import { WordpressService } from './wordpress.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { XoModule } from 'angular-xo';

@NgModule({
  declarations: [],
  imports: [
    XoModule,
    NgModule,
    CommonModule,
    //BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    FontAwesomeModule,
    AppComponent,

    //ServiceWorkerModule.register('ngsw-worker.js', {
    // enabled: !isDevMode(),
    // Register the ServiceWorker as soon as the application is stable
    // or after 30 seconds (whichever comes first).
    //registrationStrategy: 'registerWhenStable:30000',
    // }),
  ],
  providers: [WordpressService],
  bootstrap: [],
})
export class AppModule {}
