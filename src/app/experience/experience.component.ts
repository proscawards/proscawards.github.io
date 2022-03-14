import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Experience } from '../model/data/Experience';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import { KEY_EXP, KEY_PROJECT_ACTIVE } from '../api/CacheKeys';
import { differenceInCalendarMonths, parse } from 'date-fns';
import { Router } from '../services/router.service';

@Component({
  selector: 'experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  public infoArr: Experience[] = [];
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
    if (this.cacheService.exist(KEY_EXP)){
      this.infoArr = this.cacheService.get(KEY_EXP);
    }
    else{
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/exp')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.infoArr = data;
        this.cacheService.set(KEY_EXP, data);
      });
    }
  }

  //Caret on click
  expBtnOnClick(e: any, id: any){
    e.preventDefault();
    if (!$(`#expBtn${id}`).hasClass("activeExp")){
      $(`#expCont${id}`).fadeIn();
      $(`#expBtn${id}`).addClass("activeExp");
    }
    else{
      $(`#expCont${id}`).fadeOut();
      $(`#expBtn${id}`).removeClass("activeExp");
    }
  }

  expContCloseBtnOnClick(e: any, id: any){
    $(`#expCont${id}`).fadeOut();
    $(`#expBtn${id}`).removeClass("activeExp");
  }

  expLinkOnClick(e: any, id: any){
    this.cacheService.set(KEY_PROJECT_ACTIVE, id);
    this.router.routeTo("project");
  }

  expSamePageOnClick(e: any, elem: any){
    var pos: any = $(elem)?.parent()?.offset()?.top;
    $('html, body').animate({scrollTop: pos-350},800);
    $(elem).parent().addClass('hovered');
    setTimeout(() => {
      $(elem).parent().removeClass('hovered');
    }, 2000);
  }

  //Calculate the duration of experience
  durationExp(dateArr: string){
    let arr: string[] = dateArr.replace('(', "").replace(')', "").split(" - ");
    let start: any = parse(arr[0], 'LLLL yyyy', new Date());
    let end: any = new Date();
    if (arr[1] != "PRESENT"){
      end = parse(arr[1], 'LLLL yyyy', new Date());
    }
    let diff: number = differenceInCalendarMonths(end, start);
    let year: number = Math.floor(Math.round(diff/12));
    let month: number = diff%12;
    return `${year != 0 ? year : ''} ${year == 1 ? 'year' : year == 0 ? '' : 'years'} ${month != 0 ? month : ''} ${month == 1 ? 'month' : 'months'}`
  }
}
