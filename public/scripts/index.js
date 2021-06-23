//Manipulating the theme and font color
$("#lightThemeBtn").click(function(e){
    e.preventDefault();
    $("#darkThemeBtn").show();
    $(this).hide();
    $(document.documentElement).css("--currentBgCodeColor", "#f1f3f4");
    $(document.documentElement).css("--currentFontCodeColor", "#5888AD");
    $(document.documentElement).css("--oppositeBgCodeColor", "#283142");
    $(document.documentElement).css("--oppositeFontCodeColor", "#0d904f");
    $(document.documentElement).css("--currentFontDescColor", "#3b78e7");
    $(document.documentElement).css("--currentBgSdColor", "rgb(40,49,66,1)");
    $(document.documentElement).css("--currentBgSdGradColor", "rgb(40,49,66,1)");
    $(document.documentElement).css("--currentUEFilter", "invert(100%)");
    $(document.documentElement).css("--oppositeUEFilter", "invert(0%)");
});

$("#darkThemeBtn").click(function(e){
    e.preventDefault();
    $("#lightThemeBtn").show();
    $(this).hide();
    $(document.documentElement).css("--currentBgCodeColor", "#283142");
    $(document.documentElement).css("--currentFontCodeColor", "#0d904f");
    $(document.documentElement).css("--oppositeBgCodeColor", "#f1f3f4");
    $(document.documentElement).css("--oppositeFontCodeColor", "#5888AD");
    $(document.documentElement).css("--currentFontDescColor", "#4dd0e1");
    $(document.documentElement).css("--currentBgSdColor", "rgb(0,0,0,.3)");
    $(document.documentElement).css("--currentBgSdGradColor", "linear-gradient(90deg, rgb(0,0,0,.3) 0%, rgb(0,0,0,.3) 40%, rgba(0,0,0,0) 100%)");  
    $(document.documentElement).css("--currentUEFilter", "invert(0%)");
    $(document.documentElement).css("--oppositeUEFilter", "invert(100%)");
});

//Typewriter Effect
document.addEventListener('DOMContentLoaded',function(event){
    // array with texts to type in typewriter
    var dataText = [ "DEVELOPER.", "DESIGNER.", "GAMER."];
    var dataIcon = ["<i class='fas fa-toolbox'></i> ", "<i class='fas fa-palette'></i> ", "<i class='fas fa-gamepad'></i> "];
    
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, icon, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        // add next character to h1
        $("#desc").html(icon + text.substring(0, i+1) +'<span aria-hidden="true" id="descCaret"></span>');

        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, icon, i + 1, fnCallback)
        }, 100);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
      }
    }
    // start a typewriter animation for a text in the dataText array
     function StartTextAnimation(i) {
       if (typeof dataText[i] == 'undefined'){
          StartTextAnimation(0);
       }
       else{
        // text exists! start typewriter animation
       typeWriter(dataText[i], dataIcon[i], 0, function(){
         // after callback (and whole text has been animated), start next text
         StartTextAnimation(i + 1);
       });
      }
    }
    // start the text animation
    StartTextAnimation(0);


    //Change display text of Programming Languages
    function displayProgrammingSpan(i){
        var dataPrint = ['&lt;?php echo "Programming Languages"; ?>', 'console.log("Programming Languages");',
                         'cout<<"Programming Languages";', 'print("Programming Languages")',
                         'System.out.print("Programming Languages");'];
        $("#programmingSpan").html(dataPrint[i]).fadeOut(0).fadeIn();

        if (typeof dataPrint[i+1] == 'undefined'){
            setTimeout(function() {displayProgrammingSpan(0)}, 2000);
         }
        else{
            setTimeout(function() {displayProgrammingSpan(i+1)}, 2000);
        }
    }

    displayProgrammingSpan(0);
  });

//Scroll Top
$(window).scroll(function() {
    // declare variable
    var topPos = $(this).scrollTop();
    // if user scrolls down - show scroll to top button
    if (topPos > 50) {
      if (window.matchMedia('(max-width: 768px)').matches){
        $("#title").css("transform", "scale(.6)");
        $("#title").css("margin-top", "10em");
        $("#title").css("margin-bottom", "1em");
        $("#title").css("font-size", "25px");
        $("#title").css("width", "35vh");
        $("#desc").css("margin-top", ".1em");
      }
      else{
        $("#title").css("margin-top", "10em");
        $("#title").css("margin-bottom", "3em");
        $("#title").css("font-size", "30px");
        $("#title").css("width", "35vh");
        $("#scrollTopBtn").fadeIn("slow");
      }
      $(".themeBtn").fadeIn("slow");
      $(".stickyHeader").fadeIn("slow");
    } 
    else {
      if (window.matchMedia('(max-width: 768px)').matches){
        $("#title").css("transform", "scale(1)");
        $("#title").css("margin-top", "13em");
        $("#title").css("margin-bottom", "12em");
        $("#title").css("font-size", "25px");
        $("#title").css("width", "35vh");
      }
      else{
        $("#title").css("transform", "scale(1)");
        $("#title").css("margin-top", "4em");
        $("#title").css("margin-bottom", "3em");
        $("#title").css("font-size", "70px");
        $("#title").css("width", "100vh");
        $("#scrollTopBtn").fadeOut("slow");
      }
      $(".themeBtn").fadeOut("slow");
      $(".stickyHeader").fadeOut("slow");
    }

    if (window.matchMedia('(max-width: 768px)').matches){
      $("#scrollTopBtn").hide();
      $("#mobileFooter").show();
    }
    else{
      $("#scrollTopBtn").show();
      $("#mobileFooter").hide();
    }

}); // scroll END

//Click event to scroll to top
$("#scrollTopBtn, #scrollTopMobile").click(function() {
    $('html, body').animate({
    scrollTop: 0
    }, 800);
    return false;
});

//Init lazy load
AOS.init();

//Change content when the button is pressed
$("#changeFontBtn").click(function(e){
  e.preventDefault();
  switch ($(this).data('id')){
    case 0:
      $(this).text("SC ONG");
      $(this).data('id', 1);
      break;
    case 1:
      $(this).text("Ong Shuoh Chwen");
      $(this).data('id', 2);
      break;
    case 2:
      $(this).text("王烁錞");
      $(this).data('id', 3);
      break; 
    case 3:
      $(this).text("왕삭순");
      $(this).data('id', 4);
      break;    
    case 4:
      $(this).text("proscawards");
      $(this).data('id', 0);
      break; 
    default:
      $(this).text("proscawards");
      $(this).data('id', 0);
      break;   
  }
});


