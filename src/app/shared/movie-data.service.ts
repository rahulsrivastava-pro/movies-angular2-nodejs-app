import { Injectable } from '@angular/core';
import { Headers, Response, Http }       from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Movie } from './movie';
import { Actor } from './actor';
import { Director } from './director';
import { MovieDirector } from './movie-director';
import { MovieActor } from './movie-actor';

import { User } from './user';

@Injectable()
export class MovieDataService {

  
  private baseURL ='https://heroku-node-movies-api.herokuapp.com/api/';
  //private baseURL = 'http://localhost:8080/api/';

  private authUrl = this.baseURL + 'authenticate';
  private moviesUrl = this.baseURL + 'movie';
  private getActorsInMovieUrl = this.baseURL + 'getActorsInMovie';
  private getDirectorsInMovieUrl = this.baseURL + 'getDirectorsInMovie';
  private associateMovieDirectorUrl = this.baseURL + 'associateMovieDirector';
  private associateMovieActorUrl = this.baseURL + 'associateMovieActor';
  private disassociateMovieDirectorUrl = this.baseURL + 'disassociateMovieDirector';
  private disassociateMovieActorUrl = this.baseURL + 'disassociateMovieActor';


  private user: User = new User();

  constructor(private http: Http) { }

  getToken(){
    this.user.name = "rahul";
    this.user.password = "srivastava";
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.authUrl, JSON.stringify(this.user), {headers: headers}).toPromise().then(response => response.json()).catch(this.handleError);
  }

  fetchToken(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);
    return headers;
  }

  getMovies(): Promise<Movie[]> {
    let headers = this.fetchToken();
    return this.http.get(this.moviesUrl, {headers: headers}).toPromise().then(response => response.json() as Movie[]).catch(this.handleError);
  }

  getMovie(id: number) {
    return this.getMovies().then(movies => movies.find(movie => movie.movie_id == id));
  }


  getActorsByMovie(id: number): Promise<Actor[]> {
    let headers = this.fetchToken();
    let url = `${this.getActorsInMovieUrl}/${id}`;
    return this.http.get(url, {headers: headers}).toPromise().then(response => response.json() as Actor[]).catch(this.handleError);
  }

  getDirectorsByMovie(id: number): Promise<Director[]> {
    let headers = this.fetchToken();
    let url = `${this.getDirectorsInMovieUrl}/${id}`;
    return this.http.get(url, {headers: headers}).toPromise().then(response => response.json() as Director[]).catch(this.handleError);
  }

    postAssociateMovieDirector(movie_director: MovieDirector): Promise<MovieDirector> {
    let headers = this.fetchToken();
    return this.http.post(this.associateMovieDirectorUrl, JSON.stringify(movie_director), {headers: headers}).toPromise().then(res => res.status == 201).catch(this.handleError);
  }

  postAssociateMovieActor(movie_actor: MovieActor): Promise<MovieActor> {
    let headers = this.fetchToken();
    return this.http.post(this.associateMovieActorUrl, JSON.stringify(movie_actor), {headers: headers}).toPromise().then(res => res.status == 201).catch(this.handleError);
  }

   putDisAssociateMovieActor(movieId : number, actorId : number) {
      let headers = this.fetchToken();
      let url = `${this.disassociateMovieActorUrl}/${movieId}/${actorId}`;
      return this.http.delete(url, {headers: headers}).toPromise().catch(this.handleError);
    }

     putDisAssociateMovieDirector(movieId : number, directorId : number) {
      let headers = this.fetchToken();
      let url = `${this.disassociateMovieDirectorUrl}/${movieId}/${directorId}`;
      return this.http.delete(url, {headers: headers}).toPromise().catch(this.handleError);
    }

  private post(movie: Movie): Promise<Movie> {
    let headers = this.fetchToken();
    return this.http.post(this.moviesUrl, JSON.stringify(movie), {headers: headers}).toPromise().then(res => res.status == 201).catch(this.handleError);
  }

  private put(movie: Movie) {
    let headers = this.fetchToken();
    let url = `${this.moviesUrl}/${movie.movie_id}`;
    return this.http.put(url, JSON.stringify(movie), {headers: headers}).toPromise().then(() => movie).catch(this.handleError);
  }

  delete(movie: Movie): Promise<Response> {
    let headers = this.fetchToken();
    let url = `${this.moviesUrl}/${movie.movie_id}`;
    return this.http.delete(url, {headers: headers}).toPromise().catch(this.handleError);
  }

  save(movie: Movie): Promise<Movie> {
    if(movie.movie_id) {
      return this.put(movie);
    } else {
      return this.post(movie);
    }
  }

  private handleError(error: any) {
    console.log('An error occured: ', error);
    return Promise.reject("error message: " + error);
  }
}
