import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from "../services/window.service";
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/data/Project';
import { CacheService } from '../services/cache.service';
import { Router } from '../services/router.service';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { KEY_PROJECT, KEY_PROJECT_ACTIVE, KEY_TITLE } from '../api/CacheKeys';
import { Observable } from 'rxjs';
import { GetProjectList } from '../graphql/resolver/GetProjectList.gql';
import { map } from 'rxjs/operators';
import { WINDOW_TITLE_PROJECT_ALL } from '../api/ConstantInterface';

interface ActiveButtons {
  isDesktopActive: Boolean,
  isMobileActive: Boolean,
  isWebActive: Boolean,
  isSeActive: Boolean,
  isDsActive: Boolean,
  isGdActive: Boolean,
  isEcomActive: Boolean,
  isUtilActive: Boolean
}

@Component({
  selector: 'project-other',
  templateUrl: './project-other.component.html',
  styleUrls: ['./project-other.component.scss']
})

export class ProjectOtherComponent implements OnInit {

  private dataObserver!: Observable<Project[]>;
  public infoArr: Project[] = [];
  public filterArr: Project[] = [];
  private cacheService: CacheService;
  private activeButtons: ActiveButtons = {
    isDesktopActive: false,
    isMobileActive: false,
    isWebActive: false,
    isSeActive: false,
    isDsActive: false,
    isGdActive: false,
    isEcomActive: false,
    isUtilActive: false
  };
  public value: any = "Force Awaken";
  public prevQuery: string = "";
  public isCompleted: boolean = false;
  public title: string;

  constructor(
    private route: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private httpClient: HttpClient,
    private router: Router,
    private getProject: GetProjectList
  ){
    this.cacheService = new CacheService(this.httpClient);
    this.title = WINDOW_TITLE_PROJECT_ALL;
  }

  ngOnInit(){
    $(".otherProjDiv").show();
    $(".compProjDiv, .noResultDiv, .filterProjDiv").hide();
    $(".filterToggleBtn").prop('disabled', true);
    this.validateParams();
    this.dataObserver = this.getProject.watch()
                          .valueChanges
                          .pipe(
                            map(result => result.data.getProjectList)
                          );
    this.dataObserver.subscribe(data => {
      var tempData = [...data];
      this.infoArr = tempData.sort((a: any, b: any) => {return a.id - b.id});
      $("#projLoading").fadeOut();
      $(".otherProjDiv, .filterProjDiv").fadeIn();
      $(".filterToggleBtn").prop('disabled', false);
      this.filterArr = this.infoArr;
      this.isCompleted = true;
      this.title = WINDOW_TITLE_PROJECT_ALL;
      this.cacheService.set(KEY_TITLE, this.title);
    });
  }

  //Redirect from education or experience
  validateParams(){
    let elem: any = this.route.snapshot.paramMap.get('elem');
    var pos: any = $(`#${elem}`)?.parent()?.offset()?.top;
    $('html, body').animate({scrollTop: pos-350},800);
    $(`#${elem}`).parent().addClass('hovered');
  }

  //Show Modal when ProjectDiv is clicked
  projectDivOnClick(e: any, id: any){
    e.preventDefault();
    this.cacheService.set(KEY_PROJECT_ACTIVE, id);
    this.router.routeTo("project");
  }

  //Show/hide the filter div
  filterBtnOnToggle(e: any){
    e.preventDefault();
    if ($(".filterToggleBtn").hasClass("isFilterToggleActive")){
      $(".filterToggleBtn").removeClass("isFilterToggleActive");
      $(".filterProjDiv").fadeOut();
    }
    else{
      $(".filterToggleBtn").addClass("isFilterToggleActive");
      $(".filterProjDiv").fadeIn();
    }
  }

  //Perform filter
  filterArrOnKey(key: string){
    var data = this.infoArr.slice(0);
    return data.filter(function(a: any) {return a.filter.includes(key)});
  }

  //Filter projects based on button clicked
  filterBtnOnClick(e: any, id: number){
    e.preventDefault();
    $(".ngMatBtn").removeClass("mat-active");
    $(`#ngMatBtn${id}`).addClass("mat-active");  
    switch (id){
      case 0:
        this.filterArr = this.infoArr;
        break;
      case 1:
        this.filterArr = this.filterArrOnKey("desktop");
        break;
      case 2:
        this.filterArr = this.filterArrOnKey("mobile");
        break;
      case 3:
        this.filterArr = this.filterArrOnKey("web");
        break;
      case 4:
        this.filterArr = this.filterArrOnKey("se");
        break;
      case 5:
        this.filterArr = this.filterArrOnKey("ds");
        break;
      case 6:
        this.filterArr = this.filterArrOnKey("gd");
        break;
      case 7:
        this.filterArr = this.filterArrOnKey("ecom");
        break;
      case 8:
        this.filterArr = this.filterArrOnKey("util");
        break;
    }
  }

  searchOnChange(e: any){
    this.filterArr = this.filter($("#searchProjInput").val())
    this.filterArr.length == 0 ?
      $(".noResultDiv").show():
      $(".noResultDiv").hide();
  }

  filter(query: any){
    let arr = this.infoArr;
    this.prevQuery = query;
    query = query.toLowerCase();
    if (!query || query == ""){
      return this.infoArr;
    }
    else{
      arr = this.infoArr.filter(function(info){
        if (info.title.toLowerCase().includes(query)){
          return info.title.toLowerCase().includes(query);
        }
        else if (info.date.toLowerCase().includes(query)){
          return info.date.toLowerCase().includes(query);
        }
        else if (info.lang.toLowerCase().includes(query)){
          return info.lang.toLowerCase().includes(query);
        }
        else{
          return info.type.toLowerCase().includes(query);
        }
      })
      return arr;
    }
  }
}
