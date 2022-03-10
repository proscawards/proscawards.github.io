import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from "../services/window.service";
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/data/Project';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";

@Component({
  selector: 'project-other',
  templateUrl: './project-other.component.html',
  styleUrls: ['./project-other.component.scss']
})
export class ProjectOtherComponent implements OnInit {

  public infoArr: Project[] = [];
  readonly KEY_PROJECT = 'cache_project';
  readonly KEY_ACTIVE_PROJECT = 'cache_projectact';
  private cacheService: CacheService;

  constructor(
    private route: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private httpClient: HttpClient,
    private router: Router
  ){
    this.cacheService = new CacheService(httpClient);
  }

  ngOnInit(){
    $(".otherProjDiv").show();
    $(".compProjDiv").hide();
    this.validateParams();
    this.getCollection();
  }

  //Retrieve data from backend
  getCollection(){
    if (this.cacheService.exist(this.KEY_PROJECT)){
      this.infoArr = this.cacheService.get(this.KEY_PROJECT);
    }
    else{
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/project')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.infoArr = data;
        this.cacheService.set(this.KEY_PROJECT, data);
      });
    }
    $("#projLoading").fadeOut();
    $(".otherProjDiv").fadeIn();
  }

  //Redirect from education or experience
  validateParams(){
    let elem: any = this.route.snapshot.paramMap.get('elem');
    var pos: any = $(`#${elem}`)?.parent()?.offset()?.top;
    $('html, body').animate({scrollTop: pos-350},800);
    $(`#${elem}`).parent().addClass('hovered');
    // setTimeout(() => {
    //   $(`#${elem}`).parent().removeClass('hovered');
    //   this.window.history.replaceState('', '', '/project-all');
    // }, 2000);
  }

  //Show Modal when ProjectDiv is clicked
  projectDivOnClick(e: any, id: any){
    e.preventDefault();
    this.cacheService.set(this.KEY_ACTIVE_PROJECT, id);
    this.router.navigate([`project`]);
  }

}
