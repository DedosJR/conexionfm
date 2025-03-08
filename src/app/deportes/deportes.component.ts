import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../wordpress.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { catchError, retry, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-deportes',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.css'],
  providers: [WordpressService],
})
export class DeportesComponent implements OnInit {
  posts: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private wordpressService: WordpressService,
  ) { }

  ngOnInit(): void {
    this.wordpressService.getCatDep().pipe(
      timeout(15000), // 15 seconds timeout
      retry(3), // Retry 3 times
      catchError(error => {
        console.error('Error fetching sports posts:', error);
        this.error = 'Error loading posts. Please try again later.';
        return of([]); // Return empty array on error
      })
    ).subscribe({
      next: (data: any) => {
        this.posts = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Error loading posts. Please try again later.';
      }
    });
  }
}

