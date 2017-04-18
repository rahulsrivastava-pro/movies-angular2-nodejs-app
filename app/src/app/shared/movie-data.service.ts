import { Injectable } from '@angular/core';
import { Headers, Response, Http }       from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Movie } from './movie';

@Injectable()
export class MovieDataService {

  private moviesUrl = 'http://movieapp-sitepointdemos.rhcloud.com/api/movies';

  constructor(private http: Http) { }

  getMovies(): Promise<Movie[]> {
    return this.http.get(this.moviesUrl).toPromise().then(response => response.json() as Movie[]).catch(this.handleError);
  }

  getMovie(id: number) {
    return this.getMovies().then(movies => movies.find(movie => movie._id === id));
  }

  private post(movie: Movie): Promise<Movie> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.moviesUrl, JSON.stringify(movie), {headers: headers}).toPromise().then(res => res.json().data).catch(this.handleError);
  }

  private put(movie: Movie) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.moviesUrl}/${movie._id}`;

    return this.http.put(url, JSON.stringify(movie), {headers: headers}).toPromise().then(() => movie).catch(this.handleError);
  }

  delete(movie: Movie): Promise<Response> {
    let url = `${this.moviesUrl}/${movie._id}`;
    return this.http.delete(url).toPromise().catch(this.handleError);
  }

  save(movie: Movie): Promise<Movie> {
    if(movie._id) {
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
