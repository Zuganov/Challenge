import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input() itemTitle: string;
  @Input() itemDescription: string;
  @Input() itemThumb: any[];
  @Input() itemUrl: string;
  @Input() itemId: number;
  @Input() selectedItems: any[];
  @Input() type: string;
  @Input() checkSelected: Function;
  @Input() toggleSelected: Function;

  constructor() { }

}
