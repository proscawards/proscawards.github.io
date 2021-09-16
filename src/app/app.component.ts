import { Component, HostListener, AfterViewInit, Inject } from '@angular/core';
import * as $ from "jquery";
import * as AOS from 'aos';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "./services/window.service";
import Storage from "./model/Storage";
const storage = new Storage();

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit{

  windowWidth: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) { this.onDOMLoaded(); }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    var topPos = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
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
  }

  ngAfterViewInit() {
    AOS.init();
  }

  //On document load
  onDOMLoaded(){
    if (storage.length == 0){
      fetch('https://proscawards-portfolio-backend.herokuapp.com/', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
      });
      this.topCountries();
      this.totalVisitor();
    }
    else{
      this.storageUnpacker();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.windowWidth = window.innerWidth;
    $('[data-aos]').parent().addClass('hideOverflowOnMobile');
    $(document.documentElement).css("--screen-width", this.windowWidth);
  }
  
  //Load From Storage
  storageUnpacker(){
    let data = storage.getVisitorCountry();
    $("#top1CountryImg").attr("src", "https://www.countryflags.io/"+data[0][0]+"/flat/32.png");
    $("#top1CountryCount").text(data[0][1].count);
    $("#top2CountryImg").attr("src", "https://www.countryflags.io/"+data[1][0]+"/flat/32.png");
    $("#top2CountryCount").text(data[1][1].count);
    $("#top3CountryImg").attr("src", "https://www.countryflags.io/"+data[2][0]+"/flat/32.png");
    $("#top3CountryCount").text(data[2][1].count);

    $("#totalVisitor").text(storage.getVisitorCount() || 0);
  }

  //Show top 3 countries' visitor
  topCountries(){
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

  //Show total visitor
  totalVisitor(){
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
}
