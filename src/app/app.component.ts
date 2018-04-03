import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  selectedComics: any[];
  selectedFilms: any[];

  constructor() {}

  ngOnInit() { }

  // Função responsável por mostrar menu de itens selecionados caso haja itens selecionados
  showMyItems() {
    this.selectedComics = JSON.parse(window.localStorage.getItem('marvelSelected')) || [];
    this.selectedFilms = JSON.parse(window.localStorage.getItem('starWarsSelected')) || [];

    return this.selectedComics.length > 0 || this.selectedFilms.length > 0;
  }
}
