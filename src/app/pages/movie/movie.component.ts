import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { first } from 'rxjs';
import { Movie, MovieCredits, MovieImages, MovieVideo, SimilarMovies } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: SimilarMovies | null = null;
  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}
  ngOnDestroy(): void {
    console.log('component destroyed');
  }
  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    });
  }

  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe((movie: Movie) => {
      this.movie = movie;
    });
  }

  getMovieVideos(id: string) {
    this.moviesService.getMovieVideos(id).subscribe((movieVideos: MovieVideo[]) => {
      this.movieVideos = movieVideos;
    });
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((movieImages: MovieImages) => {
      this.movieImages = movieImages;
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((movieCredits: MovieCredits) => {
      this.movieCredits = movieCredits;
    });
  }

  getSimilarMovies(id: string) {
    this.moviesService.getSimilarMovies(id).subscribe((similarMovies: SimilarMovies) => {
      this.similarMovies = similarMovies;
    });
  }
}
