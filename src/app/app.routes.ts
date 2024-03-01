import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
import { SheduleComponent } from './shedule/shedule.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  { path: '', title: 'ConexionFM | Inicio', component: HomeComponent },
  { path: 'about', title: 'Quienes Somos', component: AboutComponent },
  { path: 'news', title: 'Noticias', component: NewsComponent },
  { path: 'contact', title: 'Contacto', component: ContactComponent },
  { path: 'shedule', title: 'Programación', component: SheduleComponent },
  {
    path: 'details/:id/:slug',
    title: 'Noticias',
    component: DetailsComponent,
  },
];
