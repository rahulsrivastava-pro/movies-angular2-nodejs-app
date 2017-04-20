import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';


import { MovieComponent } from './movie/movie.component';
import { MovieViewerComponent } from './movie/movie-viewer.component';
import { MovieEditorComponent } from './movie/movie-editor.component';
import { MovieCreatorComponent } from './movie/movie-creator.component';
import { MovieDataService } from './shared/movie-data.service';
import { MovieManageComponent } from './movie/movie-manage.component';

import { ActorComponent } from './actor/actor.component';
import { ActorViewerComponent } from './actor/actor-viewer.component';
import { ActorEditorComponent } from './actor/actor-editor.component';
import { ActorCreatorComponent } from './actor/actor-creator.component';
import { ActorDataService } from './shared/actor-data.service';

import { DirectorComponent } from './director/director.component';
import { DirectorViewerComponent } from './director/director-viewer.component';
import { DirectorEditorComponent } from './director/director-editor.component';
import { DirectorCreatorComponent } from './director/director-creator.component';
import { DirectorDataService } from './shared/director-data.service';

import { ToastComponent } from './shared/toast/toast.component';

const routing = RouterModule.forRoot([
    { path: '',      component: MovieComponent },
    { path: 'movies', component: MovieComponent },
    { path: 'movies/:id/view', component: MovieViewerComponent },
    { path: 'movies/:id/edit', component: MovieEditorComponent },
    { path: 'movies/:id/manage', component: MovieManageComponent },
    { path: 'movies/new', component: MovieCreatorComponent },

    { path: 'actors', component: ActorComponent },
    { path: 'actors/:id/view', component: ActorViewerComponent },
    { path: 'actors/:id/edit', component: ActorEditorComponent },
    { path: 'actors/new', component: ActorCreatorComponent },

    { path: 'directors', component: DirectorComponent },
    { path: 'directors/:id/view', component: DirectorViewerComponent },
    { path: 'directors/:id/edit', component: DirectorEditorComponent },
    { path: 'directors/new', component: DirectorCreatorComponent }

]);

@NgModule({
  declarations: [
    AppComponent,

      MovieComponent,
      MovieViewerComponent,
      MovieCreatorComponent,
      MovieEditorComponent,
      MovieManageComponent,

      ActorComponent,
      ActorViewerComponent,
      ActorCreatorComponent,
      ActorEditorComponent,

      DirectorComponent,
      DirectorViewerComponent,
      DirectorCreatorComponent,
      DirectorEditorComponent,

      ToastComponent
  ],
    imports: [
        RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
      routing,
      ModalModule
  ],
  providers: [
      MovieDataService,
      ActorDataService,
      DirectorDataService,
      ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
