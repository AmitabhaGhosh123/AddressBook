import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contact: any;
  contact1: any;
  value: boolean = false;
  value1: boolean = false;
  constructor() { }

}
