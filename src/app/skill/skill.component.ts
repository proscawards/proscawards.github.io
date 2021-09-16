import { Component, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent{

  windowWidth: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.windowWidth = window.innerWidth;
  }

  mobileSkillOnClick(name: any, img: any){
    if (this.windowWidth <= 768){
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        html: "<img style='width: 50px;' src='"+img+"'/>"+" "+name
      })
    }
  }

}
