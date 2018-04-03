import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs/Subject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { finalize, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

// Services
import { MarvelService } from '../../services/marvel.service';
import { StarWarsService } from '../../services/star-wars.service';


@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.component.html',
  styleUrls: ['./selected-items.component.scss']
})
export class SelectedItemsComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI;
  private ngUnsubscribe: Subject<any> = new Subject();

  selectedFilms: any[] = [];
  selectedComics: any[] = [];
  selectedItems: any[] = [];
  showResults = false;

  constructor(
    private marvelService: MarvelService,
    private starWarsService: StarWarsService
  ) {}

  ngOnInit() {
    this.selectedComics = JSON.parse(window.localStorage.getItem('marvelSelected')) || [];
    this.selectedFilms = JSON.parse(window.localStorage.getItem('starWarsSelected')) || [];

    this.getSelectedLists(this.selectedComics, this.selectedFilms);
  }

  // destroi os observables inicializados
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Realiza merge das listas e busca dados dos servidores
  getSelectedLists = (comicsList: any[], filmsList: any[]): any => {
    this.blockUI.start();

    const listOfObservables = [];
    const finalList = [];

    // listas com os observables
    comicsList.forEach(comicId => {
      listOfObservables.push(this.marvelService.getComicById(comicId));
    });

    filmsList.forEach(filmId => {
      listOfObservables.push(this.starWarsService.getFilmById(filmId));
    });

    // Aqui é realizada todas as chamadas ao servidor paralelamente
    forkJoin(listOfObservables)
      .pipe(
        finalize(() => {
          this.blockUI.stop();
          this.selectedItems = finalList;
        })
      )
      .subscribe(results => {
        // Dados são atribuidos a variavel para listar na tela, no caso da marvel é feito um tratamento para pegar apenas o objeto
        results.forEach((result: any) => {
          if (result.data) {
            finalList.push(result.data.results[0]);
          } else {
            finalList.push(result);
          }
        });
      }, (error) => {
        return error.of(null);
      });
  }

  // retorna url da imagem
  getItemThumb(item: any) {
    if (!item) {
      return null;
    }

    if (item.thumbnail) {
      return `${item.thumbnail.path}/portrait_medium.${item.thumbnail.extension}`;
    }
  }

  // retorna link de detalhes do item
  getItemDetailLink(item: any) {
    if (!item) {
      return;
    }

    let url = 'marvel.com';

    if (item.urls && item.urls.length > 0) {
      for (let i = 0; i < item.urls.length; i++) {
        if (item.urls[i].type === 'detail') {
          url = item.urls[i].url;
          break;
        }
      }
    }

    if (!item.urls) {
      url = 'https://www.google.com/search?q=' + item.title;
    }

    return url;

  }
}
