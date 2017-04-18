import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';


import { ToastComponent } from '../shared/toast/toast.component';

import { DataService } from '../services/data.service';

import { Movie } from '../shared/movie';
import { MovieDataService } from '../shared/movie-data.service';


@Component({
   selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
    movies: Movie[] = [];
    error: any;

    constructor(
        private movieDataService: MovieDataService) { }

    ngOnInit() {
        this.movieDataService.getMovies().then(movies => this.movies = movies);
    }

    deleteMovie(movie: Movie, event: any): void {
        event.stopPropagation();

        this.movieDataService.delete(movie).then(res => {
            this.movies = this.movies.filter(m => m !== movie);
        }).catch(error => this.error = error);
    }
}

