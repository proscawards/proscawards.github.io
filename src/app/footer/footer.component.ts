import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";
import { CacheService } from '../services/cache.service';
import { KEY_STATE, KEY_VCOUNT, KEY_VCOUNTRY } from '../api/CacheKeys';
import { Router } from '../services/router.service';
import { Snackbar } from '../utils/Snackbar';
import { COUNTRY_FLAG_URL, ENDPOINT_COUNT, ENDPOINT_COUNTRY, ENDPOINT_UPDATE, SOCIAL_ACTION_DISCORD, SOCIAL_ACTION_DISCORD_CONT, SOCIAL_ACTION_GITHUB, SOCIAL_ACTION_GITHUB_CONT, SOCIAL_ACTION_INSTAGRAM, SOCIAL_ACTION_INSTAGRAM_CONT, SOCIAL_ACTION_LINKEDIN, SOCIAL_ACTION_LINKEDIN_CONT, SOCIAL_ACTION_RESUME, SOCIAL_ACTION_RESUME_CONT, SOCIAL_URL_DISCORD, SOCIAL_URL_GITHUB, SOCIAL_URL_INSTAGRAM, SOCIAL_URL_LINKEDIN } from '../api/ConstantInterface';

interface TopCountry{
  img?: string,
  count?: number
}

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit{

  private owlStr = "<img class='owls' src='assets/images/owls/owls_owl.svg'/><img class='owls' src='assets/images/owls/owls_lufie.svg'/><img class='owls' src='assets/images/owls/owls_guin.svg'/><img class='owls' id='phoenix' src='assets/images/owls/owls_owlhuang.svg'/><img class='owls' src='assets/images/owls/owls_flowl.svg'/>";
  public url: string = this.router.routeURL();
  private cacheService: CacheService;
  public totalCount: number = 0;
  public top1Country: TopCountry = {};
  public top2Country: TopCountry = {};
  public top3Country: TopCountry = {};


  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private httpClient: HttpClient,
    private router: Router,
    private snackbar: Snackbar
  ){
    this.cacheService = new CacheService(this.httpClient);
  }
  
  ngOnInit(){
    this.onDOMLoaded();
    this.logoBtnOnLoad();

    $("#linkedinFooter").on('click', () => {
      this.snackbar
      .setTitle(SOCIAL_ACTION_LINKEDIN)
      .setAction(SOCIAL_ACTION_LINKEDIN_CONT)
      .setUrl(SOCIAL_URL_LINKEDIN)
      .setType({isSocial: true})
      .execute();
    });
    $("#githubFooter").on('click', () => {
      this.snackbar
      .setTitle(SOCIAL_ACTION_GITHUB)
      .setAction(SOCIAL_ACTION_GITHUB_CONT)
      .setUrl(SOCIAL_URL_GITHUB)
      .setType({isSocial: true})
      .execute();
    });
    $("#instagramFooter").on('click', () => {
      this.snackbar
      .setTitle(SOCIAL_ACTION_INSTAGRAM)
      .setAction(SOCIAL_ACTION_INSTAGRAM_CONT)
      .setUrl(SOCIAL_URL_INSTAGRAM)
      .setType({isSocial: true})
      .execute();
    });
    $("#discordFooter").on('click', () => {
      this.snackbar
      .setTitle(SOCIAL_ACTION_DISCORD)
      .setAction(SOCIAL_ACTION_DISCORD_CONT)
      .setUrl(SOCIAL_URL_DISCORD)
      .setType({isSocial: true})
      .execute();
    });
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
        $("#logoFooterBtn").text("?????????");
        break; 
      case '4':
        $("#logoFooterBtn").text("?????????");
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
        $("#logoFooterBtn").text("?????????");
        this.cacheService.set(KEY_STATE, '3');
        break; 
      case '3':
        $("#logoFooterBtn").text("?????????");
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

  route(e: any, url: any, title?: string){
    this.router.routeTo(url, title);
  }

  footerDivlinkOnClick(e: any, elem: any){
    var pos: any = $(elem)?.parent()?.offset()?.top
    $('html, body').animate({scrollTop: pos},800);
  }

  //Download Resume
  downloadResume(e: any){
    e.preventDefault();
    this.snackbar
    .setTitle(SOCIAL_ACTION_RESUME)
    .setAction(SOCIAL_ACTION_RESUME_CONT)
    .setType({isResume: true})
    .execute();
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
      this.httpClient.get<any>(ENDPOINT_UPDATE).subscribe();
      this.httpClient.get<any>(ENDPOINT_COUNTRY)
      .subscribe(res => {
        this.cacheService.set(KEY_VCOUNTRY, res);
        this.setCountriesData(res);
      });
    }
  }

  //Display data of top countries
  setCountriesData(data: any){
    this.top1Country = {
      img: `${COUNTRY_FLAG_URL}${data[0][0]}.png`,
      count: data[0][1].count
    };
    this.top2Country = {
      img: `${COUNTRY_FLAG_URL}${data[1][0]}.png`,
      count: data[1][1].count
    };
    this.top3Country = {
      img: `${COUNTRY_FLAG_URL}${data[2][0]}.png`,
      count: data[2][1].count
    };
  }

  //Show total visitor
  getTotalVisitor(){
    if (this.cacheService.exist(KEY_VCOUNT)){
      this.totalCount = this.cacheService.get(KEY_VCOUNT);
    }
    else{
      this.httpClient.get<any>(ENDPOINT_COUNT)
      .subscribe(res => {
        this.cacheService.set(KEY_VCOUNT, res.count)
        this.totalCount = res.count;
      });
    }
  }
}
