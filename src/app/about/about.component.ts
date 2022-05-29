import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { KEY_TITLE } from '../api/CacheKeys';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{

  public title: string;

  constructor(
    private cacheService: CacheService,
    private httpClient: HttpClient
  ) {
    this.cacheService = new CacheService(this.httpClient);
    this.title = "Portfolio - About Me";
   }

  ngOnInit(): void {
   this.title = "Portfolio - About Me";
   this.cacheService.set(KEY_TITLE, this.title);
  }

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
