import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { Movie } from '../shared/movie';
import { MovieDataService } from '../shared/movie-data.service';

@Component({
    templateUrl: './movie-viewer.component.html'
})
export class MovieViewerComponent implements OnInit {
  movie: Movie = new Movie();

  constructor(private route: ActivatedRoute, private movieDataService: MovieDataService) { }

  ngOnInit() {
    let id = this.route.params.forEach((params : Params) => {
      let id = +params['id'];
      this.movieDataService.getMovie(id).then(movie => this.movie = movie);
    });
  }
}
