import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Router
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StarWarsComponent } from './components/star-wars/star-wars.component';
import { MarvelComponent } from './components/marvel/marvel.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { SelectedItemsComponent } from './components/selected-items/selected-items.component';
import { FiltersComponent } from './components/filters/filters.component';

// Third party modules
import { NgxPaginationModule } from 'ngx-pagination';
import { BlockUIModule } from 'ng-block-ui';
import {NgxMaskModule} from 'ngx-mask';

// Services
import { MarvelService } from './services/marvel.service';
import { StarWarsService } from './services/star-wars.service';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StarWarsComponent,
    MarvelComponent,
    ListItemComponent,
    SelectedItemsComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BlockUIModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    MarvelService,
    StarWarsService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
