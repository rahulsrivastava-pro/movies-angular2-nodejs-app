import { Injectable } from '@angular/core';
import { Headers, Response, Http }       from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Actor } from './actor';
import { User } from './user';

@Injectable()
export class ActorDataService {

  private actorsUrl ='https://heroku-node-movies-api.herokuapp.com/api/actor';
  //private actorsUrl = 'http://localhost:8080/api/actor';
  private user: User = new User();

  constructor(private http: Http) { }

  
  getActors(): Promise<Actor[]> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);
    return this.http.get(this.actorsUrl, {headers: headers}).toPromise().then(response => response.json() as Actor[]).catch(this.handleError);
  }

  getActor(id: number) {
    return this.getActors().then(actors => actors.find(actor => actor.actor_id == id));
  }

  private post(actor: Actor): Promise<Actor> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);

    return this.http.post(this.actorsUrl, JSON.stringify(actor), {headers: headers}).toPromise().then(res => res.status == 201).catch(this.handleError);
  }

  private put(actor: Actor) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);

    let url = `${this.actorsUrl}/${actor.actor_id}`;

    return this.http.put(url, JSON.stringify(actor), {headers: headers}).toPromise().then(() => actor).catch(this.handleError);
  }

  delete(actor: Actor): Promise<Response> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', currentUser.token);
    let url = `${this.actorsUrl}/${actor.actor_id}`;
    return this.http.delete(url, {headers: headers}).toPromise().catch(this.handleError);
  }

  save(actor: Actor): Promise<Actor> {
    if(actor.actor_id) {
      return this.put(actor);
    } else {
      return this.post(actor);
    }
  }

  private handleError(error: any) {
    console.log('An error occured: ', error);
    return Promise.reject("error message: " + error);
  }
}
