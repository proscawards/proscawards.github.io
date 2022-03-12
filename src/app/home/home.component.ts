import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("body").css("overflow-y", "hidden");
    setTimeout(() => {
      $("#splash").fadeOut();
      $("#intro, #social3d").fadeIn();
      $("body").css("overflow-y", "scroll");
    }, 5500);
  }
}
