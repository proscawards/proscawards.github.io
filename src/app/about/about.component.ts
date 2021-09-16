import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent{

  constructor() { }

  //Biography Read More in Mobile
  bioReadMore(e: any){
    e.preventDefault();
    $("#bioReadMore").hide();
    $("#bioPt1").show();
    $("#bioPt2").show();
    $("#bioPt3").show();
    $("#bioReadLess").show();
  }

  //Biography Read Less in Mobile
  bioReadLess(e: any){
    e.preventDefault();
    $("#bioReadLess").hide();
    $("#bioPt1").hide();
    $("#bioPt2").hide();
    $("#bioPt3").hide();
    $("#bioReadMore").show();
  }
  
}
