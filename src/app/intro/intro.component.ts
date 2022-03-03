import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { TypeWriterComponent } from './intro.typewriter.component';
import { CacheService } from '../services/cache.service';
import { HttpClient } from '@angular/common/http';
import Selected3DName from '../services/name3dsel.service';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent extends TypeWriterComponent implements OnInit {

  private owlStr = "<img class='owls' src='assets/images/owls/owls_owl.svg'/><img class='owls' src='assets/images/owls/owls_lufie.svg'/><img class='owls' src='assets/images/owls/owls_guin.svg'/><img class='owls' id='phoenix' src='assets/images/owls/owls_owlhuang.svg'/><img class='owls' src='assets/images/owls/owls_flowl.svg'/>";
  readonly KEY_STATE = 'cache_state';
  private cacheService: CacheService;
  private selected3dName: Selected3DName;

  constructor(
    private httpClient: HttpClient
  ){
    super();
    this.cacheService = new CacheService(httpClient);
    this.selected3dName = new Selected3DName();
  }

  ngOnInit(): void {
    this.logoBtnOnLoad();
  }

  logoBtnOnLoad(){
    switch (this.cacheService.exist(this.KEY_STATE) ? this.cacheService.get(this.KEY_STATE) : '0'){
      case '0':
        this.selected3dName.setActive('name_en', "proscawards");
        break;
      case '1':
        this.selected3dName.setActive('name_scong', "SC Ong");
        break;
      case '2':
        this.selected3dName.setActive('name_osc', "Ong Shuoh Chwen");
        break; 
      case '3':
        this.selected3dName.setActive('name_cn', "王烁錞");
        break; 
      case '4':
        this.selected3dName.setActive('name_kr', "왕삭순");
        break;  
      case '5':
        this.selected3dName.setActive('name_owl', this.owlStr);
        break; 
      default:
        this.selected3dName.setActive('name_en', "proscawards");
        break;   
    }
  }

  logoBtnOnClick(){
    switch (this.cacheService.exist(this.KEY_STATE) ? this.cacheService.get(this.KEY_STATE) : '0'){
      case '0':
        this.cacheService.set(this.KEY_STATE, '1');
        this.selected3dName.setActive('name_scong', "SC ONG");
        break;
      case '1':
        this.cacheService.set(this.KEY_STATE, '2');
        this.selected3dName.setActive('name_osc', "Ong Shuoh Chwen");
        break;
      case '2':
        this.cacheService.set(this.KEY_STATE, '3');
        this.selected3dName.setActive('name_cn', "王烁錞");
        break; 
      case '3':
        this.cacheService.set(this.KEY_STATE, '4');
        this.selected3dName.setActive('name_kr', "왕삭순");
        break;  
      case '4':
        this.cacheService.set(this.KEY_STATE, '5');
        this.selected3dName.setActive('name_owl', this.owlStr);
        break; 
      case '5':
        this.cacheService.set(this.KEY_STATE, '0');
        this.selected3dName.setActive('name_en', "proscawards");
        break; 
      default:
        this.cacheService.set(this.KEY_STATE, '0');
        this.selected3dName.setActive('name_en', "proscawards");
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
