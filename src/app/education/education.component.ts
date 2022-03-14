import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Education } from '../model/data/Education';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import { KEY_EDU, KEY_PROJECT_ACTIVE } from '../api/CacheKeys';
import { Router } from '../services/router.service';

@Component({
  selector: 'education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  public infoArr: Education[] = [];
  private cacheService: CacheService;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.cacheService = new CacheService(httpClient);
  }

  ngOnInit(): void {
    this.getCollection();
  }

  //Retrieve data from backend
  getCollection(){
    if (this.cacheService.exist(KEY_EDU)){
      this.infoArr = this.cacheService.get(KEY_EDU);
    }
    else{
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/edu')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.infoArr = data;
        this.cacheService.set(KEY_EDU, data);
      });
    }
  }

  //Caret on click
  eduBtnOnClick(e: any, id: any){
    e.preventDefault();
    if (!$(`#eduBtn${id}`).hasClass("activeEdu")){
      $(`#eduCont${id}`).fadeIn();
      $(`#eduBtn${id}`).addClass("activeEdu");
    }
    else{
      $(`#eduCont${id}`).fadeOut();
      $(`#eduBtn${id}`).removeClass("activeEdu");
    }
  }

  eduContCloseBtnOnClick(e: any, id: any){
    e.preventDefault();
    $(`#eduCont${id}`).fadeOut();
    $(`#eduBtn${id}`).removeClass("activeEdu");
  }

  eduLinkOnClick(e: any, id: any){
    this.cacheService.set(KEY_PROJECT_ACTIVE, id);
    this.router.routeTo("project");
  }
}
