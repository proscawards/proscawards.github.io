import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { TypeWriterComponent } from './intro.typewriter.component';
import { CacheService } from '../services/cache.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent extends TypeWriterComponent implements OnInit {

  private owlStr = "<img class='owls' src='assets/images/owls/owls_owl.svg'/><img class='owls' src='assets/images/owls/owls_lufie.svg'/><img class='owls' src='assets/images/owls/owls_guin.svg'/><img class='owls' id='phoenix' src='assets/images/owls/owls_owlhuang.svg'/><img class='owls' src='assets/images/owls/owls_flowl.svg'/>";
  readonly KEY_ISTATE = 'cache_istate';
  private cacheService: CacheService;

  constructor(
    private httpClient: HttpClient
  ){
    super();
    this.cacheService = new CacheService(httpClient);
  }

  ngOnInit(): void {
    this.logoBtnOnLoad();
  }

  logoBtnOnLoad(){
    switch (this.cacheService.exist(this.KEY_ISTATE) ? this.cacheService.get(this.KEY_ISTATE) : '0'){
      case '0':
        $("#changeFontBtn").text("proscawards");
        break;
      case '1':
        $("#changeFontBtn").text("SC Ong");
        break;
      case '2':
        $("#changeFontBtn").text("Ong Shuoh Chwen");
        break; 
      case '3':
        $("#changeFontBtn").text("王烁錞");
        break; 
      case '4':
        $("#changeFontBtn").text("왕삭순");
        break;  
      case '5':
        $("#changeFontBtn").html(this.owlStr);
        break; 
      default:
        $("#changeFontBtn").text("proscawards");
        break;   
    }
  }

  logoBtnOnClick(){
    switch (this.cacheService.exist(this.KEY_ISTATE) ? this.cacheService.get(this.KEY_ISTATE) : '0'){
      case '0':
        $("#changeFontBtn").text("SC ONG");
        this.cacheService.set(this.KEY_ISTATE, '1');
        break;
      case '1':
        $("#changeFontBtn").text("Ong Shuoh Chwen");
        this.cacheService.set(this.KEY_ISTATE, '2');
        break;
      case '2':
        $("#changeFontBtn").text("王烁錞");
        this.cacheService.set(this.KEY_ISTATE, '3');
        break; 
      case '3':
        $("#changeFontBtn").text("왕삭순");
        this.cacheService.set(this.KEY_ISTATE, '4');
        break;  
      case '4':
        $("#changeFontBtn").html(this.owlStr);
        this.cacheService.set(this.KEY_ISTATE, '5');
        break; 
      case '5':
        $("#changeFontBtn").text("proscawards");
        this.cacheService.set(this.KEY_ISTATE, '0');
        break; 
      default:
        $("#changeFontBtn").text("proscawards");
        this.cacheService.set(this.KEY_ISTATE, '0');
        break;   
    }
  }

  //Download Resume
  downloadResume(e: any){
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
  }
}
