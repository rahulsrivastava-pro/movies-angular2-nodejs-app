import { Injectable } from '@angular/core';
import { Headers, Response, Http }       from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Director } from './director';
import { User } from './user';

@Injectable()
export class DirectorDataService {

  private directorsUrl ='https://heroku-node-movies-api.herokuapp.com/api/director';
  //private directorsUrl = 'http://localhost:8080/api/director';
  private user: User = new User();

  constructor(private http: Http) { }

  getDirectors(): Promise<Director[]> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);
    return this.http.get(this.directorsUrl, {headers: headers}).toPromise().then(response => response.json() as Director[]).catch(this.handleError);
  }

  getDirector(id: number) {
    return this.getDirectors().then(directors => directors.find(director => director.director_id == id));
  }

  private post(director: Director): Promise<Director> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);

    return this.http.post(this.directorsUrl, JSON.stringify(director), {headers: headers}).toPromise().then(res => res.status == 201).catch(this.handleError);
  }

  private put(director: Director) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);

    let url = `${this.directorsUrl}/${director.director_id}`;

    return this.http.put(url, JSON.stringify(director), {headers: headers}).toPromise().then(() => director).catch(this.handleError);
  }

  delete(director: Director): Promise<Response> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);
    let url = `${this.directorsUrl}/${director.director_id}`;
    return this.http.delete(url, {headers: headers}).toPromise().catch(this.handleError);
  }

  save(director: Director): Promise<Director> {
    if(director.director_id) {
      return this.put(director);
    } else {
      return this.post(director);
    }
  }

  private handleError(error: any) {
    console.log('An error occured: ', error);
    return Promise.reject("error message: " + error);
  }
}
