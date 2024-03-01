import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import {
  MatCardFooter,
  MatCardImage,
  MatCardModule,
} from "@angular/material/card";
import { HomeComponent } from "../home/home.component";
@Component({
  selector: "app-contact",
  standalone: true,
  imports: [
    HomeComponent,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatCardImage,
    MatCardFooter,
  ],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})
export class ContactComponent {
  sidenavOpen = false;

  openSidenav() {
    this.sidenavOpen = true;
  }

  closeSidenav() {
    this.sidenavOpen = false;
  }
}
