import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Movie } from '../shared/movie';
import { MovieDataService } from '../shared/movie-data.service';

@Component({
    templateUrl: './movie-creator.component.html'
})
export class MovieEditorComponent implements OnInit {
  movie: Movie = new Movie();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieDataService: MovieDataService) { }

  ngOnInit() {
    let id = this.route.params.forEach((params : Params) => {
      let id = +params['id'];
      this.movieDataService.getMovie(id).then(movie => this.movie = movie);
    });
  }

  saveMovie() {
    this.movieDataService.save(this.movie);
    this.router.navigate(['/movies']);
  }
}
