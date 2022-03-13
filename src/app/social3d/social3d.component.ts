import { Component, OnInit, Inject } from '@angular/core';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import Selected3DName from '../services/name3dsel.service';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../services/window.service';
import { KEY_STATE, KEY_THEME_ACTIVE } from '../api/CacheKeys';
import { DarkTheme, LightTheme } from '../utils/Theme';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      private snackbar: MatSnackBar,
  ){
      this.cacheService = new CacheService(httpClient);
      this.selected3dName = new Selected3DName();
  }

  openSocialSnackBar(name: string, url: string) {
    this.snackbar.open(`Visit ${name}?`, 'Sure!', {
      duration: 5000
    });
    this.snackbar._openedSnackBarRef?.onAction().subscribe(() => {
      this.window.open(url, "_blank");
    });
  }

  openResumeSnackBar() {
    this.snackbar.open(`Resume downloaded.`, '', {
      duration: 3000
    });
  }

  openRouterSnackBar(name: string, action: string, route: string) {
    this.snackbar.open(name, action, {
      duration: 3000
    });
    this.snackbar._openedSnackBarRef?.onAction().subscribe(() => {
      this.router.navigate([route]);
    });
  }

  ngOnInit(): void {
    $("#linkedin").on('click', () => {
      this.openSocialSnackBar("LinkedIn", "https://www.linkedin.com/in/proscawards/");
    });
    $("#github").on('click', () => {
      this.openSocialSnackBar("GitHub", "https://github.com/proscawards/");
    });
    $("#instagram").on('click', () => {
      this.openSocialSnackBar("Instagram", "https://instagram.com/proscawards");
    });
    $("#discord").on('click', () => {
      this.openSocialSnackBar("Discord", "https://discord.com/users/346129656157831169/");
    });
    $("#resume").on('click', () => {
      Swal.fire({
        text: `Do you want to download resume?`,
        confirmButtonText: "Download",
        showCancelButton: true
      }).then(result => {
        if (result.isConfirmed) {
          var hiddenElement = document.createElement('a');
          hiddenElement.href = "assets/files/proscawards_resume.pdf";
          hiddenElement.target = '_blank';
          hiddenElement.download = "proscawards_resume.pdf";
          hiddenElement.click();
          hiddenElement.remove();
          this.openResumeSnackBar();
        }
      });
    });
    $("#aboutme").on('click', () => {
      this.openRouterSnackBar("An ID card?", "About me", "/about-me");
    });
    $("#skill").on('click', () => {
      this.openRouterSnackBar("A haywired brain?", "Skills", "/skills");
    });
    $("#project").on('click', () => {
      this.openRouterSnackBar("A self-closing tag paper?", "Projects", "/featured-projects");
    });
    $("#cert").on('click', () => {
      this.openRouterSnackBar("A paper with medal?", "Certifications", "/certifications");
    });
    $("#edu").on('click', () => {
      this.openRouterSnackBar("A graduation cap?", "Educations", "/educations");
    });
    $("#exp").on('click', () => {
      this.openRouterSnackBar("A suitcase?", "Experiences", "/experiences");
    });
    $("#contact").on('click', () => {
      this.openRouterSnackBar("An envelope?", "Contact me", "/contact-me");
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
