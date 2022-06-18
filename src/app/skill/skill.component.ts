import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";
import * as $ from "jquery";
import data from "./skill-chart.json";
import Chart from 'chart.js/auto';
import { CacheService } from '../services/cache.service';
import { HttpClient } from '@angular/common/http';
import { KEY_TITLE } from '../api/CacheKeys';
import { Skill } from '../model/data/Skill';
import { Observable } from 'rxjs';
import { GetSkillList } from '../graphql/resolver/GetSkillList.gql';
import { map } from 'rxjs/operators';
import { WINDOW_TITLE_SKILL } from '../api/ConstantInterface';

@Component({
  selector: 'skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})

export class SkillComponent implements OnInit {

  private dataObserver!: Observable<Skill[]>;
  private infoArr: Skill[] = [];
  public title: string;
  windowWidth: any;
  public isCompleted: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private cacheService: CacheService,
    private httpClient: HttpClient,
    private getSkill: GetSkillList
  ) { 
    this.cacheService = new CacheService(this.httpClient);
    this.title = WINDOW_TITLE_SKILL;
  }

  ngOnInit(){
    $(".skillCard").hide();
    this.dataObserver = this.getSkill.watch()
                        .valueChanges
                        .pipe(
                          map(result => result.data.getSkillList)
                        );
    this.dataObserver.subscribe(data => {
      var tempData = [...data];
      this.infoArr = tempData.sort((a: any, b: any) => {return a.id - b.id});
      this.title = WINDOW_TITLE_SKILL;
      this.cacheService.set(KEY_TITLE, this.title);
      this.loadCharts();
      $(".skillCard").fadeIn();
      this.isCompleted = true;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.windowWidth = window.innerWidth;
  }

  loadCharts(){
    let i: number = 0;
    for (i; i<this.infoArr.length;i++){
      let id: string = this.infoArr[i].prefix;
      const data: any = {
        labels: this.infoArr[i].labels,
        datasets: [{
          data: this.infoArr[i].data,
          backgroundColor: this.colorArrBuilder(this.infoArr[i].color, .8),
          borderColor: this.colorArrBuilder(this.infoArr[i].color, 1),
        }]
      };
      const config: any = {
        type: 'doughnut',
        data: data,
        options: {
          plugins: {
              legend: {
                  display: true,
                  position: 'bottom',
                  align: 'start'
              }
          }
        }
      };
      let elem: any = document.getElementById(`${id}Chart`);
      new Chart(elem, config);
    }
  }

  colorArrBuilder(arr: string[], alpha: any){
    let newArr: string[] = [];
    for (let i=0;i<arr.length;i++){
      newArr.push(`${arr[i]},${alpha})`)
    }
    return newArr;
  }

  //Caret on click
  skillBtnOnClick(e: any, id: any){
    e.preventDefault();
    if (!$(`#skillBtn${id}`).hasClass("activeSkill")){
      $(`#skillCont${id}`).fadeIn();
      $(`#skillBtn${id}`).addClass("activeSkill");
    }
    else{
      $(`#skillCont${id}`).fadeOut();
      $(`#skillBtn${id}`).removeClass("activeSkill");
    }
  }

}
