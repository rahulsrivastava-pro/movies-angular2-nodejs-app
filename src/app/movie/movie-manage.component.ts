import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Movie } from '../shared/movie';
import { MovieDataService } from '../shared/movie-data.service';

import { Director } from '../shared/director';
import { DirectorDataService } from '../shared/director-data.service';

import { Actor } from '../shared/actor';
import { ActorDataService } from '../shared/actor-data.service';

import { MovieActor } from '../shared/movie-actor';
import { MovieDirector } from '../shared/movie-director';

@Component({
    templateUrl: './movie-manage.component.html'
})
export class MovieManageComponent implements OnInit {
  movie: Movie = new Movie();
  
  actors: Actor[] = [];
  selectedActors: Actor[] = [];
  
  directors: Director[] = [];
  selectedDirectors: Director[] = [];

  error: any;
  isError = false;
  errorMessage = ''; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieDataService: MovieDataService,
    private directorDataService: DirectorDataService,
    private actorDataService: ActorDataService
    ) { }

  ngOnInit() {
    let id = this.route.params.forEach((params : Params) => {
      let id = +params['id'];
      this.movieDataService.getMovie(id).then(movie => this.movie = movie);

      this.movieDataService.getActorsByMovie(id).then(res => 
            {this.selectedActors = res;}
            );

        this.movieDataService.getDirectorsByMovie(id).then(res => 
        {this.selectedDirectors = res;
        }
        );

    });

    this.directorDataService.getDirectors().then(directors => 
            {this.directors = directors;}
            );

     
  }

   addActor(id : number){
     let movieActor: MovieActor = new MovieActor();
     movieActor.movie_id = this.movie.movie_id;
     movieActor.actor_id = id;
     let actor:Actor = new Actor();

     this.movieDataService.postAssociateMovieActor(movieActor).then(res => {
              
      this.actorDataService.getActor(movieActor.actor_id).then(res => 
      {   actor = res;
          this.selectedActors.push(actor);
      });

          }).catch(error => this.error = error);
    } 


    callType(value){
    console.log(value);
   // this.order.type=value;
  }


     removeActor(id : number){
    
     let actor:Actor = new Actor();

     this.movieDataService.putDisAssociateMovieActor(this.movie.movie_id, id).then(res => {
              
      this.actorDataService.getActor(id).then(res => 
      {   actor = res;
          let index: number = this.selectedActors.indexOf(actor);
          if (index !== -1) {
              this.selectedActors.splice(index, 1);
          }    
      });

          }).catch(error => this.error = error);
    } 



    addDirector(id : number){
     let movieDirector: MovieDirector = new MovieDirector();
     movieDirector.movie_id = this.movie.movie_id;
     movieDirector.director_id = id;
    let director:Director = new Director();

     this.movieDataService.postAssociateMovieDirector(movieDirector).then(res => {
              this.directorDataService.getDirector(movieDirector.director_id).then(res => 
            {   director = res;
                this.selectedDirectors.push(director);
            });
          }).catch(error => this.error = error);
    } 

    removeDirector(id : number){
    
     let director:Director = new Director();

     this.movieDataService.putDisAssociateMovieActor(this.movie.movie_id, id).then(res => {
              
      this.directorDataService.getDirector(id).then(res => 
      {   director = res;
          let index: number = this.selectedDirectors.indexOf(director);
          if (index !== -1) {
              this.selectedDirectors.splice(index, 1);
          }    
      });

          }).catch(error => this.error = error);
    }

    saveMovie() {
        this.isError = false;
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
