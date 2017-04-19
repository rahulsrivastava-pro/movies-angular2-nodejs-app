import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Actor } from '../shared/actor';
import { ActorDataService } from '../shared/actor-data.service';

@Component({
    templateUrl: './actor-creator.component.html'
})
export class ActorCreatorComponent {
  actor: Actor = new Actor();
  error: any;
  isError = false;
  errorMessage = '';    
    public genders = [
        { value: 'F', display: 'Female' },
        { value: 'M', display: 'Male' }
    ];
  constructor(private router: Router, private actorDataService: ActorDataService) { }
 
    saveActor() {
        this.isError = false;
      if (this.actor.name == null) {
          this.isError = true;
          this.errorMessage = "Please provide a valid name for the Actor.";
      }
      if (this.actor.gender == null) {
          this.isError = true;
          this.errorMessage = "Please provide a valid gender (M or F) for the Actor.";
      }
      if (this.actor.age == null || !Number(this.actor.age) || this.actor.age < 0 || this.actor.age > 125) {
          this.isError = true;
          this.errorMessage = "Please provide a valid age for the Actor (0-125).";
      }
    if(!this.isError){
        this.actorDataService.save(this.actor).then(res => {
                this.router.navigate(['/actors']);
            }).catch(error => this.error = error);
      }
    }
}
