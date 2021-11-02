import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import info from "./project-other-info.json";

interface Info{
  title: String,
  lang: String,
  desc: String,
  date: String,
  icon: String
}

@Component({
  selector: 'project-other',
  templateUrl: './project-other.component.html',
  styleUrls: ['./project-other.component.scss']
})
export class ProjectOtherComponent implements OnInit {

  Info: Info[] = info;

  constructor(){
    console.log(this.Info)
  }

  ngOnInit(){
    $(".otherProjDiv").show();
    $(".compProjDiv").hide();
  }

  //Show Modal when ProjectDiv is clicked
  projectDivOnClick(e: any, id: any, isDisabled: any){
    e.preventDefault();
    if (!isDisabled){
      Swal.fire({
        heightAuto: false,
        showCloseButton: true,
        showConfirmButton:false,
        imageUrl: $("#projectDiv"+id).data('img'),
        text: $("#projectDiv"+id).data('name')
      });
    }
  }

  //Show Modal when ProjectDivInfoBtn is clicked
  infoBtnOnClicked(e: any, id: any){
    e.preventDefault();
    Swal.fire({
      showCloseButton: true,
      showConfirmButton:false,
      title: ""+this.Info[id].title,
      html: 
        "<span>"+this.Info[id].icon+"</span><br/>"+
        "<span style='font-size: 15px;'>("+this.Info[id].date+")</span><br/>"+
        "<div style='text-align: left;'><span style='font-size: 15px;'>"+
        "<br/><span style='font-weight: bold; text-decoration: underline;'>Written in</span><br/>"+
        this.Info[id].lang+
        "<br/><span style='font-weight: bold; text-decoration: underline;'>Functionality</span><br/>"+
        this.Info[id].desc+
        "</span></div>"
    });
  }

}
