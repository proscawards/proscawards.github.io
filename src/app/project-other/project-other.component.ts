import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'project-other',
  templateUrl: './project-other.component.html',
  styleUrls: ['./project-other.component.scss']
})
export class ProjectOtherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
