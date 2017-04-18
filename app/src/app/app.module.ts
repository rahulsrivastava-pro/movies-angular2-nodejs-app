import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { DataService } from './services/data.service';
import { TitleCase } from './services/titlecase.pipe';


import { MovieComponent } from './movie/movie.component';
import { MovieViewerComponent } from './movie/movie-viewer.component';
import { MovieEditorComponent } from './movie/movie-editor.component';
import { MovieCreatorComponent } from './movie/movie-creator.component';
import { MovieDataService } from './shared/movie-data.service';



import { ToastComponent } from './shared/toast/toast.component';

const routing = RouterModule.forRoot([
    { path: '',      component: DashboardComponent },
    { path: 'order', component: OrderComponent },
    {
        path: 'movies',
        component: MovieComponent
    },
    {
        path: 'movies/:id/view',
        component: MovieViewerComponent
    },
    {
        path: 'movies/:id/edit',
        component: MovieEditorComponent
    },
    {
        path: 'movies/new',
        component: MovieCreatorComponent
    }
]);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
      OrderComponent,
      MovieComponent,
      MovieViewerComponent,
      MovieCreatorComponent,
      MovieEditorComponent,
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
      DataService,
      MovieDataService,
      ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
