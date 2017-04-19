import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { Actor } from '../shared/actor';
import { ActorDataService } from '../shared/actor-data.service';

@Component({
    templateUrl: './actor-viewer.component.html'
})
export class ActorViewerComponent implements OnInit {
  actor: Actor = new Actor();

  constructor(private route: ActivatedRoute, private actorDataService: ActorDataService) { }

  ngOnInit() {
    let id = this.route.params.forEach((params : Params) => {
      let id = +params['id'];
      this.actorDataService.getActor(id).then(actor => 
      {this.actor = actor;
        });
    });
  }
}
