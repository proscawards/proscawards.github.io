import { Component } from '@angular/core';
import { TypeWriterComponent } from './header.typewriter.component';
import * as $ from 'jquery';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends TypeWriterComponent{

  constructor() { 
    super();
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
    return false;
  }

}
