import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  contactType$: any = [];
  emailIdStore: any = [];
  mobileNumberStore: any = [];
  mobileNumber:any;
  email: any;
  selectedContact: string = "";
  contactForm: FormGroup;
  contactArray: any = [];
  contactsObj: any = {
    FirstName: "",
    LastName: "",
    ContactType: "",
    EmailId: "",
    DateOfBirth: "",
    MobileNumber: ""
  };
  constructor(private fb: FormBuilder, public router: Router, public contactService: ContactService) { }

  ngOnInit(): void {

    this.contactType$ = [{Text: "Home"},{Text: "Office"},{Text: "Personal"}];
    this.contactForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.maxLength(25)]],
      lastName:['',[Validators.required,Validators.maxLength(25)]],
      contactNumberType:[''],
      countryCode:['',[Validators.maxLength(3)]],
      contactNumber:['',[Validators.maxLength(10)]],
      dateofBirth:[''],
      emailId:['',[Validators.maxLength(30)]]
    });

  }

  // for selecting item in dropdown 

  selectItem(value) {
    this.selectedContact = value.Text;
    this.contactForm.value.contactNumberType = this.selectedContact;
  }

  // for validating date of birth

  dateOfBirthValidate() {
    let dateofBirth = this.contactForm.value.dateofBirth;
    let dateofbirthErr = document.getElementById("dateOfBirthErr");
    const dateFormat = "^(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])-[0-9]{4}$";
    if(dateofBirth.match(dateFormat))
    {
      dateofbirthErr.innerHTML = "";
    }
    else
    {
      dateofbirthErr.innerHTML = "Please enter DOB in MM-DD-YYYY format";
    }

  }

  // add contact

  saveContact() {
    
    this.contactsObj['FirstName'] = this.contactForm.value.firstName;
    this.contactsObj['LastName'] = this.contactForm.value.lastName;
    this.contactsObj['ContactType'] = this.selectedContact;
    this.contactsObj['EmailId'] = this.emailIdStore;
    this.contactsObj['DateOfBirth'] = this.contactForm.value.dateofBirth;
    this.contactsObj['MobileNumber'] = this.mobileNumberStore;
    let clone = {...this.contactsObj};
    this.contactArray.push(clone);
    if(this.contactService.contact1 != undefined)
    {
      this.contactService.contact1.forEach(element => {
        this.contactArray.push(element);
      })
    }
    localStorage.setItem('profile',JSON.stringify(this.contactArray));
    $('.showAddedEmails').addClass('show1');
    $('.showAddedNumbers').addClass('show1');
    this.mobileNumberStore = [];
    this.emailIdStore = [];
    alert('Contact saved successfully!!!')
  }

  // add multiple email id's

  addMultipleEmailId() {
      this.email = this.contactForm.value.emailId;
      this.emailIdStore.push(this.email);
      console.log(this.emailIdStore);
      (<HTMLInputElement>document.getElementById('emailId')).value = '';
  }

  // add multiple phone numbers

  addMultiplePhoneNumbers() {

    this.mobileNumber = (this.contactForm.value.countryCode + ' ' + this.contactForm.value.contactNumber);
    this.mobileNumberStore.push(this.mobileNumber);
    (<HTMLInputElement>document.getElementById('countryCode')).value = '';
    (<HTMLInputElement>document.getElementById('contactNumber')).value = '';
  }

  // reset form

  resetForm() {
    this.contactForm.reset();
    this.selectedContact = 'Select';
  }

}
