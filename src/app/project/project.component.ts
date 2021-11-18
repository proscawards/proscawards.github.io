import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  constructor() { }

  //Project 1 Read More in Mobile
  proj1ReadMore(e: any){
    e.preventDefault();
    $("#proj1ReadMore").hide();
    $("#proj1Txt").show();
    $("#proj1ReadLess").show();
  }

  //Project 2 Read More in Mobile
  proj2ReadMore(e: any){
    e.preventDefault();
    $("#proj2ReadMore").hide();
    $("#proj2Txt").show();
    $("#proj2ReadLess").show();
  }

  //Project 1 Read Less in Mobile
  proj1ReadLess(e: any){
    e.preventDefault();
    $("#proj1ReadLess").hide();
    $("#proj1Txt").hide();
    $("#proj1ReadMore").show();
  }

  //Project 2 Read Less in Mobile
  proj2ReadLess(e: any){
    e.preventDefault();
    $("#proj2ReadLess").hide();
    $("#proj2Txt").hide();
    $("#proj2ReadMore").show();
  }

  //Download zip for windows version
  downloadPC(e: any){
    var hiddenElement = document.createElement('a');
    hiddenElement.href = "https://drive.google.com/u/0/uc?export=download&confirm=cAHr&id=1Y4L4pfdXhG0GHVAwBlHGy5jYBtivDIcw";
    hiddenElement.target = '_blank';
    hiddenElement.download = "ChemistLab3D.zip";
    hiddenElement.click();
    hiddenElement.remove();
  }
}
