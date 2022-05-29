import { Component, OnInit } from '@angular/core';
import { ContactForm } from '../model/ContactForm';
const cf = new ContactForm(0, false);
import * as $ from 'jquery';
import { format } from 'date-fns';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Snackbar } from '../utils/Snackbar';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    public snackbar: Snackbar,
  ) { }

  ngOnInit(): void {
  }

    //Contact name on change
    nameOnChange(e: any){
      e.preventDefault();
      var regex = /^[a-zA-Z]+$/;
      let name = $("#contactName").val() as string;
      if (regex.test(name)) {
        $("#contactName").css("border-bottom", "1px dotted var(--currentFontCodeColor)");
        cf.resetError();
      }
      else{
        $("#contactName").css("border-bottom", "1px dotted var(--currentCommentColor)");
        cf.updateError();
      }
  }

  //Contact email on change
  emailOnChange(e: any){
    e.preventDefault();
    const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let email = $("#contactEmail").val() as string;
    if (emailValidator.test(email)) {
      $("#contactEmail").css("border-bottom", "1px dotted var(--currentFontCodeColor)");
      cf.resetError();
    }
    else{
      $("#contactEmail").css("border-bottom", "1px dotted var(--currentCommentColor)");
      cf.updateError();
    }
  }

  //Contact message on change
  messageOnChange(e: any){
    e.preventDefault();
    let msg = $("#contactMsg").val() as string;
    if (msg) {
      $("#contactMsg").css("border-bottom", "1px dotted var(--currentFontCodeColor)");
      cf.resetError();
    }
    else{
      $("#contactMsg").css("border-bottom", "1px dotted var(--currentCommentColor)");
      cf.updateError();
    }
  }

  //Submit contact form
  submitBtnOnClick(e: any){
      e.preventDefault();
      var name = $("#contactName").val();
      var email = $("#contactEmail").val();
      var msg = $("#contactMsg").val();

      if ((cf.getError() == 0)){
        if (!name && !email && !msg){
          this.snackbar
          .setTitle("Contact form is empty! Please verify again.")
          .setType({isDefault: true})
          .execute();
        }
        else if (!name && !email && msg){
          this.snackbar
          .setTitle("Full name & email are yet to fill in! Please verify again.")
          .setType({isDefault: true})
          .execute();
        }
        else if (!name && email && !msg){
          this.snackbar
          .setTitle("Full name & message are yet to fill in! Please verify again.")
          .setType({isDefault: true})
          .execute();
        }
        else if (name && !email && !msg){
          this.snackbar
          .setTitle("Email & message are yet to fill in! Please verify again.")
          .setType({isDefault: true})
          .execute();
        }
        else if (!name && email && msg){
          this.snackbar
          .setTitle("Full name is yet to fill in! Please verify again.")
          .setType({isDefault: true})
          .execute();
        }
        else if (name && !email && msg){
          this.snackbar
          .setTitle("Email is yet to fill in! Please verify again.")
          .setType({isDefault: true})
          .execute();
        }
        else if (name && email && !msg){
          this.snackbar
          .setTitle("Message is yet to fill in! Please verify again.")
          .setType({isDefault: true})
          .execute();
        }
        else{
          let data = {
            email : email,
            name : name,
            date: format(new Date(), 'dd LLLL yyyy HH:mm:ss'),
            cont : msg
          };
          // const headers = { 'content-type': 'application/json'};  
          cf.disableOnSubmit();
          // console.log(data);
          // this.httpClient.post<any>('https://portfolio-backend-proscawards.vercel.app/cf', JSON.stringify(data), { 'headers': headers })
          // .subscribe(res => {
          //   console.log(res)
          // });
          let xhr = new XMLHttpRequest();
          xhr.open("POST", "https://portfolio-backend-proscawards.vercel.app/cf");
          xhr.setRequestHeader('content-type', 'application/json');
          xhr.onload =  () => {
              xhr.responseText == "success" ?
              this.snackbar
              .setTitle("Email sent successfully!")
              .setType({isDefault: true})
              .execute() :
              this.snackbar
              .setTitle("Email failed to send.")
              .setType({isDefault: true})
              .execute();
            cf.resetContactForm();
          }  

          xhr.send(JSON.stringify(data));

        }
      }
  }

  //On initialization, when any of the element of contact form is FOCUSED for the first time
  //focus click
  onFocusClick(e: any){
      e.preventDefault();
      if (!cf.getIsFocused()){
        cf.setIsFocused(true);  
        $("#contactName, #contactEmail, #contactMsg").css("border-bottom", "1px dotted var(--currentCommentColor)");
        $("#contactSubmit").addClass("disabled");
      }
  }
}
