import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

// Services
import { StarWarsService } from '../../services/star-wars.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-star-wars',
  templateUrl: './star-wars.component.html',
  styleUrls: ['./star-wars.component.scss']
})
export class StarWarsComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI;
  private ngUnsubscribe: Subject<any> = new Subject();

  films: any[];
  selectedFilms: number[] = [];
  filtersForm: FormGroup;
  noResultsMessage: boolean;

  toggleSelectedFilm = this.sharedService.toggleSelected;
  checkSelectedFilm = this.sharedService.checkSelected;

  constructor(
    private starWarsService: StarWarsService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.filtersForm = this.createForm();

    this.selectedFilms =
      JSON.parse(window.localStorage.getItem('starWarsSelected')) || [];

    this.getStarWarsFilms(null);
  }

  // Destrói os observables ativos para prevenir memory leak
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // cria form para filtros
  createForm(): FormGroup {
    return this.formBuilder.group({
      title: null
    });
  }

  // busca no servidor os dados dos filmes
  getStarWarsFilms(title: string): void {
    this.blockUI.start();

    this.noResultsMessage = false;

    this.starWarsService
      .getFilms(title)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => {
          this.blockUI.stop();
        })
      )
      .subscribe(
        response => {
          this.films = response.results;

          if (this.films.length === 0) {
            this.noResultsMessage = true;
          }
        },
        error => {
          this.noResultsMessage = true;
        }
      );
  }

  // Trata o link de detalhes dos itens
  getStarWarsDetailLink(title: string) {
    return 'https://www.google.com/search?q=' + title;
  }

  // função responsável pelo filtro
  filter(): void {
    this.getStarWarsFilms(this.filtersForm.controls.title.value);
  }
}
