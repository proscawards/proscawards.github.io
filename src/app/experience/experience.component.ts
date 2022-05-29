import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Experience } from '../model/data/Experience';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import { KEY_EXP, KEY_PROJECT_ACTIVE } from '../api/CacheKeys';
import { Router } from '../services/router.service';
import { GetExperienceList } from '../graphql/resolver/GetExperienceList.gql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Duration from '../utils/Duration';

@Component({
  selector: 'experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  private dataObserver!: Observable<Experience[]>;
  public infoArr: Experience[] = [];
  private cacheService: CacheService;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private getExperience: GetExperienceList
  ) {
    this.cacheService = new CacheService(this.httpClient);
  }

  ngOnInit(): void {
    this.dataObserver = this.getExperience.watch()
                    .valueChanges
                    .pipe(
                      map(result => result.data.getExpList)
                    );
    this.dataObserver.subscribe(data => {
      var tempData = [...data];
      this.infoArr = tempData.sort((a: any, b: any) => {return a.id - b.id});
    }); 
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
    return Duration(dateArr);
  }
}
