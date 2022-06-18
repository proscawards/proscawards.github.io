import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import info from "./project-clickable.json";
import { Router } from '../services/router.service';
import { CacheService } from '../services/cache.service';
import { HttpClient } from '@angular/common/http';
import { KEY_TITLE } from '../api/CacheKeys';
import { WINDOW_TITLE_PROJECT } from '../api/ConstantInterface';

interface Info{
  id: number,
  type: string,
  url: string,
  hasDownload: boolean,
  download: string
}

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit{

  Info: Info[] = info;
  public title: string;

  constructor(
    private router: Router,
    private cacheService: CacheService,
    private httpClient: HttpClient
  ) {
    this.cacheService = new CacheService(this.httpClient);
    this.title = WINDOW_TITLE_PROJECT;
   }
  ngOnInit(): void {
    this.title = WINDOW_TITLE_PROJECT;
    this.cacheService.set(KEY_TITLE, this.title);
  }

  //Project 1 Read More in Mobile
  proj1ReadMore(e: any){
    e.preventDefault();
    $("#proj1ReadMore").hide();
    $("#proj1Txt").show();
    $("#proj1ReadLess").show();
  }

  //Project 1 Read Less in Mobile
  proj1ReadLess(e: any){
    e.preventDefault();
    $("#proj1ReadLess").hide();
    $("#proj1Txt").hide();
    $("#proj1ReadMore").show();
  }

  //Project 2 Read More in Mobile
  proj2ReadMore(e: any){
    e.preventDefault();
    $("#proj2ReadMore").hide();
    $("#proj2Txt").show();
    $("#proj2ReadLess").show();
  }

  //Project 2 Read Less in Mobile
  proj2ReadLess(e: any){
    e.preventDefault();
    $("#proj2ReadLess").hide();
    $("#proj2Txt").hide();
    $("#proj2ReadMore").show();
  }

  divOnClick(e: any, id: any){
    var hiddenElement = document.createElement('a');
    hiddenElement.href = this.Info[id].url;
    hiddenElement.target = '_blank';
    if (this.Info[id].hasDownload){
      hiddenElement.download = this.Info[id].download;
    } 
    hiddenElement.click();
    hiddenElement.remove();
  }

  route(e: any, url: any){
    this.router.routeTo(url);
  }
}
