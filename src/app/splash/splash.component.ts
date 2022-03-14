import { Component, OnInit, ɵdetectChanges as detectChanges, ɵmarkDirty as markDirty, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import * as $ from "jquery";

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  public options_landscape: AnimationOptions = {path: '/assets/files/logo/logo_landscape.json'};
  public options_potrait: AnimationOptions = {path: '/assets/files/logo/logo_potrait.json'};
  public options_landscape_decor: AnimationOptions = {path: '/assets/files/logo/logo_landscape_decor.json'};
  public options_potrait_decor: AnimationOptions = {path: '/assets/files/logo/logo_potrait_decor.json'};
  private onLoopCompleteCalledTimes: number = 0;

  constructor(    
    private ngZone: NgZone, 
    private ref: ChangeDetectorRef,
  ){ }

  ngOnInit(): void {
    if (window.outerWidth < 1024){
      $("#logoLandscape").hide();
      window.innerHeight <= 1920 ?
        $("#logoPotrait, #logoPotraitDecor").show() : 
        $("#logoPotrait").show();
    }
    else{
      $("#logoPotrait").hide();
      window.innerHeight >= 1080 ? 
        window.innerHeight <= 1920 ? 
          $("#logoPotrait, #logoPotraitDecor").show() : 
          $("#logoLandscape, #logoLandscapeDecor").show() : 
        $("#logoLandscape").show();
    }
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
  }
}
