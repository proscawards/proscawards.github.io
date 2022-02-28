import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { Education } from '../model/data/Education';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
const cs = new CacheService();

@Component({
  selector: 'education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  public infoArr: Education[] = [];
  readonly KEY_PROJECT = 'cache_edu';

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getCollection();
  }

  //Retrieve data from backend
  getCollection(){
    if (cs.exist(this.KEY_PROJECT)){
      this.infoArr = cs.get(this.KEY_PROJECT);
    }
    else{
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/edu')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.infoArr = data;
        cs.set(this.KEY_PROJECT, data);
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

  eduLinkOnClick(e: any, elem: any){
    this.router.navigate([`/projects/${elem}`], {replaceUrl: true});
  }
}
