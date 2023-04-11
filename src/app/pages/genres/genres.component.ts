import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Genre } from '../../models/genere';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  constructor(private movieServices: MoviesService) {}
  ngOnInit(): void {
    this.movieServices.getMovieGenres().subscribe((generesData) => {
      console.log(generesData);
      this.genres = generesData;
    });
  }
}
