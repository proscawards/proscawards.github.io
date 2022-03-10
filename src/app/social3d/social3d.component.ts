import { Component, OnInit, ɵdetectChanges as detectChanges, ɵmarkDirty as markDirty, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import Selected3DName from '../services/name3dsel.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'social3d',
  templateUrl: './social3d.component.html',
  styleUrls: ['./social3d.component.scss']
})
export class Social3dComponent implements OnInit {

  private cacheService: CacheService;
  private selected3dName: Selected3DName;
  readonly KEY_STATE = 'cache_state';
  private owlStr = "<img class='owls' src='assets/images/owls/owls_owl.svg'/><img class='owls' src='assets/images/owls/owls_lufie.svg'/><img class='owls' src='assets/images/owls/owls_guin.svg'/><img class='owls' id='phoenix' src='assets/images/owls/owls_owlhuang.svg'/><img class='owls' src='assets/images/owls/owls_flowl.svg'/>";
  public opBlockGap: AnimationOptions = {path: '/assets/files/social3d/social3d_blockgap.json'};
  public opHexSingle: AnimationOptions = {path: '/assets/files/social3d/social3d_hex_single.json'};
  public opHexTop: AnimationOptions = {path: '/assets/files/social3d/social3d_hex_top.json'};
  public opHexBot: AnimationOptions = {path: '/assets/files/social3d/social3d_hex_bot.json'};
  public opWheelTop: AnimationOptions = {path: '/assets/files/social3d/social3d_wheel_top_anim.json'};
  public opWheelMid: AnimationOptions = {path: '/assets/files/social3d/social3d_wheel_mid_anim.json'};
  public opWheelBot: AnimationOptions = {path: '/assets/files/social3d/social3d_wheel_bot_anim.json'};
  private onLoopCompleteCalledTimes: number = 0;
  private currentWheel: number = 0;

  constructor(
      private router: Router,
      private httpClient: HttpClient,
      private ngZone: NgZone, 
      private ref: ChangeDetectorRef
  ){
      this.cacheService = new CacheService(httpClient);
      this.selected3dName = new Selected3DName();
  }

  onLoopComplete(): void {
    // * first option via `NgZone.run()`
    this.ngZone.run(() => {
      this.onLoopCompleteCalledTimes++;
    });

    // * second option via `ChangeDetectorRef.detectChanges()`
    this.onLoopCompleteCalledTimes++;
    this.ref.detectChanges();
    // Angular 9+
    detectChanges(this);

    // * third option via `ChangeDetectorRef.markForCheck()`
    this.onLoopCompleteCalledTimes++;
    this.ref.markForCheck();
    // Angular 9+
    markDirty(this);
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnInit(): void {
    $("#linkedin").on('click', function(){
      window.open("https://www.linkedin.com/in/proscawards/","_blank");
    });
    $("#github").on('click', function(){
      window.open("https://github.com/proscawards/","_blank");
    });
    $("#instagram").on('click', function(){
      window.open("https://instagram.com/proscawards","_blank");
    });
    $("#discord").on('click', function(){
      window.open("https://discord.com/users/346129656157831169/","_blank");
    });
    $("#resume").on('click', function(e: any){
      e.preventDefault();
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
        }
      });
    });
    $("#aboutme").on('click', () => {
      this.router.navigate(['/about-me']);
    });
    $("#skill").on('click', () => {
      this.router.navigate(['/skills']);
    });
    $("#project").on('click', () => {
      this.router.navigate(['/featured-projects']);
    });
    $("#cert").on('click', () => {
      this.router.navigate(['/certifications']);
    });
    $("#edu").on('click', () => {
      this.router.navigate(['/educations']);
    });
    $("#exp").on('click', () => {
      this.router.navigate(['/experiences']);
    });
    $("#contact").on('click', () => {
      this.router.navigate(['/contact-me']);
    });
    $("#scrollTop3d").on('click', () => {
      $('html, body').animate({
        scrollTop: 0
        }, 800);
        return false;
    });
    $("#name_en").on('click', () => {
      this.selected3dName.setActive("name_en", "proscawards");
      this.cacheService.set(this.KEY_STATE, '1');
    });
    $("#name_scong").on('click', () => {
      this.selected3dName.setActive("name_scong", "SC Ong");
      this.cacheService.set(this.KEY_STATE, '2');
    });
    $("#name_osc").on('click', () => {
      this.selected3dName.setActive("name_osc", "Ong Shuoh Chwen");
      this.cacheService.set(this.KEY_STATE, '3');
    });
    $("#name_cn").on('click', () => {
      this.selected3dName.setActive("name_cn", "王烁錞");
      this.cacheService.set(this.KEY_STATE, '4');
    });
    $("#name_kr").on('click', () => {
      this.selected3dName.setActive("name_kr", "왕삭순");
      this.cacheService.set(this.KEY_STATE, '5');
    });
    $("#name_owl").on('click', () => {
      this.selected3dName.setActive("name_owl", this.owlStr);
      this.cacheService.set(this.KEY_STATE, '0');
    });
    setInterval(() => {
      this.wheelAnim();
    }, 100)
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
}
