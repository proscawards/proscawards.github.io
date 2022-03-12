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

  public options: AnimationOptions = {path: '/assets/files/logo/logo_landscape.json'};
  public options_potrait: AnimationOptions = {path: '/assets/files/logo/logo_potrait.json'};
  private onLoopCompleteCalledTimes: number = 0;

  constructor(    
    private ngZone: NgZone, 
    private ref: ChangeDetectorRef,
  ){ }

  ngOnInit(): void {
    if (window.outerWidth <= 768){
      $("#logoLandscape").hide();
      $("#logoPotrait").show();
    }
    else{
      $("#logoLandscape").show();
      $("#logoPotrait").hide();
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
    console.log(animationItem);
  }
}
