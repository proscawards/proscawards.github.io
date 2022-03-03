import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import Selected3DName from '../services/name3dsel.service';

@Component({
  selector: 'social3d',
  templateUrl: './social3d.component.html',
  styleUrls: ['./social3d.component.scss']
})
export class Social3dComponent implements OnInit {

  private cacheService: CacheService;
  private selected3dName: Selected3DName;
  readonly KEY_STATE = 'cache_state';
  private owlStr = "<img class='owls' src='assets/images/owls/owls_owl.svg'/><img class='owls' src='assets/images/owls/owls_lufie.svg'/><img class='owls' src='assets/images/owls/owls_guin.svg'/><img class='owls' id='phoenix' src='assets/images/owls/owls_owlhuang.svg'/><img class='owls' src='assets/images/owls/owls_flowl.svg'/>";

  constructor(
      private router: Router,
      private httpClient: HttpClient
  ){
      this.cacheService = new CacheService(httpClient);
      this.selected3dName = new Selected3DName();
  }

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
    $("#name_en").on('click', () => {
      this.selected3dName.setActive("name_en", "proscawards");
      this.cacheService.set(this.KEY_STATE, '1');
    });
    $("#name_scong").on('click', () => {
      this.selected3dName.setActive("name_scong", "SC Ong");
      this.cacheService.set(this.KEY_STATE, '2');
    });
    $("#name_osc").on('click', () => {
      this.selected3dName.setActive("name_osc", "Ong Shuoh Chwen");
      this.cacheService.set(this.KEY_STATE, '3');
    });
    $("#name_cn").on('click', () => {
      this.selected3dName.setActive("name_cn", "王烁錞");
      this.cacheService.set(this.KEY_STATE, '4');
    });
    $("#name_kr").on('click', () => {
      this.selected3dName.setActive("name_kr", "왕삭순");
      this.cacheService.set(this.KEY_STATE, '5');
    });
    $("#name_owl").on('click', () => {
      this.selected3dName.setActive("name_owl", this.owlStr);
      this.cacheService.set(this.KEY_STATE, '0');
    });
  }
}
