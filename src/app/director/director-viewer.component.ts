import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { Director } from '../shared/director';
import { DirectorDataService } from '../shared/director-data.service';

@Component({
    templateUrl: './director-viewer.component.html'
})
export class DirectorViewerComponent implements OnInit {
  director: Director = new Director();

  constructor(private route: ActivatedRoute, private directorDataService: DirectorDataService) { }

  ngOnInit() {
    let id = this.route.params.forEach((params : Params) => {
      let id = +params['id'];
      this.directorDataService.getDirector(id).then(director => 
      {this.director = director;
        //debugger;
        });
    });
  }
}
