import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
    var pos: any = $(elem)?.parent()?.offset()?.top
    $('html, body').animate({scrollTop: pos-350},'slow');
    $(elem).parent().addClass('hovered');
    setTimeout(() => {
      $(elem).parent().removeClass('hovered');
    }, 2000);
  }

}
