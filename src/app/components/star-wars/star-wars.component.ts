import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
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

  toggleSelectedFilm = this.sharedService.toggleSelected;
  checkSelectedFilm = this.sharedService.checkSelected;

  constructor(
    private starWarsService: StarWarsService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.blockUI.start();
    this.filtersForm = this.createForm();

    this.getStarWarsFilms(null);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      title: null
    });
  }

  getStarWarsFilms(title: string): void {
    this.starWarsService.getFilms(title).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      this.films = response.results;
      this.blockUI.stop();
    });
  }

  getStarWarsDetailLink(title: string) {
    return 'https://www.google.com/search?q=' + title;
  }

  filter(): void {
    this.blockUI.start();
    this.getStarWarsFilms(this.filtersForm.controls.title.value);
  }

}
