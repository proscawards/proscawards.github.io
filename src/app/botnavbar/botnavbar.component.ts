import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CacheService } from '../services/cache.service';
import ToSentenceCase from '../utils/ToSentenceCase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'botnavbar',
  templateUrl: './botnavbar.component.html',
  styleUrls: ['./botnavbar.component.scss']
})
export class BotnavbarComponent implements OnInit {

  private cacheService: CacheService;
  readonly KEY_BNBACT = 'cache_bnbact';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) { 
    this.cacheService = new CacheService(httpClient);
  }

  ngOnInit(): void {
    if (this.cacheService.exist(this.KEY_BNBACT)){
      if (this.cacheService.get(this.KEY_BNBACT)){
        $(`.botNavInnerBar`).show();
        $(`.navBarCaret`).addClass("activeNavBarCaret");
        this.cacheService.set(this.KEY_BNBACT, true);
        this.resetHover();
      }
      else{
        $(`.botNavInnerBar`).hide();
        $(`.navBarCaret`).removeClass("activeNavBarCaret");
        this.cacheService.set(this.KEY_BNBACT, false);
      }
    }
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.resetHover();
    }, 100);
  }

  botNavBtnOnHover(text: string){
    $(".botNavText").text(text);
  }

  resetHover(){
    let text: string = this.router.url.replace("/", "");
    $(".botNavText").text(ToSentenceCase(text, "-"));
    $(`#bnb_${text}`).addClass("activeNav");
  }

  botNavBtnOnClicked(e: any, url: string){
    this.router.navigate([url]);
    $(`#bnb_${this.router.url.replace("/", "")}`).addClass("activeNav");
  }

  navBarOnClicked(){
    if (!$(`.navBarCaret`).hasClass("activeNavBarCaret")){
      $(`.botNavInnerBar`).slideDown().fadeIn();
      $(`.navBarCaret`).addClass("activeNavBarCaret");
      this.cacheService.set(this.KEY_BNBACT, true);
    }
    else{
      $(`.botNavInnerBar`).slideUp().fadeOut();
      $(`.navBarCaret`).removeClass("activeNavBarCaret");
      this.cacheService.set(this.KEY_BNBACT, false);
    }
  }

  //Manipulating the theme and font color
  lightThemeBtnOnClick(){
    $("#darkThemeBtn").show();
    $("#lightThemeBtn").hide();
    $(document.documentElement).css("--currentBgCodeColor", "#F7F7F7");
    $(document.documentElement).css("--currentFontCodeColor", "#5888AD");
    $(document.documentElement).css("--oppositeBgCodeColor", "#242C3C");
    $(document.documentElement).css("--oppositeFontCodeColor", "#5888AD");
    $(document.documentElement).css("--currentFontDescColor", "#3b78e7");
    $(document.documentElement).css("--currentBgSdColor", "rgb(255,255,255,.8)");
    $(document.documentElement).css("--currentBgSdGradColor", "rgb(255,255,255,.8)");
    $(document.documentElement).css("--currentUEFilter", "invert(0%)");
    $(document.documentElement).css("--oppositeUEFilter", "invert(100%)");
    $(document.documentElement).css("--currentBgCommentColor", "rgba(255,255,255,1)");
  }
  
  darkThemeBtnOnClick(){
    $("#lightThemeBtn").show();
    $("#darkThemeBtn").hide();
    $(document.documentElement).css("--currentBgCodeColor", "#242C3C");
    $(document.documentElement).css("--currentFontCodeColor", "#5888AD");
    $(document.documentElement).css("--oppositeBgCodeColor", "#F7F7F7");
    $(document.documentElement).css("--oppositeFontCodeColor", "#5888AD");
    $(document.documentElement).css("--currentFontDescColor", "#4dd0e1");
    $(document.documentElement).css("--currentBgSdColor", "rgb(40,49,66,.8)");
    $(document.documentElement).css("--currentBgSdGradColor", "linear-gradient(90deg, rgb(0,0,0,.3) 0%, rgb(0,0,0,.3) 40%, rgba(0,0,0,0) 100%)");  
    $(document.documentElement).css("--currentUEFilter", "invert(100%)");
    $(document.documentElement).css("--oppositeUEFilter", "invert(0%)");
    $(document.documentElement).css("--currentBgCommentColor", "rgba(59,72,97,1)");
  }

  //Click event to scroll to top
  scrollTopOnClick(){
    $('html, body').animate({
    scrollTop: 0
    }, 800);
    this.resetHover();
    return false;
  }
}
