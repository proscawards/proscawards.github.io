import * as $ from "jquery";

export class TypeWriterComponent{

  // array with texts to type in typewriter
  public dataText = [ "DEVELOPER.", "DESIGNER.", "GAMER."];
  public dataIcon = ["<i class='fas fa-toolbox'></i> ", "<i class='fas fa-palette'></i> ", "<i class='fas fa-gamepad'></i> "];

  constructor() { 
    // start the text animation
    this.StartTextAnimation(0);
    this.displayProgrammingSpan(0);
  }
  
  // type one text in the typewriter
  // keeps calling itself until the text is finished
  public typeWriter(text: any, icon: any, i: any, fnCallback: any) {
    var self = this;
    // check if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
      $("#desc").html(icon + text.substring(0, i+1) +'<span aria-hidden="true" id="descCaret"></span>');

      // wait for a while and call this function again for next character
      setTimeout(function() {
        self.typeWriter(text, icon, i + 1, fnCallback)
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }

  // start a typewriter animation for a text in the dataText array
  public StartTextAnimation(i: any) {
      var self = this;
      if (typeof this.dataText[i] == 'undefined'){
          this.StartTextAnimation(0);
      }
      else{
          // text exists! start typewriter animation
          this.typeWriter(this.dataText[i], this.dataIcon[i], 0, function(){
          // after callback (and whole text has been animated), start next text
          self.StartTextAnimation(i + 1);
      });
    }
  }

  //Change display text of Programming Languages
  public displayProgrammingSpan(i: any){
    var self = this;
    var dataPrint = ['&lt;?php echo "Programming Languages"; ?>', 'console.log("Programming Languages");',
                      'cout<<"Programming Languages";', 'print("Programming Languages")',
                      'System.out.print("Programming Languages");'];
    $("#programmingSpan").html(dataPrint[i]).fadeOut(0).fadeIn();

    if (typeof dataPrint[i+1] == 'undefined'){
        setTimeout(function() {self.displayProgrammingSpan(0)}, 2000);
      }
    else{
        setTimeout(function() {self.displayProgrammingSpan(i+1)}, 2000);
    }
  }
}
