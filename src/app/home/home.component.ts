import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { KEY_SPLASH, KEY_TITLE } from '../api/CacheKeys';
import { WINDOW_TITLE_DEFAULT } from '../api/ConstantInterface';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title: string;

  constructor(
    private cacheService: CacheService,
    private httpClient: HttpClient
  ) { 
    this.cacheService = new CacheService(this.httpClient);
    this.title = WINDOW_TITLE_DEFAULT;
  }

  ngOnInit(): void {
    this.title = WINDOW_TITLE_DEFAULT;
    this.cacheService.set(KEY_TITLE, this.title);
    $("body").css("overflow-y", "hidden");
    if (!Boolean(this.cacheService.get(KEY_SPLASH))) {
      setTimeout(() => {
        $("#splash").fadeOut();
        $("#intro, #social3d").fadeIn();
        $("body").css("overflow-y", "scroll");
        this.cacheService.set(KEY_SPLASH, true);
      }, 5500);    
    } else {
      $("#intro, #social3d").fadeIn();
      $("body").css("overflow-y", "scroll");
      $("#splash").hide().remove();
    }
  }
}
