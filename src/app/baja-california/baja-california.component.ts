import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../wordpress.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-baja-california',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './baja-california.component.html',
  styleUrls: ['./baja-california.component.css'],
  providers: [WordpressService],
})
export class BajaCaliforniaComponent implements OnInit {
  posts: any[] = [];
  loading = true;

  constructor(
    private wordpressService: WordpressService, ) { }

  ngOnInit(): void {
    this.loadPost();
  }
    loadPost(){
    this.wordpressService.getCatBC().subscribe({
      next: (data: any) => {
        this.posts = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Baja California posts:', error);
        this.loading = false;

    }
    });
  }
  loadMore() {
    this.loading = true;
    this.loadPost();
  }
}

