import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Education } from '../model/data/Education';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import { KEY_EDU, KEY_PROJECT_ACTIVE } from '../api/CacheKeys';
import { Router } from '../services/router.service';
import { Apollo } from 'apollo-angular';
import { GetEducation } from '../graphql/resolver/GetEducation.gql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  private dataObserver!: Observable<Education[]>;
  public infoArr: Education[] = [];
  private cacheService: CacheService;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private getEducation: GetEducation
  ) {
    this.cacheService = new CacheService(this.httpClient);
  }

  ngOnInit(): void {
    this.dataObserver = this.getEducation.watch()
                    .valueChanges
                    .pipe(
                      map(result => result.data.getEduList)
                    );
    this.dataObserver.subscribe(data => {
      var tempData = [...data];
      this.infoArr = tempData.sort((a: any, b: any) => {return a.id - b.id});
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
}
