import * as $ from "jquery";

export class ContactForm{
    error;
    isFocused;

    constructor(error: any, isFocused: any){
      this.error = error;
      this.isFocused = isFocused;
    }

    //When the input is invalid or empty
    public updateError(){
      this.error++;
      $("#contactSubmit").addClass("disabled");
    }

    //When the input is valid
    public resetError(){
      this.error = 0;
      $("#contactSubmit").removeClass("disabled");
    }

    public getError(){return this.error;}

    public setIsFocused(isFocused: any){this.isFocused = isFocused;}

    public getIsFocused(){return this.isFocused;}

    //Reset all elements and values of the contact form
    public resetContactForm(){
      $("#contactName, #contactEmail, #contactMsg").prop("disabled", false);
      $("#contactName, #contactEmail, #contactMsg").val("");
      $("#contactName, #contactEmail, #contactMsg").css("border-bottom", "1px dotted var(--currentFontCodeColor)");
      $("#contactSubmit").removeClass("disabled");
      $("#contactSubmitLbl").show();
      $("#contactThrobber").hide();
      this.setIsFocused(false);
    }

    //Disable input in contact form when submit button is clicked
    public disableOnSubmit(){
      $("#contactName, #contactEmail, #contactMsg").prop("disabled", "disabled");
      $("#contactSubmit").addClass("disabled");
      $("#contactSubmitLbl").hide();
      $("#contactThrobber").show();
    }
}