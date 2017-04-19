import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Movie } from '../shared/movie';
import { MovieDataService } from '../shared/movie-data.service';

@Component({
    templateUrl: './movie-creator.component.html'
})
export class MovieEditorComponent implements OnInit {
  movie: Movie = new Movie();
  error: any;
  isError = false;
  errorMessage = ''; 

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
    if(this.movie.name == null){
      this.isError = true;
      this.errorMessage = "Please provide a valid title for the Movie.";
    }
    if(this.movie.description == null){
      this.isError = true;
      this.errorMessage = "Please provide a valid description for the Movie.";
    }
    if(this.movie.year == null || !Number(this.movie.year) || this.movie.year < 1800 || this.movie.year > 2017){
          this.isError = true;
          this.errorMessage = "Please provide a valid Year for the Movie (1800-2017).";
      }
      if(this.movie.rating == null || !Number(this.movie.rating) || this.movie.rating < 1 || this.movie.rating > 5){
          this.isError = true;
          this.errorMessage = "Please provide a valid Rating for the Movie (1-5).";
      }
      if(!this.isError){
      this.movieDataService.save(this.movie).then(res => {
              this.router.navigate(['/movies']);
          }).catch(error => this.error = error);
      
    }
  }
}
