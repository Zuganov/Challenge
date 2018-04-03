import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent {
  @Input() parentForm: FormGroup;
  @Input() type: FormGroup;

  formatTypes: any[] = [
    { name: 'Quadrinho', value: 'comic' },
    { name: 'Coleção', value: 'collection' },
    { name: 'Todos', value: null }
  ];

  orderTypes: any[] = [
    { name: 'Titulo ascendente', value: 'title' },
    { name: 'Titulo descendente', value: '-title' },
    { name: 'Modificado ascendente', value: 'modified' },
    { name: 'Modificado descendente', value: '-modified' },
    { name: 'Data de venda ascendente', value: 'onsaleDate' },
    { name: 'Data de venda descendente', value: '-onsaleDate' }
  ];

}
