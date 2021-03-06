import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { TypeWriterComponent } from './intro.typewriter.component';
import { CacheService } from '../services/cache.service';
import { HttpClient } from '@angular/common/http';
import Selected3DName from '../services/name3dsel.service';
import { KEY_STATE } from '../api/CacheKeys';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  private owlStr = "<img class='owls' src='assets/images/owls/owls_owl.svg'/><img class='owls' src='assets/images/owls/owls_lufie.svg'/><img class='owls' src='assets/images/owls/owls_guin.svg'/><img class='owls' id='phoenix' src='assets/images/owls/owls_owlhuang.svg'/><img class='owls' src='assets/images/owls/owls_flowl.svg'/>";
  private cacheService: CacheService;
  private selected3dName: Selected3DName;

  constructor(
    private httpClient: HttpClient
  ){
    this.cacheService = new CacheService(this.httpClient);
    this.selected3dName = new Selected3DName();
  }

  ngOnInit(): void {
    this.logoBtnOnLoad();
  }

  logoBtnOnLoad(){
    switch (this.cacheService.exist(KEY_STATE) ? this.cacheService.get(KEY_STATE) : '0'){
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
    switch (this.cacheService.exist(KEY_STATE) ? this.cacheService.get(KEY_STATE) : '0'){
      case '0':
        this.cacheService.set(KEY_STATE, '1');
        this.selected3dName.setActive('name_scong', "SC ONG");
        break;
      case '1':
        this.cacheService.set(KEY_STATE, '2');
        this.selected3dName.setActive('name_osc', "Ong Shuoh Chwen");
        break;
      case '2':
        this.cacheService.set(KEY_STATE, '3');
        this.selected3dName.setActive('name_cn', "王烁錞");
        break; 
      case '3':
        this.cacheService.set(KEY_STATE, '4');
        this.selected3dName.setActive('name_kr', "왕삭순");
        break;  
      case '4':
        this.cacheService.set(KEY_STATE, '5');
        this.selected3dName.setActive('name_owl', this.owlStr);
        break; 
      case '5':
        this.cacheService.set(KEY_STATE, '0');
        this.selected3dName.setActive('name_en', "proscawards");
        break; 
      default:
        this.cacheService.set(KEY_STATE, '0');
        this.selected3dName.setActive('name_en', "proscawards");
        break;   
    }
  }
}
