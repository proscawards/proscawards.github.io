import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";
import * as $ from "jquery";
import data from "./skill-chart.json";
import Chart from 'chart.js/auto';

interface Data{
  prefix: string,
  labels: string[],
  data: number[],
  color: string[],
  type: string
}

@Component({
  selector: 'skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})

export class SkillComponent implements OnInit {

  Data: Data[] = data;

  windowWidth: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit(){
    this.loadCharts()
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.windowWidth = window.innerWidth;
  }

  loadCharts(){
    let i: number = 0;
    for (i; i<this.Data.length;i++){
      let id: string = this.Data[i].prefix;
      const data: any = {
        labels: this.Data[i].labels,
        datasets: [{
          data: this.Data[i].data,
          backgroundColor: this.colorArrBuilder(this.Data[i].color, .8),
          borderColor: this.colorArrBuilder(this.Data[i].color, 1),
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
