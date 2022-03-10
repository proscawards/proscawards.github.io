import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { Experience } from '../model/data/Experience';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import { KEY_EXP } from '../api/CacheKeys';

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

  expLinkOnClick(e: any, elem: any){
    this.router.navigate([`/project-all/${elem}`], {replaceUrl: true});
  }

  expSamePageOnClick(e: any, elem: any){
    var pos: any = $(elem)?.parent()?.offset()?.top;
    $('html, body').animate({scrollTop: pos-350},800);
    $(elem).parent().addClass('hovered');
    setTimeout(() => {
      $(elem).parent().removeClass('hovered');
    }, 2000);
  }

}
