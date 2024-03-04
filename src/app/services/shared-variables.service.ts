import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class SharedVariablesService {

  user:User|undefined=undefined;

  constructor() { }

}
