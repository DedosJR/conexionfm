import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
import { SheduleComponent } from './shedule/shedule.component';
import { DetailsComponent } from './details/details.component';
import { BajaCaliforniaComponent } from './baja-california/baja-california.component';
import { DeportesComponent } from './deportes/deportes.component';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(): boolean {
    return false;
  }
  store(): void {}
  shouldAttach(): boolean {
    return false;
  }
  retrieve(): null {
    return null;
  }
  shouldReuseRoute(): boolean {
    return false;
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shedule', component: SheduleComponent },
  { path: 'details/:id/:slug', component: DetailsComponent },
  { path: 'baja-california', component: BajaCaliforniaComponent },
  { path: 'deportes', component: DeportesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ]
})
export class AppRoutingModule { }
