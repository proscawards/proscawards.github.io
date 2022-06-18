import { Component, OnInit, Inject } from '@angular/core';
import * as $ from "jquery";
import { Router } from '../services/router.service';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import Selected3DName from '../services/name3dsel.service';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../services/window.service';
import { KEY_STATE, KEY_THEME_ACTIVE } from '../api/CacheKeys';
import { DarkTheme, LightTheme } from '../utils/Theme';
import { Snackbar } from '../utils/Snackbar';
import { SOCIAL_ACTION_DISCORD, SOCIAL_ACTION_DISCORD_CONT, SOCIAL_ACTION_GITHUB, SOCIAL_ACTION_GITHUB_CONT, SOCIAL_ACTION_INSTAGRAM, SOCIAL_ACTION_INSTAGRAM_CONT, SOCIAL_ACTION_LINKEDIN, SOCIAL_ACTION_LINKEDIN_CONT, SOCIAL_ACTION_RESUME, SOCIAL_ACTION_RESUME_CONT, SOCIAL_URL_DISCORD, SOCIAL_URL_GITHUB, SOCIAL_URL_INSTAGRAM, SOCIAL_URL_LINKEDIN, WINDOW_TITLE_ABOUT, WINDOW_TITLE_PROJECT, WINDOW_TITLE_SKILL } from '../api/ConstantInterface';

@Component({
  selector: 'social3d',
  templateUrl: './social3d.component.html',
  styleUrls: ['./social3d.component.scss']
})
export class Social3dComponent implements OnInit {

  private cacheService: CacheService;
  private selected3dName: Selected3DName;
  private owlStr = "<img class='owls' src='assets/images/owls/owls_owl.svg'/><img class='owls' src='assets/images/owls/owls_lufie.svg'/><img class='owls' src='assets/images/owls/owls_guin.svg'/><img class='owls' id='phoenix' src='assets/images/owls/owls_owlhuang.svg'/><img class='owls' src='assets/images/owls/owls_flowl.svg'/>";
  private currentWheel: number = 0;
  private glowColor: string[] = [
    "#ED7372",
    "#EDED72",
    "#9FED72",
    "#4dd0e1",
    "#7276ED",
    "#CF72ED"
  ];

  constructor(
      private router: Router,
      private httpClient: HttpClient,
      @Inject(DOCUMENT) private document: Document,
      @Inject(WINDOW) private window: Window,
      private snackbar: Snackbar
  ){
      this.cacheService = new CacheService(this.httpClient);
      this.selected3dName = new Selected3DName();
  }

  ngOnInit(): void {
    $("#linkedin").on('click', () => {
      this.snackbar
      .setTitle(SOCIAL_ACTION_LINKEDIN)
      .setAction(SOCIAL_ACTION_LINKEDIN_CONT)
      .setUrl(SOCIAL_URL_LINKEDIN)
      .setType({isSocial: true})
      .execute();
    });
    $("#github").on('click', () => {
      this.snackbar
      .setTitle(SOCIAL_ACTION_GITHUB)
      .setAction(SOCIAL_ACTION_GITHUB_CONT)
      .setUrl(SOCIAL_URL_GITHUB)
      .setType({isSocial: true})
      .execute();
    });
    $("#instagram").on('click', () => {
      this.snackbar
      .setTitle(SOCIAL_ACTION_INSTAGRAM)
      .setAction(SOCIAL_ACTION_INSTAGRAM_CONT)
      .setUrl(SOCIAL_URL_INSTAGRAM)
      .setType({isSocial: true})
      .execute();
    });
    $("#discord").on('click', () => {
      this.snackbar
      .setTitle(SOCIAL_ACTION_DISCORD)
      .setAction(SOCIAL_ACTION_DISCORD_CONT)
      .setUrl(SOCIAL_URL_DISCORD)
      .setType({isSocial: true})
      .execute();
    });
    $("#resume").on('click', () => {
      this.snackbar
      .setTitle(SOCIAL_ACTION_RESUME)
      .setAction(SOCIAL_ACTION_RESUME_CONT)
      .setType({isResume: true})
      .execute();
    });
    $("#aboutme").on('click', () => {
      this.snackbar
      .setTitle("An ID card?")
      .setAction("About me")
      .setUrl("about-me")
      .setBrowserTitle(WINDOW_TITLE_ABOUT)
      .setType({isRouter: true})
      .execute();
    });
    $("#skill").on('click', () => {
      this.snackbar
      .setTitle("A haywired brain?")
      .setAction("Skills")
      .setUrl("skills")
      .setBrowserTitle(WINDOW_TITLE_SKILL)
      .setType({isRouter: true})
      .execute();
    });
    $("#project").on('click', () => {
      this.snackbar
      .setTitle("A self-closing tag paper?")
      .setAction("Projects")
      .setUrl("featured-projects")
      .setBrowserTitle(WINDOW_TITLE_PROJECT)
      .setType({isRouter: true})
      .execute();
    });
    // $("#cert").on('click', () => {
    //   this.snackbar
    //   .setTitle("A paper with medal?")
    //   .setAction("Certifications")
    //   .setUrl("certifications")
    //   .setType({isRouter: true})
    //   .execute();
    // });
    $("#edu").on('click', () => {
      this.snackbar
      .setTitle("A graduation cap?")
      .setAction("Educations")
      .setUrl("educations")
      .setBrowserTitle("Portfolio - Educations")
      .setType({isRouter: true})
      .execute();
    });
    $("#exp").on('click', () => {
      this.snackbar
      .setTitle("A suitcase?")
      .setAction("Experiences")
      .setUrl("experiences")
      .setBrowserTitle("Portfolio - Experiences")
      .setType({isRouter: true})
      .execute();
    });
    $("#contact").on('click', () => {
      this.snackbar
      .setTitle("An envelope?")
      .setAction("Contact me")
      .setUrl("contact-me")
      .setBrowserTitle("Portfolio - Contact Me")
      .setType({isRouter: true})
      .execute();
    });
    $("#scrollTop3d").on('click', () => {
      $('html, body').animate({
        scrollTop: 0
        }, 800);
        return false;
    });
    $("#lighttheme").on('click', () => {
      this.lightThemeBtnOnClick();
    });
    $("#darktheme").on('click', () => {
      this.darkThemeBtnOnClick();
    });
    $("#name_en").on('click', () => {
      this.selected3dName.setActive("name_en", "proscawards");
      this.cacheService.set(KEY_STATE, '1');
    });
    $("#name_scong").on('click', () => {
      this.selected3dName.setActive("name_scong", "SC Ong");
      this.cacheService.set(KEY_STATE, '2');
    });
    $("#name_osc").on('click', () => {
      this.selected3dName.setActive("name_osc", "Ong Shuoh Chwen");
      this.cacheService.set(KEY_STATE, '3');
    });
    $("#name_cn").on('click', () => {
      this.selected3dName.setActive("name_cn", "王烁錞");
      this.cacheService.set(KEY_STATE, '4');
    });
    $("#name_kr").on('click', () => {
      this.selected3dName.setActive("name_kr", "왕삭순");
      this.cacheService.set(KEY_STATE, '5');
    });
    $("#name_owl").on('click', () => {
      this.selected3dName.setActive("name_owl", this.owlStr);
      this.cacheService.set(KEY_STATE, '0');
    });
    $("#spammer").on("click", () => {
      let rand: number = Math.floor(Math.random()*(this.glowColor.length));
      $(document.documentElement).css("--blockgapGlowColor", this.glowColor[rand]);
    });
    setInterval(() => {
      this.wheelAnim();
    }, 100)

    if (this.cacheService.exist(KEY_THEME_ACTIVE)){
      if (this.cacheService.get(KEY_THEME_ACTIVE) == "isDark"){
        this.darkThemeBtnOnClick();
      }
      else{
        this.lightThemeBtnOnClick();
      }
    }
  }

  wheelAnim(){
    switch (this.currentWheel){
      case 0:
        $("#wheel1_0, #wheel2_0, #wheel3_0").show();
        $("#wheel1_1, #wheel2_1, #wheel3_1, #wheel1_2, #wheel2_2, #wheel3_2").hide();
        this.currentWheel++;
        break;
      case 1:
        $("#wheel1_1, #wheel2_1, #wheel3_1").show();
        $("#wheel1_0, #wheel2_0, #wheel3_0, #wheel1_2, #wheel2_2, #wheel3_2").hide();
        this.currentWheel++;
        break;
      case 2:
        $("#wheel1_2, #wheel2_2, #wheel3_2").show();
        $("#wheel1_0, #wheel2_0, #wheel3_0, #wheel1_1, #wheel2_1, #wheel3_1").hide();
        this.currentWheel = 0;
        break;
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
}
