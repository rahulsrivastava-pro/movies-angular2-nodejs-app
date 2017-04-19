import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';
import { RouterModule } from '@angular/router';

import { ToastComponent } from '../shared/toast/toast.component';

import { Actor } from '../shared/actor';
import { ActorDataService } from '../shared/actor-data.service';


@Component({
   selector: 'app-actor',
    templateUrl: './actor.component.html',
    styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
    actors: Actor[] = [];
    error: any;

    constructor(
        private actorDataService: ActorDataService) { }

    ngOnInit() {
        this.actorDataService.getActors().then(actors => 
        {this.actors = actors;}
        );
    }

    deleteActor(actor: Actor, event: any): void {
        event.stopPropagation();
        debugger;
        this.actorDataService.delete(actor).then(res => {
            this.actors = this.actors.filter(m => m != actor);
        }).catch(error => this.error = error);
    }
}

