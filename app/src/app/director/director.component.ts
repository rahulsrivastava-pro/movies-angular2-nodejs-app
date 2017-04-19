import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';
import { RouterModule } from '@angular/router';


import { ToastComponent } from '../shared/toast/toast.component';

import { DataService } from '../services/data.service';

import { Director } from '../shared/director';
import { DirectorDataService } from '../shared/director-data.service';


@Component({
   selector: 'app-director',
    templateUrl: './director.component.html',
    styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {
    directors: Director[] = [];
    error: any;

    constructor(
        private directorDataService: DirectorDataService) { }

    ngOnInit() {
        this.directorDataService.getToken().then(res => {
            let token = res.token;
            localStorage.setItem('currentUser', JSON.stringify({ token: token }));
            this.directorDataService.getDirectors().then(directors => 
            {this.directors = directors;}
            );
        });
        
    }

    deleteDirector(director: Director, event: any): void {
        event.stopPropagation();

        this.directorDataService.delete(director).then(res => {
            this.directors = this.directors.filter(m => m !== director);
        }).catch(error => this.error = error);
    }
}

