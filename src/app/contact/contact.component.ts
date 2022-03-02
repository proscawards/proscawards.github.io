import { Component, OnInit } from '@angular/core';
import { ContactForm } from '../model/ContactForm';
const cf = new ContactForm(0, false);
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

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
          Swal.fire({
            icon: "warning",
            title: "Contact form is empty! Please verify again."
          })
        }
        else if (!name && !email && msg){
          Swal.fire({
            icon: "warning",
            title: "Full name & email are yet to fill in! Please verify again."
          })
        }
        else if (!name && email && !msg){
          Swal.fire({
            icon: "warning",
            title: "Full name & message are yet to fill in! Please verify again."
          })
        }
        else if (name && !email && !msg){
          Swal.fire({
            icon: "warning",
            title: "Email & message are yet to fill in! Please verify again."
          })
        }
        else if (!name && email && msg){
          Swal.fire({
            icon: "warning",
            title: "Full name is yet to fill in! Please verify again."
          })
        }
        else if (name && !email && msg){
          Swal.fire({
            icon: "warning",
            title: "Email is yet to fill in! Please verify again."
          })
        }
        else if (name && email && !msg){
          Swal.fire({
            icon: "warning",
            title: "Message is yet to fill in! Please verify again."
          })
        }
        else{
          var data = {
            email : email,
            name : name,
            msg : msg
          }
          cf.disableOnSubmit();
          let xhr = new XMLHttpRequest();
          xhr.open("POST", "https://proscawards-portfolio-backend.herokuapp.com/cf");
          xhr.setRequestHeader('content-type', 'application/json');
          xhr.onload = function(){
              if (xhr.responseText == "success"){
                cf.resetContactForm();
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'success',
                  title: 'Email sent!'
                })
              }
              else{
                cf.resetContactForm();
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'warning',
                  title: 'Email failed to sent!'
                })
              }
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
