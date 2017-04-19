import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Director } from '../shared/director';
import { DirectorDataService } from '../shared/director-data.service';

@Component({
    templateUrl: './director-creator.component.html'
})
export class DirectorCreatorComponent {
    director: Director = new Director();
    error: any;
    isError = false;
    errorMessage = '';
    public genders = [
        { value: 'F', display: 'Female' },
        { value: 'M', display: 'Male' }
    ];
    constructor(private router: Router, private directorDataService: DirectorDataService) { }

    saveDirector() {
        this.isError = false;
        if (this.director.name == null || this.director.name == "") {
            this.isError = true;
            this.errorMessage = "Please provide a valid name for the Director.";
        }
        if (this.director.gender == null) {
            this.isError = true;
            this.errorMessage = "Please provide a valid gender (M or F) for the Director.";
        }
        if (this.director.age == null || !Number(this.director.age) || this.director.age < 0 || this.director.age > 125) {
            this.isError = true;
            this.errorMessage = "Please provide a valid age for the Director (0-125).";
        }
        if (!this.isError) {
            this.directorDataService.save(this.director).then(res => {
                this.router.navigate(['/directors']);
            }).catch(error => this.error = error);
        }
    }
}
