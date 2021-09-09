//Declare storage class
const storage = new Storage();

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
        $("#title").css("width", "35vw");
        $("#title").css("top", "90%");
      }
      else{
        $("#title").css("width", "100vh");
        $("#title").css("top", "90%");
      }
      $(".themeBtn").fadeIn("slow");
    } 
    else {
      if (window.matchMedia('(max-width: 768px)').matches){
        $("#title").css("width", "35vw");
        $("#title").css("top", "50%");
      }
      else{
        $("#title").css("width", "100vh");
        $("#title").css("top", "50%");
        $("#scrollTopBtn").fadeOut("slow");
      }
      $(".themeBtn").fadeOut("slow");
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
$("#changeFontBtn, #logoFooterBtn").click(function(e){
  e.preventDefault();
  const owl = '<svg id="owl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><style>.cls-1{fill:#a06530;}.cls-2{fill:#d8db97;}.cls-3{fill:#fff;}</style></defs><path class="cls-1" d="M117.48,191c-1.59,0-33.65,0-34.44,0-36.48,0-65.3-44-49.1-92.17C45.26,65.16,45.26,47.49,45.26,47.49l-4-38.67C50.72,29.87,66,43.73,85.06,47.49c6.16.81,11.9,0,14.94,0,7,0,13.73,0,20,.41.71,0,1.44-.12,2.17-.22C141.28,43.92,156.56,30.06,166.06,9l-4,38.67S163,65.05,173.34,99C188.27,147.83,153.17,191.31,117.48,191Z"/><path class="cls-2" d="M151.2,178.18c-16.8,19.94-83.4,19.58-99.36.8L70.52,80.79H131.8Z"/><circle class="cls-3" cx="72.99" cy="80.79" r="19.95"/><circle class="cls-3" cx="129.38" cy="80.79" r="19.95"/><circle cx="80.67" cy="74.91" r="7.2"/><circle cx="122.18" cy="74.91" r="7.2"/></svg>';
  switch ($(this).data('id')){
    case 0:
      $("#changeFontBtn").text("SC ONG");
      $("#logoFooterBtn").text("SC ONG");
      $("#changeFontBtn").data('id', 1);
      $("#logoFooterBtn").data('id', 1);
      break;
    case 1:
      $("#changeFontBtn").text("Ong Shuoh Chwen");
      $("#logoFooterBtn").text("Ong Shuoh Chwen");
      $("#changeFontBtn").data('id', 2);
      $("#logoFooterBtn").data('id', 2);
      break;
    case 2:
      $("#changeFontBtn").text("王烁錞");
      $("#logoFooterBtn").text("王烁錞");
      $("#changeFontBtn").data('id', 3);
      $("#logoFooterBtn").data('id', 3);
      break; 
    case 3:
      $("#changeFontBtn").text("왕삭순");
      $("#logoFooterBtn").text("왕삭순");
      $("#changeFontBtn").data('id', 4);
      $("#logoFooterBtn").data('id', 4);
      break;  
    case 4:
        $("#changeFontBtn").html(owl+owl+owl);
        $("#logoFooterBtn").html(owl+owl+owl);
        $("#changeFontBtn").data('id', 5);
        $("#logoFooterBtn").data('id', 5);
        break; 
    case 5:
      $("#changeFontBtn").text("proscawards");
      $("#logoFooterBtn").text("proscawards");
      $("#changeFontBtn").data('id', 0);
      $("#logoFooterBtn").data('id', 0);
      break; 
    default:
      $("#changeFontBtn").text("proscawards");
      $("#logoFooterBtn").text("proscawards");
      $("#changeFontBtn").data('id', 0);
      $("#logoFooterBtn").data('id', 0);
      break;   
  }
});

//Display modal when projectDiv is clicked
$(".projectDiv").click(function(e){
  e.preventDefault();
  var buttonId = $(this).attr('id');
  $('#modal-container').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');

});

//When window is resized
$(document).ready(function(){
  if (storage.length == 0){
    fetch('https://proscawards-portfolio-backend.herokuapp.com/', {
      method: 'get',
      headers: {
          'Content-Type': 'application/json'
      }
    });
    topCountries();
    totalVisitor();
  }
  else{
    storageUnpacker();
  }
  if (window.matchMedia('(max-width: 768px)').matches){ 
    $('[data-aos]').parent().addClass('hideOverflowOnMobile');
    $(document.documentElement).css("--screen-width", screen.width);
  }
});

$(window).resize(function() {
    $(document.documentElement).css("--screen-width", screen.width);
});

//Download Resume
$("#resumeBtn, #resumeBtn1").click(function (e){
  e.preventDefault();
  Swal.fire({
    text: `Do you want to download resume?`,
    confirmButtonText: "Download",
    showCancelButton: true
  }).then(result => {
    if (result.isConfirmed) {
      var hiddenElement = document.createElement('a');
      hiddenElement.href = "public/files/proscawards_resume.pdf";
      hiddenElement.target = '_blank';
      hiddenElement.download = "proscawards_resume.pdf";
      hiddenElement.click();
      hiddenElement.remove();
    }
  });
})

//Biography Read More in Mobile
$("#bioReadMore").click(function (e){
  e.preventDefault();
  $(this).hide();
  $("#bioPt1").show();
  $("#bioPt2").show();
  $("#bioPt3").show();
  $("#bioReadLess").show();
});

//Project 1 Read More in Mobile
$("#proj1ReadMore").click(function (e){
  e.preventDefault();
  $(this).hide();
  $("#proj1Txt").show();
  $("#proj1ReadLess").show();
});

//Project 2 Read More in Mobile
$("#proj2ReadMore").click(function (e){
  e.preventDefault();
  $(this).hide();
  $("#proj2Txt").show();
  $("#proj2ReadLess").show();
});

//Biography Read Less in Mobile
$("#bioReadLess").click(function (e){
  e.preventDefault();
  $(this).hide();
  $("#bioPt1").hide();
  $("#bioPt2").hide();
  $("#bioPt3").hide();
  $("#bioReadMore").show();
});

//Project 1 Read Less in Mobile
$("#proj1ReadLess").click(function (e){
  e.preventDefault();
  $(this).hide();
  $("#proj1Txt").hide();
  $("#proj1ReadMore").show();
});

//Project 2 Read Less in Mobile
$("#proj2ReadLess").click(function (e){
  e.preventDefault();
  $(this).hide();
  $("#proj2Txt").hide();
  $("#proj2ReadMore").show();
});

//Show Modal when ProjectDiv is clicked
$(".projectDiv").click(function (e){
  e.preventDefault();
  Swal.fire({
    showCloseButton: true,
    showConfirmButton:false,
    imageUrl: $(this).data('img'),
    text: $(this).data('name')
  });
});

//Show total visitor
function totalVisitor(){
  fetch('https://proscawards-portfolio-backend.herokuapp.com/count', {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    }
  }).then((res) => res.json()
  ).then((data) => {
    var count = data.count;
    if (storage.getVisitorCount() != null){
      count = storage.getVisitorCount();
    }
    storage.setVisitorCount(count);
    $("#totalVisitor").text(count);
  });
}

//Show top 3 countries' visitor
function topCountries(){
  fetch('https://proscawards-portfolio-backend.herokuapp.com/country', {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    }
  }).then((res) => res.json()
  ).then((dt) => {
    var data = dt;
    if (storage.getVisitorCountry() != null){
      data = storage.getVisitorCountry();
    }
    storage.setVisitorCountry(data);
    $("#top1CountryImg").attr("src", "https://www.countryflags.io/"+data[0][0]+"/flat/32.png");
    $("#top1CountryCount").text(data[0][1].count);
    $("#top2CountryImg").attr("src", "https://www.countryflags.io/"+data[1][0]+"/flat/32.png");
    $("#top2CountryCount").text(data[1][1].count);
    $("#top3CountryImg").attr("src", "https://www.countryflags.io/"+data[2][0]+"/flat/32.png");
    $("#top3CountryCount").text(data[2][1].count);
  });
}

//Load From Storage
function storageUnpacker(){
  var data = data = storage.getVisitorCountry();
  $("#top1CountryImg").attr("src", "https://www.countryflags.io/"+data[0][0]+"/flat/32.png");
  $("#top1CountryCount").text(data[0][1].count);
  $("#top2CountryImg").attr("src", "https://www.countryflags.io/"+data[1][0]+"/flat/32.png");
  $("#top2CountryCount").text(data[1][1].count);
  $("#top3CountryImg").attr("src", "https://www.countryflags.io/"+data[2][0]+"/flat/32.png");
  $("#top3CountryCount").text(data[2][1].count);

  var count = storage.getVisitorCount();
  $("#totalVisitor").text(count);
}