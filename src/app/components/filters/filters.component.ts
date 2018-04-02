import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() type: FormGroup;

  formatTypes: any[] = [{name: 'Quadrinho', value: 'comic'}, {name: 'Coleção', value: 'collection'}, {name: 'Todos', value: null}];

  constructor() { }

  ngOnInit() {
  }

}
