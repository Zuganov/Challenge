import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

// Services
import { MarvelService } from '../../services/marvel.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-marvel',
  templateUrl: './marvel.component.html',
  styleUrls: ['./marvel.component.scss']
})
export class MarvelComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI;
  private ngUnsubscribe: Subject<any> = new Subject();

  comics: any[];
  selectedComics: number[] = [];
  filtersForm: FormGroup;
  noResultsMessage: boolean;

  toggleSelectedComic = this.sharedService.toggleSelected;
  checkSelectedComic = this.sharedService.checkSelected;

  // Pagination
  currentPage = 1;
  total: number;

  constructor(
    private marvelService: MarvelService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.filtersForm = this.createForm();

    this.selectedComics =
      JSON.parse(window.localStorage.getItem('marvelSelected')) || [];
    this.getMarvelComics(0, this.filtersForm.value);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      title: null,
      startYear: null,
      formatType: null,
      orderBy: 'title'
    });
  }

  getMarvelComics(offset, filters): void {
    this.blockUI.start();

    this.noResultsMessage = false;

    this.marvelService
      .getComics(offset, filters)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => {
          this.blockUI.stop();
        })
      )
      .subscribe(
        response => {
          this.comics = response.data.results;
          this.total = response.data.total;
          this.currentPage = response.data.offset / 20 + 1;

          if (this.total === 0) {
            this.noResultsMessage = true;
          }
        },
        error => {
          this.noResultsMessage = true;
        }
      );
  }

  getComicThumbImg(thumb): string {
    if (!thumb.path) {
      return 'imgNotFoundUrl';
    }

    return `${thumb.path}/portrait_medium.${thumb.extension}`;
  }

  getComicDetailLink(urls: any[]): string {
    let url = 'http://marvel.com';

    if (!urls || urls.length === 0) {
      return url;
    }

    for (let i = 0; i < urls.length; i++) {
      if (urls[i].type === 'detail') {
        url = urls[i].url;
        break;
      }
    }

    return url;
  }

  onPageChanged(event) {
    this.currentPage = event;
    this.getMarvelComics((event - 1) * 20, this.filtersForm.value);
  }

  filter(): void {
    this.getMarvelComics(0, this.filtersForm.value);
  }
}
