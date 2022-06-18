import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Education } from '../model/data/Education';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import { KEY_EDU, KEY_PROJECT_ACTIVE, KEY_TITLE } from '../api/CacheKeys';
import { Router } from '../services/router.service';
import { Apollo } from 'apollo-angular';
import { GetEducationList } from '../graphql/resolver/GetEducationList.gql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Duration from '../utils/Duration';
import { WINDOW_TITLE_EDUCATION } from '../api/ConstantInterface';

@Component({
  selector: 'education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  private dataObserver!: Observable<Education[]>;
  public infoArr: Education[] = [];
  private cacheService: CacheService;
  public isCompleted: boolean = false;
  public title: string;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private getEducation: GetEducationList
  ) {
    this.cacheService = new CacheService(this.httpClient);
    this.title = WINDOW_TITLE_EDUCATION;
  }

  ngOnInit(): void {
    this.title = WINDOW_TITLE_EDUCATION;
    this.cacheService.set(KEY_TITLE, this.title);
    this.dataObserver = this.getEducation.watch()
                    .valueChanges
                    .pipe(
                      map(result => result.data.getEduList)
                    );
    this.dataObserver.subscribe(data => {
      var tempData = [...data];
      this.infoArr = tempData.sort((a: any, b: any) => {return a.id - b.id});
      this.isCompleted = true;
    }); 
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

  durationEdu(dateArr: string){
    return Duration(dateArr);
  }
}
