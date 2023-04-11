import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { MovieComponent } from '../movie/movie.component';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;
  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.getMoviesByGenre(genreId, 1);
        this.genreId = genreId;
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesService.searchMovies(page, searchKeyword).subscribe((movies) => {
      this.movies = movies.results;
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  paginate(event: any) {
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, event.page + 1);
    } else {
      this.getPagedMovies(event.page + 1, this.searchValue ?? '');
    }
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
