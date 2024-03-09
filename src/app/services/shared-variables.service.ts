import { Injectable } from '@angular/core';
import { User, File, Item } from './models';

@Injectable({
  providedIn: 'root'
})
export class SharedVariablesService {

  user: User | undefined = undefined;

  files: File[] = [];

  items: Item[] = [];


  constructor() { }

}
