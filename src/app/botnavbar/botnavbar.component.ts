import { Component, OnInit, HostListener, Inject } from '@angular/core';
import * as $ from 'jquery';
import { CacheService } from '../services/cache.service';
import ToSentenceCase from '../utils/ToSentenceCase';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";
import { KEY_BNB_ACTIVE, KEY_THEME_ACTIVE, KEY_SEARCH_ACTIVE } from '../api/CacheKeys';
import { DarkTheme, LightTheme } from '../utils/Theme';
import { Router } from '../services/router.service';
import { Snackbar } from '../utils/Snackbar';
import ShortcutKeys from '../utils/ShortcutKeys';

@Component({
  selector: 'botnavbar',
  templateUrl: './botnavbar.component.html',
  styleUrls: ['./botnavbar.component.scss']
})
export class BotnavbarComponent implements OnInit {

  private cacheService: CacheService;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private snackbar: Snackbar,
    private shortcutKeys: ShortcutKeys,
  ) { 
    this.cacheService = new CacheService(httpClient);
    this.shortcutKeys = new ShortcutKeys(document, router, httpClient, this.cacheService);
  }

  ngOnInit(): void {
    if (this.cacheService.exist(KEY_BNB_ACTIVE)){
      if (Boolean(this.cacheService.get(KEY_BNB_ACTIVE))){
        $(`.botNavInnerBar`).show();
        $(`.navBarCaret`).addClass("activeNavBarCaret");
        this.cacheService.set(KEY_BNB_ACTIVE, true);
        this.resetHover();
      }
      else{
        $(`.botNavInnerBar`).hide();
        $(`.navBarCaret`).removeClass("activeNavBarCaret");
        this.cacheService.set(KEY_BNB_ACTIVE, false);
      }
    }
    if (this.cacheService.exist(KEY_THEME_ACTIVE)){
      if (this.cacheService.get(KEY_THEME_ACTIVE) == "isDark"){
        this.darkThemeBtnOnClick();
      }
      else{
        this.lightThemeBtnOnClick();
      }
    }

    // this.shortcutKeys.addListener();
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
    let text: string = this.router.routeURL();
    $(".botNavText").text(ToSentenceCase(text, "-"));
    $(`#bnb_${text}`).addClass("activeNav");
  }

  botNavBtnOnClicked(e: any, url: string){
    this.router.routeTo(url);
    $(`#bnb_${this.router.routeURL()}`).addClass("activeNav");
  }

  navBarOnClicked(){
    if (!$(`.navBarCaret`).hasClass("activeNavBarCaret")){
      $(`.botNavInnerBar`).slideDown().fadeIn();
      $(`.navBarCaret`).addClass("activeNavBarCaret");
      this.cacheService.set(KEY_BNB_ACTIVE, true);
    }
    else{
      $(`.botNavInnerBar`).slideUp().fadeOut();
      $(`.navBarCaret`).removeClass("activeNavBarCaret");
      this.cacheService.set(KEY_BNB_ACTIVE, false);
    }
  }

  //Manipulating the theme and font color
  lightThemeBtnOnClick(){
    this.cacheService.set(KEY_THEME_ACTIVE, "isLight");
    LightTheme();
  }
  
  darkThemeBtnOnClick(){
    this.cacheService.set(KEY_THEME_ACTIVE, "isDark");
    DarkTheme();
  }

  //Click event to scroll to top
  scrollTopOnClick(){
    $('html, body').animate({
    scrollTop: 0
    }, 800);
    this.resetHover();
    return false;
  }

  @HostListener('document:click', ['$event'])
  domOnClick(e: any){
    // console.log(e.target.parentElement.className)
    if (!e.target.className.includes("triggerBnb") && !e.target.parentElement.className.includes("triggerBnb") || e.target.className == ""){
      if (Boolean(this.cacheService.get(KEY_BNB_ACTIVE))){
        $(`.botNavInnerBar`).slideUp().fadeOut();
        $(`.navBarCaret`).removeClass("activeNavBarCaret");
        this.cacheService.set(KEY_BNB_ACTIVE, false);
      }
    }
  }
}
