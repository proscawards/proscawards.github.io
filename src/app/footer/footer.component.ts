import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import Storage from '../model/Storage';
const storage = new Storage();
const cf = new ContactForm(0, false);
import { ContactForm } from '../model/ContactForm';
import { HttpClient } from '@angular/common/http';
import { WysiwygComponent } from '../wysiwyg/wysiwyg.component';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit{

  private owlStr = "<img class='owls' src='assets/images/owls/owls_owl.svg'/><img class='owls' src='assets/images/owls/owls_lufie.svg'/><img class='owls' src='assets/images/owls/owls_guin.svg'/><img class='owls' id='phoenix' src='assets/images/owls/owls_owlhuang.svg'/><img class='owls' src='assets/images/owls/owls_flowl.svg'/>";
  ngOnInit(): void {
  }

  //Click event to scroll to top
  scrollTopOnClick(){
    $('html, body').animate({
    scrollTop: 0
    }, 800);
    return false;
  }

  logoBtnOnClick(){
    switch (storage.getState() ? storage.getState() : 0){
      case 0:
        $("#changeFontBtn").text("SC ONG");
        $("#logoFooterBtn").text("SC ONG");
        storage.setState(1);
        break;
      case 1:
        $("#changeFontBtn").text("Ong Shuoh Chwen");
        $("#logoFooterBtn").text("Ong Shuoh Chwen");
        storage.setState(2);
        break;
      case 2:
        $("#changeFontBtn").text("王烁錞");
        $("#logoFooterBtn").text("王烁錞");
        storage.setState(3);
        break; 
      case 3:
        $("#changeFontBtn").text("왕삭순");
        $("#logoFooterBtn").text("왕삭순");
        storage.setState(4);
        break;  
      case 4:
        $("#changeFontBtn").html(this.owlStr);
        $("#logoFooterBtn").html(this.owlStr);
        storage.setState(5);
        break; 
      case 5:
        $("#changeFontBtn").text("proscawards");
        $("#logoFooterBtn").text("proscawards");
        storage.setState(0);
        break; 
      default:
        $("#changeFontBtn").text("proscawards");
        $("#logoFooterBtn").text("proscawards");
        storage.setState(0);
        break;   
    }
  }

  //Download Resume
  downloadResume(e: any){
    e.preventDefault();
    Swal.fire({
      text: `Do you want to download resume?`,
      confirmButtonText: "Download",
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        var hiddenElement = document.createElement('a');
        hiddenElement.href = "assets/files/proscawards_resume.pdf";
        hiddenElement.target = '_blank';
        hiddenElement.download = "proscawards_resume.pdf";
        hiddenElement.click();
        hiddenElement.remove();
      }
    });
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
