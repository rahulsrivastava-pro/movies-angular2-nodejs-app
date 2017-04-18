import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../shared/movie';
import { MovieDataService } from '../shared/movie-data.service';

@Component({
    templateUrl: './movie-creator.component.html'
})
export class MovieCreatorComponent {
  movie: Movie = new Movie();

  constructor(private router: Router, private movieDataService: MovieDataService) { }

  saveMovie() {
    this.movieDataService.save(this.movie);
    this.router.navigate(['/movies']);
  }
}
