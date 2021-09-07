class ContactForm{

    error;
    isFocused;

    constructor(error, isFocused){
      this.error = error;
      this.isFocused = isFocused;
    }

    //When the input is invalid or empty
    updateError(){
      this.error++;
      $("#contactSubmit").addClass("disabled");
    }

    //When the input is valid
    resetError(){
      this.error = 0;
      $("#contactSubmit").removeClass("disabled");
    }

    getError(){return this.error;}

    setIsFocused(isFocused){this.isFocused = isFocused;}

    getIsFocused(){return this.isFocused;}

    //Reset all elements and values of the contact form
    resetContactForm(){
      $("#contactName, #contactEmail, #contactMsg").prop("disabled", false);
      $("#contactName, #contactEmail, #contactMsg").val("");
      $("#contactName, #contactEmail, #contactMsg").css("border-bottom", "1px dotted var(--currentFontCodeColor)");
      $("#contactSubmit").removeClass("disabled");
      $("#contactSubmitLbl").show();
      $("#contactThrobber").hide();
      this.setIsFocused(false);
    }

    //Disable input in contact form when submit button is clicked
    disableOnSubmit(){
      $("#contactName, #contactEmail, #contactMsg").prop("disabled", "disabled");
      $("#contactSubmitLbl").hide();
      $("#contactThrobber").show();
    }
}

const cf = new ContactForm(0, false);

//Contact name on change
$("#contactName").on('keyup', function (e){
    e.preventDefault();
    var regex = /^[a-zA-Z]+$/;
    if (regex.test($(this).val())) {
      $(this).css("border-bottom", "1px dotted var(--currentFontCodeColor)");
      cf.resetError();
    }
    else{
      $(this).css("border-bottom", "1px dotted var(--currentCommentColor)");
      cf.updateError();
    }
});

//Contact email on change
$("#contactEmail").on('keyup', function (e){
  e.preventDefault();
  const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (emailValidator.test($(this).val())) {
    $(this).css("border-bottom", "1px dotted var(--currentFontCodeColor)");
    cf.resetError();
  }
  else{
    $(this).css("border-bottom", "1px dotted var(--currentCommentColor)");
    cf.updateError();
  }
});

//Contact message on change
$("#contactMsg").on('keyup', function (e){
  e.preventDefault();
  if ($(this).val()) {
    $(this).css("border-bottom", "1px dotted var(--currentFontCodeColor)");
    cf.resetError();
  }
  else{
    $(this).css("border-bottom", "1px dotted var(--currentCommentColor)");
    cf.updateError();
  }
});

//Submit contact form
$("#contactSubmit").click(function (e){
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
});

//On initialization, when any of the element of contact form is FOCUSED for the first time
$("#contactName, #contactEmail, #contactMsg, #contactSubmit").on('focus click', function (e){
    e.preventDefault();
    if (!cf.getIsFocused()){
      cf.setIsFocused(true);  
      $("#contactName, #contactEmail, #contactMsg").css("border-bottom", "1px dotted var(--currentCommentColor)");
      $("#contactSubmit").addClass("disabled");
    }
});