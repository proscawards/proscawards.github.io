import { Component, HostListener, OnInit, AfterViewInit, Inject } from '@angular/core';
import * as $ from "jquery";
import * as AOS from 'aos';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "./services/window.service";
import { Router } from "./services/router.service";

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit{

  windowWidth: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private router: Router,
  ) {
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    var topPos = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    // if user scrolls down - show scroll to top button
    if (topPos > 50) {
      if (window.matchMedia('(max-width: 768px)').matches){
        $("#title").css("width", "50vw");
        $("#title").css("top", "90%");
      }
      else{
        $("#title").css("width", "100vh");
        $("#title").css("top", "90%");
        $("#scrollTopBtn").show();
      }
    } 
    else {
      if (window.matchMedia('(max-width: 768px)').matches){
        $("#title").css("width", "50vw");
        $("#title").css("top", "50%");
      }
      else{
        $("#title").css("width", "100vh");
        $("#title").css("top", "50%");
        $("#scrollTopBtn").hide();
      }
    }

    let footerHeight: number | any = $("#footer").innerHeight();
    let footerOffset: number | any = $("#footer").offset()?.top;
    let footerPos: number | any = footerOffset - footerHeight;
    if (topPos >= footerPos){
      $(".botNavBar").css("position", "relative");
    }
    else{
      $(".botNavBar").css("position", "fixed");
    }
  }

  ngOnInit(): void {
      this.router.routeTo();
  }

  ngAfterViewInit() {
    AOS.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.windowWidth = window.innerWidth;
    $('[data-aos]').parent().addClass('hideOverflowOnMobile');
    $(document.documentElement).css("--screen-width", this.windowWidth);
  }
}
