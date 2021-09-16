import { Component } from '@angular/core';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import Storage from '../model/Storage';
const storage = new Storage();
import { ContactForm } from '../model/ContactForm';
const cf = new ContactForm(0, false);

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  //Click event to scroll to top
  scrollTopOnClick(){
    $('html, body').animate({
    scrollTop: 0
    }, 800);
    return false;
  }

  logoBtnOnClick(){
    const owl = '<svg id="owl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><style>.cls-1{fill:#a06530;}.cls-2{fill:#d8db97;}.cls-3{fill:#fff;}</style></defs><path class="cls-1" d="M117.48,191c-1.59,0-33.65,0-34.44,0-36.48,0-65.3-44-49.1-92.17C45.26,65.16,45.26,47.49,45.26,47.49l-4-38.67C50.72,29.87,66,43.73,85.06,47.49c6.16.81,11.9,0,14.94,0,7,0,13.73,0,20,.41.71,0,1.44-.12,2.17-.22C141.28,43.92,156.56,30.06,166.06,9l-4,38.67S163,65.05,173.34,99C188.27,147.83,153.17,191.31,117.48,191Z"/><path class="cls-2" d="M151.2,178.18c-16.8,19.94-83.4,19.58-99.36.8L70.52,80.79H131.8Z"/><circle class="cls-3" cx="72.99" cy="80.79" r="19.95"/><circle class="cls-3" cx="129.38" cy="80.79" r="19.95"/><circle cx="80.67" cy="74.91" r="7.2"/><circle cx="122.18" cy="74.91" r="7.2"/></svg>';
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
        $("#changeFontBtn").html(owl+owl+owl);
        $("#logoFooterBtn").html(owl+owl+owl);
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
        storage.setState(1);
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
