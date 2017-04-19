import { Injectable } from '@angular/core';
import { Headers, Response, Http }       from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Movie } from './movie';
import { User } from './user';

@Injectable()
export class MovieDataService {

  private authUrl = 'http://localhost:4000/api/authenticate';
  private moviesUrl = 'http://localhost:4000/api/movie';
  private user: User = new User();

  constructor(private http: Http) { }

  getToken(){
    this.user.name = "rahul";
    this.user.password = "srivastava";
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.authUrl, JSON.stringify(this.user), {headers: headers}).toPromise().then(response => response.json()).catch(this.handleError);
  }

  getMovies(): Promise<Movie[]> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);
    return this.http.get(this.moviesUrl, {headers: headers}).toPromise().then(response => response.json() as Movie[]).catch(this.handleError);
  }

  getMovie(id: number) {
    return this.getMovies().then(movies => movies.find(movie => movie.movie_id == id));
  }

  private post(movie: Movie): Promise<Movie> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);

    return this.http.post(this.moviesUrl, JSON.stringify(movie), {headers: headers}).toPromise().then(res => res.status == 201).catch(this.handleError);
  }

  private put(movie: Movie) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);

    let url = `${this.moviesUrl}/${movie.movie_id}`;

    return this.http.put(url, JSON.stringify(movie), {headers: headers}).toPromise().then(() => movie).catch(this.handleError);
  }

  delete(movie: Movie): Promise<Response> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);
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
