import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenav } from "@angular/material/sidenav";
import { HomeComponent } from "../home/home.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardFooter, MatCardImage } from "@angular/material/card";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [
    HomeComponent,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSidenav,
    MatToolbar,
    MatCardImage,
    MatCardFooter,
  ],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.css",
})
export class AboutComponent {
  sidenavOpen = false;

  openSidenav() {
    this.sidenavOpen = true;
  }

  closeSidenav() {
    this.sidenavOpen = false;
  }
}
