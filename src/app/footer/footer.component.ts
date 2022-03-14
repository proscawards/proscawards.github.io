import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";
import { CacheService } from '../services/cache.service';
import { KEY_STATE, KEY_VCOUNT, KEY_VCOUNTRY } from '../api/CacheKeys';
import { Router } from '../services/router.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit{

  private owlStr = "<img class='owls' src='assets/images/owls/owls_owl.svg'/><img class='owls' src='assets/images/owls/owls_lufie.svg'/><img class='owls' src='assets/images/owls/owls_guin.svg'/><img class='owls' id='phoenix' src='assets/images/owls/owls_owlhuang.svg'/><img class='owls' src='assets/images/owls/owls_flowl.svg'/>";
  public url: string = this.router.routeURL();
  private cacheService: CacheService;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private httpClient: HttpClient,
    private router: Router
  ){
    this.cacheService = new CacheService(httpClient);
  }
  
  ngOnInit(){
    this.onDOMLoaded();
    this.logoBtnOnLoad();
  }

  //Click event to scroll to top
  scrollTopOnClick(){
    $('html, body').animate({
    scrollTop: 0
    }, 800);
    return false;
  }

  logoBtnOnLoad(){
    switch (this.cacheService.exist(KEY_STATE) ? this.cacheService.get(KEY_STATE) : '0'){
      case '0':
        $("#logoFooterBtn").text("proscawards");
        break;
      case '1':
        $("#logoFooterBtn").text("SC Ong");
        break;
      case '2':
        $("#logoFooterBtn").text("Ong Shuoh Chwen");
        break; 
      case '3':
        $("#logoFooterBtn").text("王烁錞");
        break; 
      case '4':
        $("#logoFooterBtn").text("왕삭순");
        break;  
      case '5':
        $("#logoFooterBtn").html(this.owlStr);
        break; 
      default:
        $("#logoFooterBtn").text("proscawards");
        break;   
    }
  }

  logoBtnOnClick(){
    switch (this.cacheService.exist(KEY_STATE) ? this.cacheService.get(KEY_STATE) : '0'){
      case '0':
        $("#logoFooterBtn").text("SC ONG");
        this.cacheService.set(KEY_STATE, '1');
        break;
      case '1':
        $("#logoFooterBtn").text("Ong Shuoh Chwen");
        this.cacheService.set(KEY_STATE, '2');
        break;
      case '2':
        $("#logoFooterBtn").text("王烁錞");
        this.cacheService.set(KEY_STATE, '3');
        break; 
      case '3':
        $("#logoFooterBtn").text("왕삭순");
        this.cacheService.set(KEY_STATE, '4');
        break;  
      case '4':
        $("#logoFooterBtn").html(this.owlStr);
        this.cacheService.set(KEY_STATE, '5');
        break; 
      case '5':
        $("#logoFooterBtn").text("proscawards");
        this.cacheService.set(KEY_STATE, '0');
        break; 
      default:
        $("#logoFooterBtn").text("proscawards");
        this.cacheService.set(KEY_STATE, '0');
        break;   
    }
  }

  route(e: any, url: any){
    this.router.routeTo(url);
  }

  footerDivlinkOnClick(e: any, elem: any){
    var pos: any = $(elem)?.parent()?.offset()?.top
    $('html, body').animate({scrollTop: pos},800);
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

  //On document load
  onDOMLoaded(){
    this.getTopCountries();
    this.getTotalVisitor();
  }

  //Show top 3 countries' visitor
  getTopCountries(){
    if (this.cacheService.exist(KEY_VCOUNTRY)){
      this.setCountriesData(this.cacheService.get(KEY_VCOUNTRY));
    }
    else{
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/').subscribe();
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/country')
      .subscribe(res => {
        this.cacheService.set(KEY_VCOUNTRY, res);
        this.setCountriesData(res);
      });
    }
  }

  //Display data of top countries
  setCountriesData(data: any){
    $("#top1CountryImg").attr("src", "https://flagpedia.net/data/flags/normal/"+data[0][0]+".png");
    $("#top1CountryCount").text(data[0][1].count);
    $("#top2CountryImg").attr("src", "https://flagpedia.net/data/flags/normal/"+data[1][0]+".png");
    $("#top2CountryCount").text(data[1][1].count);
    $("#top3CountryImg").attr("src", "https://flagpedia.net/data/flags/normal/"+data[2][0]+".png");
    $("#top3CountryCount").text(data[2][1].count);
  }

  //Show total visitor
  getTotalVisitor(){
    if (this.cacheService.exist(KEY_VCOUNT)){
      $("#totalVisitor").text(this.cacheService.get(KEY_VCOUNT));
    }
    else{
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/count')
      .subscribe(res => {
        this.cacheService.set(KEY_VCOUNT, res.count)
        $("#totalVisitor").text(res.count);
      });
    }
  }
}
