import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Components
import { HomeComponent } from './components/home/home.component';
import { StarWarsComponent } from './components/star-wars/star-wars.component';
import { MarvelComponent } from './components/marvel/marvel.component';
import { SelectedItemsComponent } from './components/selected-items/selected-items.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'starwars', component: StarWarsComponent },
    { path: 'marvel', component: MarvelComponent },
    { path: 'selected-items', component: SelectedItemsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule { }
