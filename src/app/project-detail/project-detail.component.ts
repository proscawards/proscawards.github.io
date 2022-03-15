import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/data/Project';
import { CacheService } from '../services/cache.service';
import ColorThief from 'colorthief';
import { KEY_PROJECT, KEY_PROJECT_ACTIVE } from '../api/CacheKeys';
const colorThief = new ColorThief();

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  public infoArr: Project[] = [];
  public infoData: Project[] = [];
  public prevData: Project[] = [];
  public nextData: Project[] = [];
  private cacheService: CacheService;
  public projId: any;
  public invalidPrev: boolean = false;
  public invalidNext: boolean = false;

  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private httpClient: HttpClient,
  ){
    this.cacheService = new CacheService(httpClient);
    this.cacheService.exist(KEY_PROJECT_ACTIVE) ? 
      this.projId = this.cacheService.get(KEY_PROJECT_ACTIVE) : this.projId = 0;
  }

  ngOnInit(){
    this.getCollection();
    this.preprocessData();
  }

  //Preprocess Data
  preprocessData(){
    let data: Project[] = this.infoArr;
    let id: number = parseInt(this.projId);
    this.infoData = data.filter(function (info: any) {return info.id == id});
    this.cacheService.set(KEY_PROJECT_ACTIVE, id);
    if (id-1 >= 0){
      this.prevData = data.filter(function (info: any) {return info.id == id-1});
      this.invalidPrev = false;
    }
    else{
      this.invalidPrev = true;
    }
    if (id+1 <= data.length){
      this.nextData = data.filter(function (info: any) {return info.id == id+1});
      this.invalidNext = false;
    }
    else{
      this.invalidNext = true;
    }
  }

  //Retrieve data from backend
  getCollection(){
    if (this.cacheService.exist(KEY_PROJECT)){
      this.infoArr = this.cacheService.get(KEY_PROJECT);
    }
    else{
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/project')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.infoArr = data;
        this.cacheService.set(KEY_PROJECT, data);
      });
    }
  }

  //Open github source codes
  sourceBtnOnClicked(e: any, source: any){
    e.preventDefault();
    window.open(source, '_blank');
  }

  //Set page to previous/next project
  navBtnOnClicked(e: any, id: any){
    this.projId = id;
    this.preprocessData();
    window.scroll(0,0);
  }

  //Display thumbnail to fullscreen
  fsThumbnailOnClicked(url: any){
    $(".fsThumbnail").attr("src", url);
    $(".fsDiv").fadeIn();
    $("#projDetailDiv, footer").fadeOut();
    let elem: HTMLImageElement | any = document.querySelector(".fsThumbnail");
    let color: any;
    if (elem.complete) {
      color = colorThief.getColor(elem);
    } else {
      elem.addEventListener('load', function() {
        color = colorThief.getColor(elem);
      });
    }
    $(".fsDiv").css("background-color", `rgba(${color[0]},${color[1]}, ${color[2]}, .8)`);
    this.document.documentElement.requestFullscreen();
  }

  //Close fullscreen div
  fsBtnOnClicked(e: any){
    $(".fsDiv").fadeOut();
    $("#projDetailDiv, footer").fadeIn();
    this.document.exitFullscreen();
  }
}
