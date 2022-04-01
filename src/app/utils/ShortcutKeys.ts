import { Inject, Injectable } from '@angular/core';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';
import { LightTheme, DarkTheme } from './Theme';
import { HttpClient } from '@angular/common/http';
import { Router } from '../services/router.service';
import { CacheService } from '../services/cache.service';
import { KEY_THEME_ACTIVE } from '../api/CacheKeys';

@Injectable({
    providedIn: 'root',
})

export default class ShortcutKeys {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private router: Router,
        private httpClient: HttpClient,
        private cacheService: CacheService,
    ){
        this.cacheService = new CacheService(httpClient);
    }

    addListener(){
        this.document.addEventListener("keypress", (e: any) => {
          e.preventDefault();
          if ($(":focus").attr("id") != "searchInput" ||
              $(":focus").attr("id") != "searchProjInput")
          {
            switch (e.key){
              case '-':
                this.lightThemeBtnOnClick();
                break;
              case '=':
              case '+':
                this.darkThemeBtnOnClick();
                break;
              case '1':
                this.botNavBtnOnClicked(e, "");
                break;
              case '2':
                this.botNavBtnOnClicked(e, "about-me");
                break;
              case '3':
                this.botNavBtnOnClicked(e, "skills");
                break;
              case '4':
                this.botNavBtnOnClicked(e, "featured-projects");
                break;
              case '5':
                this.botNavBtnOnClicked(e, "educations");
                break;
              case '6':
                this.botNavBtnOnClicked(e, "experiences");
                break;
              case '7':
                this.botNavBtnOnClicked(e, "certifications");
                break;
              case '8':
                this.botNavBtnOnClicked(e, "contact-me");
                break;
            }
          }
        });
    }

    private botNavBtnOnClicked(e: any, url: string){
        this.router.routeTo(url);
        $(`#bnb_${this.router.routeURL()}`).addClass("activeNav");
      }
    
    //Manipulating the theme and font color
    private lightThemeBtnOnClick(){
        this.cacheService.set(KEY_THEME_ACTIVE, "isLight");
        LightTheme();
    }
    
    private darkThemeBtnOnClick(){
        this.cacheService.set(KEY_THEME_ACTIVE, "isDark");
        DarkTheme();
    }
    
}