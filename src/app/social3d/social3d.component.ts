import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'social3d',
  templateUrl: './social3d.component.html',
  styleUrls: ['./social3d.component.scss']
})
export class Social3dComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    $("#linkedin").on('click', function(){
      window.open("https://www.linkedin.com/in/proscawards/","_blank");
    });
    $("#github").on('click', function(){
      window.open("https://github.com/proscawards/","_blank");
    });
    $("#instagram").on('click', function(){
      window.open("https://instagram.com/proscawards","_blank");
    });
    $("#discord").on('click', function(){
      window.open("https://discord.com/users/346129656157831169/","_blank");
    });
    $("#resume").on('click', function(e: any){
      e.preventDefault();
      Swal.fire({
        text: `Do you want to download resume?`,
        confirmButtonText: "Download",
        showCancelButton: true
      }).then(result => {
        if (result.isConfirmed) {
          var hiddenElement = document.createElement('a');
          hiddenElement.href = "assets/files/proscawards_resume.pdf";
          hiddenElement.target = '_blank';
          hiddenElement.download = "proscawards_resume.pdf";
          hiddenElement.click();
          hiddenElement.remove();
        }
      });
    });
    $("#aboutme").on('click', () => {
      this.router.navigate(['/aboutme']);
    });
    $("#skill").on('click', () => {
      this.router.navigate(['/skill']);
    });
    $("#project").on('click', () => {
      this.router.navigate(['/projects']);
    });
    $("#cert").on('click', () => {
      this.router.navigate(['/certifications']);
    });
    $("#edu").on('click', () => {
      this.router.navigate(['/education']);
    });
    $("#exp").on('click', () => {
      this.router.navigate(['/experience']);
    });
    $("#contact").on('click', () => {
      this.router.navigate(['/contactme']);
    });
    $("#scrollTop3d").on('click', () => {
      $('html, body').animate({
        scrollTop: 0
        }, 800);
        return false;
    });
  }
}
