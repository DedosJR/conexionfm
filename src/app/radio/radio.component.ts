import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
})
export class RadioPlayerComponent implements OnInit {
  apiUrl = 'https://server1.maxiradiofm.com/api/station/1/nowplaying';
  stationName: string = 'Nombre de la emisora';
  nowPlaying: string = 'Título - Artista';
  albumCover: string = '';
  streamUrl: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRadioData();
    setInterval(() => this.fetchRadioData(), 30000);
  }

  fetchRadioData(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      (data) => {
        const { station, now_playing } = data;
        this.stationName = station.name;
        this.nowPlaying = `${now_playing.song.title} - ${now_playing.song.artist}`;
        this.albumCover = now_playing.song.art;
        this.streamUrl = station.listen_url;
      },
      (error) => {
        console.error('Error fetching radio data:', error);
      }
    );
  }
}
