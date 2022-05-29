import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";
import { Project } from '../model/data/Project';
import ColorThief from 'colorthief';
const colorThief = new ColorThief();
import { Observable } from 'rxjs';
import { GetProjectList } from '../graphql/resolver/GetProjectList.gql';
import { map } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';
import { HttpClient } from '@angular/common/http';
import { KEY_PROJECT_ACTIVE } from '../api/CacheKeys';
import Duration from '../utils/Duration';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  private dataObserver!: Observable<Project[]>;
  public infoArr: Project[] = [];
  public infoData: Project[] = [];
  public prevData: Project[] = [];
  public nextData: Project[] = [];
  public projId: any;
  public invalidPrev: boolean = false;
  public invalidNext: boolean = false;

  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private cacheService: CacheService,
    private httpClient: HttpClient,
    private getProject: GetProjectList
  ){
    this.cacheService = new CacheService(this.httpClient);
    this.cacheService.exist(KEY_PROJECT_ACTIVE) ? 
      this.projId = this.cacheService.get(KEY_PROJECT_ACTIVE) : this.projId = 0;
  }

  ngOnInit(){
    this.preprocessData();
  }

  //Preprocess Data
  preprocessData(){
    this.dataObserver = this.getProject.watch()
    .valueChanges
    .pipe(
      map(result => result.data.getProjectList)
    );
    this.dataObserver.subscribe(data => {
      var tempData = [...data];
      this.infoArr = tempData.sort((a: any, b: any) => {return a.id - b.id});
      let result: Project[] = this.infoArr;
      let id: number = parseInt(this.projId);
      this.cacheService.set(KEY_PROJECT_ACTIVE, id);
      this.infoData = result.filter(function (info: any) {return info.id == id});
      if (id-1 >= 0){
        this.prevData = result.filter(function (info: any) {return info.id == id-1});
        this.invalidPrev = false;
      }
      else{
        this.invalidPrev = true;
      }
      if (id+1 <= result.length){
        this.nextData = result.filter(function (info: any) {return info.id == id+1});
        this.invalidNext = false;
      }
      else{
        this.invalidNext = true;
      }
    });
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

  //Calculate the duration of current project
  durationProject(dateArr: string) {
    return Duration(dateArr);
  }
}
