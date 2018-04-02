import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  constructor() {}

  public toggleSelected = (selectedList: any[], id: number, type: string): void => {
    if (selectedList && ~selectedList.indexOf(id)) {
      selectedList.splice(selectedList.indexOf(id), 1);
    } else {
      selectedList.push(id);
    }

    if (type === 'marvel') {
      window.localStorage.setItem('marvelSelected', JSON.stringify(selectedList));
    } else {
      window.localStorage.setItem('starWarsSelected', JSON.stringify(selectedList));
    }
  }

  public checkSelected = (id: number, type: string): boolean => {
    let selectedList = [];

    if (type === 'marvel') {
      selectedList = JSON.parse(window.localStorage.getItem('marvelSelected')) || [];
    } else {
      selectedList = JSON.parse(window.localStorage.getItem('starWarsSelected')) || [];
    }

    return selectedList && selectedList.indexOf(id) > -1;
  }
}
