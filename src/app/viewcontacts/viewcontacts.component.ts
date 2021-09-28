import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcontacts',
  templateUrl: './viewcontacts.component.html',
  styleUrls: ['./viewcontacts.component.css']
})
export class ViewcontactsComponent implements OnInit {

  fetchContact: any;
  fetchContactCopy: any;
  sortFields: any = [];
  selectedFieldToSort: any;
  filteredData: any;
  firstName: any;
  lastName: any;
  mobileNumber: any = [];
  emailId: any = [];
  emailIdCopy: any = [];
  emailUnique: any;
  arr: any;
  arr1: any = [];
  arrCopy: any;
  arrCopyNumber: any;
  count: number;
  count1: number;
  mobileUnique: any;
  constructor(public contactService: ContactService, private router: Router) { }

  ngOnInit(): void {

    this.sortFields = [{ Text: "FirstName(descending)" }, { Text: "FirstName(ascending)" }, { Text: "LastName(descending)" }, { Text: "LastName(ascending)" }, { Text: "DateOfBirth(descending)" }, { Text: "DateOfBirth(ascending)" }];
    this.contactService.value = JSON.parse(localStorage.getItem('key'));
    this.contactService.value1 = JSON.parse(localStorage.getItem('key1'));
    this.getContacts();
  }

  // get all contacts

  getContacts() {
    this.fetchContact = JSON.parse(localStorage.getItem("profile"));
    if (this.fetchContact.length != 0) {
      this.fetchContact.forEach(element => {
        this.firstName = element.FirstName;
        this.lastName = element.LastName;
      })
    }
    this.fetchContact.forEach(element => {
      this.mobileNumber.push(element.MobileNumber);
      this.emailId.push(element.EmailId);
    })
    this.arr = this.emailId;
    this.arr1 = this.mobileNumber;
    if (this.arr.length != 0) {
      this.emailUnique = this.arr[0];
    }
    else {
      this.emailUnique = "No data available";
    }
    if (this.arr1.length != 0) {
      this.mobileUnique = this.arr1[0];
    }
    else {
      this.mobileUnique = "No data available";
    }
    this.arrCopy = this.arr;
    this.arrCopyNumber = this.arr1;
    this.arrCopy.shift();
    this.count = this.arr.length;
    this.arrCopyNumber.shift();
    this.count1 = this.arr1.length;
    this.arr = this.arrCopy;
    this.arr1 = this.arrCopyNumber;
    this.contactService.contact1 = this.fetchContact;
    this.fetchContactCopy = this.fetchContact;
  }

  // search contact by first name or last name

  search(a) {
    if (a) {
      if (this.fetchContactCopy.some((b) => String(b['FirstName'] != null && b['FirstName'].toLowerCase().includes(a.toLowerCase())) || (b['LastName'] != null && b['LastName'].toLowerCase().includes(a.toLowerCase()))
      )) {
        this.fetchContact = this.fetchContactCopy.filter((b) => {
          return (b['FirstName'] != null && b['FirstName'].toLowerCase().includes(a.toLowerCase())) || (b['LastName'] != null && b['LastName'].toLowerCase().includes(a.toLowerCase()));
        })
      }

      else {
        this.fetchContact = this.fetchContactCopy;
      }
    }

    else {
      this.fetchContact = this.fetchContactCopy;
    }
  }

  // sort fields 

  selectFieldToSort(value) {
    this.selectedFieldToSort = value.Text;
    if (value.Text == "FirstName(descending)") {
      this.filteredData = this.fetchContactCopy.sort(function (a, b) {
        var previous = a.FirstName.trim().toLowerCase(), next = b.FirstName.trim().toLowerCase();
        if (next < previous)
          return -1;
        if (next > previous)
          return 1;
        return 0;
      })
    }
    else if (value.Text == "FirstName(ascending)") {
      this.filteredData = this.fetchContactCopy.sort(function (a, b) {
        var previous = a.FirstName.trim().toLowerCase(), next = b.FirstName.trim().toLowerCase();
        if (previous < next)
          return -1;
        if (previous > next)
          return 1;
        return 0;
      })
    }
    this.fetchContact = this.filteredData;

    if (value.Text == "LastName(descending)") {
      this.filteredData = this.fetchContactCopy.sort(function (a, b) {
        var previous = a.LastName.trim().toLowerCase(), next = b.LastName.trim().toLowerCase();
        if (next < previous)
          return -1;
        if (next > previous)
          return 1;
        return 0;
      })
    }
    else if (value.Text == "LastName(ascending)") {
      this.filteredData = this.fetchContactCopy.sort(function (a, b) {
        var previous = a.LastName.trim().toLowerCase(), next = b.LastName.trim().toLowerCase();
        if (previous < next)
          return -1;
        if (previous > next)
          return 1;
        return 0;
      })
    }

    else if (value.Text == 'DateOfBirth(descending)') {
      this.filteredData = this.fetchContactCopy.sort(function (a, b) {
        var previous = a.DateOfBirth, next = b.DateOfBirth;
        if (next < previous)
          return -1;
        if (next > previous)
          return 1;
        return 0;
      })
    }

    else if (value.Text == 'DateOfBirth(ascending)') {
      this.filteredData = this.fetchContactCopy.sort(function (a, b) {
        var previous = a.DateOfBirth, next = b.DateOfBirth;
        if (previous < next)
          return -1;
        if (previous > next)
          return 1;
        return 0;
      })
    }
    this.fetchContact = this.filteredData;
  }

  // delete a specific contact
  deleteContact(index) {
    this.fetchContact.splice(index, 1);
    localStorage.setItem('profile', JSON.stringify(this.fetchContact));
  }

  // show all email id's
  showEmail() {
    $('.email').addClass('show');
    $('.email').removeClass('show1');
    $('.link').addClass('show1');
    $('.link').removeClass('show');
    $('.link1').addClass('show');
    $('.link1').removeClass('show1');
  }

  // hide all email id's
  hideEmail() {

    $('.link1').addClass('show1');
    $('.link1').removeClass('show');
    $('.email').addClass('show1');
    $('.link').addClass('show');
    $('.link').removeClass('show1');
  }

  // show all mobile numbers
  hideNumbers() {

    $('.link1').addClass('show1');
    $('.link1').removeClass('show');
    $('.number').addClass('show1');
    $('.link').addClass('show');
    $('.link').removeClass('show1');
  }

  // hide all mobile numbers
  showNumbers() {

    $('.number').addClass('show');
    $('.number').removeClass('show1');
    $('.link').addClass('show1');
    $('.link').removeClass('show');
    $('.link1').addClass('show');
    $('.link1').removeClass('show1');
  }

}

