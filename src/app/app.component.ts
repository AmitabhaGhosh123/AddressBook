import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'addressbook';
  constructor(public router: Router, public contactService: ContactService) {

  }

  ngOnInit() {

  }

  open() {
    this.contactService.value = true;
    this.contactService.value1 = false;
    localStorage.setItem('key', JSON.stringify(this.contactService.value));
    localStorage.setItem('key1', JSON.stringify(this.contactService.value1));
  }

  open1() {
    this.contactService.value = false;
    this.contactService.value1 = true;
    localStorage.setItem('key', JSON.stringify(this.contactService.value));
    localStorage.setItem('key1', JSON.stringify(this.contactService.value1));
  }


}
