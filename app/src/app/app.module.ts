import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { TitleCase } from './services/titlecase.pipe';


import { MovieComponent } from './movie/movie.component';
import { MovieViewerComponent } from './movie/movie-viewer.component';
import { MovieEditorComponent } from './movie/movie-editor.component';
import { MovieCreatorComponent } from './movie/movie-creator.component';
import { MovieDataService } from './shared/movie-data.service';

import { ActorComponent } from './actor/actor.component';
import { ActorViewerComponent } from './actor/actor-viewer.component';
import { ActorEditorComponent } from './actor/actor-editor.component';
import { ActorCreatorComponent } from './actor/actor-creator.component';
import { ActorDataService } from './shared/actor-data.service';



import { ToastComponent } from './shared/toast/toast.component';

const routing = RouterModule.forRoot([
    { path: '',      component: MovieComponent },
    { path: 'movies', component: MovieComponent },
    { path: 'movies/:id/view', component: MovieViewerComponent },
    { path: 'movies/:id/edit', component: MovieEditorComponent },
    { path: 'movies/new', component: MovieCreatorComponent },
    { path: 'actors', component: ActorComponent },
    { path: 'actors/:id/view', component: ActorViewerComponent },
    { path: 'actors/:id/edit', component: ActorEditorComponent },
    { path: 'actors/new', component: ActorCreatorComponent }

]);

@NgModule({
  declarations: [
    AppComponent,

      MovieComponent,
      MovieViewerComponent,
      MovieCreatorComponent,
      MovieEditorComponent,

      ActorComponent,
      ActorViewerComponent,
      ActorCreatorComponent,
      ActorEditorComponent,

      ToastComponent,
      TitleCase
  ],
  imports: [
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
      ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
