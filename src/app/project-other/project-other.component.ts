import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from "../services/window.service";
import { HttpClient } from '@angular/common/http';

interface progImg{
  name: string,
  img: string
}

interface Info{
  id: number,
  title: string,
  type: string,
  lang: string,
  desc: string,
  date: string,
  icon: string,
  source: string,
  img: string,
  isWIP: boolean,
  progImg: progImg[]
}

@Component({
  selector: 'project-other',
  templateUrl: './project-other.component.html',
  styleUrls: ['./project-other.component.scss']
})
export class ProjectOtherComponent implements OnInit {

  public infoArr: Info[] = [];

  constructor(
    private route: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private httpClient: HttpClient
  ){
  }

  ngOnInit(){
    $(".otherProjDiv").show();
    $(".compProjDiv").hide();
    this.validateParams();
    this.getCollection();
  }

  //Retrieve data from backend
  getCollection(){
    this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/project')
    .subscribe(res => {
      this.infoArr = res;
      $("#projLoading").fadeOut();
      $(".otherProjDiv").fadeIn();
    });
  }

  //Redirect from education or experience
  validateParams(){
    let elem: any = this.route.snapshot.paramMap.get('elem');
    var pos: any = $(`#${elem}`)?.parent()?.offset()?.top;
    $('html, body').animate({scrollTop: pos-350},800);
    $(`#${elem}`).parent().addClass('hovered');
    setTimeout(() => {
      $(`#${elem}`).parent().removeClass('hovered');
      this.window.history.replaceState('', '', '/projects');
    }, 2000);
  }

  //Show Modal when ProjectDiv is clicked
  projectDivOnClick(e: any, img: any, name: any, isDisabled: any){
    e.preventDefault();
    if (!isDisabled){
      Swal.fire({
        heightAuto: false,
        showCloseButton: true,
        showConfirmButton:false,
        imageUrl: img,
        text: name
      });
    }
  }

  //Show Modal when ProjectDivInfoBtn is clicked
  infoBtnOnClicked(e: any, id: any){
    e.preventDefault();
    Swal.fire({
      showCloseButton: true,
      showConfirmButton:false,
      title: ""+this.infoArr[id].title,
      html: 
        "<span>"+this.infoArr[id].icon+"</span><br/>"+
        "<span style='font-size: 15px;'>("+this.infoArr[id].date+")</span><br/>"+
        "<div style='text-align: left;'><span style='font-size: 15px;'>"+
        "<br/><span style='font-weight: bold; text-decoration: underline;'>Written in</span><br/>"+
        this.infoArr[id].lang+
        "<br/><span style='font-weight: bold; text-decoration: underline;'>Functionality</span><br/>"+
        this.infoArr[id].desc+
        "</span></div>"
    });
  }

  //Open github source codes
  sourceBtnOnClicked(e: any, id: any){
    e.preventDefault();
    let source: string = this.infoArr[id].source;
    window.open(source, '_blank');
  }

}
