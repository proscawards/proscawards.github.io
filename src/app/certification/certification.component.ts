import { Component, OnInit, Inject, HostListener } from '@angular/core';
//import info from "./certification-info.json";
import * as $ from "jquery";
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";
import { HttpClient } from '@angular/common/http';
import { Certification } from '../model/data/Certification';
import { CacheService } from '../services/cache.service';
import { parse } from 'date-fns';
import { KEY_CERT, KEY_SEARCH_ACTIVE } from '../api/CacheKeys';
import { Router } from '../services/router.service';

@Component({
  selector: 'certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {

  private original: Certification[] = [];
  public infoArr: Certification[] = [];
  public prevQuery: string = "";
  private isError: boolean = false;
  private hasActiveTag: boolean = false;
  public page: number = 1;
  public pageSize: number = 6;
  public collectionSize: number = 0;
  private cacheService: CacheService;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.cacheService = new CacheService(this.httpClient);
  }

  ngOnInit(): void {
    $(".noResultDiv, .ngPaginationDiv").hide();
    $(".searchCertBtn").attr('disabled', 'true');
    this.getCollection();
  }

  //Retrieve data from backend
  getCollection(){
    if (this.cacheService.exist(KEY_CERT)){
      this.original = this.infoArr = this.cacheService.get(KEY_CERT);
    }
    else{
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/cert')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {
          let da: any = parse(a.cert.date, "MMMM yyyy", new Date());
          let db: any = parse(b.cert.date, "MMMM yyyy", new Date());
          return da - db;
        });
        this.original = this.infoArr = data;
        this.cacheService.set(KEY_CERT, data)
      });
    }
    $("#certLoading").fadeOut();
    $(".certDiv").fadeIn();
    $(".ngPaginationDiv").fadeIn();
    this.pageSizeOnChange(this.pageSize);
  }

  @HostListener('document:click', ['$event'])
  domOnClick(e: any){
    this.isSearching();
    //Weird bug, need to reinitialize again
    this.isSearching();
    if (e.target.className.includes("paginationDropdownBtn") || 
        e.target.className.includes("page-link") ||
        e.target.className.includes("page-item") ||
        e.target.className.includes("certTagCode")
    ){
      window.scroll(0,0);
    }
  }

  //Search is now active
  searchOnClick(e: any){
    this.isSearching();
  }

  isSearching(){
    $("#searchInput").val("");
    if (this.isError){
      this.infoArr = this.filter("")
      this.infoArr.length == 0 ?
      $(".noResultDiv").show():
      $(".noResultDiv").hide();
    }
    if ($(".searchCertBtn").hasClass("activeSearch")){
      $(".searchCertBtn").removeClass("isSearching");
      $(".searchCertBtn").removeClass("activeSearch");
      $("#certTitle").removeClass("hideTitle");
      $(".searchCertBtn").html('<i class="fas fa-search"></i>');
    }
    else{
      $(".searchCertBtn").addClass("isSearching");
      $(".searchCertBtn").addClass("activeSearch");
      $("#certTitle").addClass("hideTitle");
      $(".searchCertBtn").html('<i class="fas fa-times-circle"></i>');
      if (this.prevQuery){$("#searchInput").val(this.prevQuery)}
    }
    this.pageSizeOnChange(this.pageSize);
  }

  searchOnFocus(e: any){
    this.isSearching();
  }

  searchOnFocusOut(e: any){
    this.isSearching();
  }

  searchOnChange(e: any){
    this.infoArr = this.filter($("#searchInput").val())
    this.infoArr.length == 0 ?
      $(".noResultDiv").show():
      $(".noResultDiv").hide();
    this.pageSizeOnChange(this.pageSize);
  }

  filter(query: any){
    let arr = this.original;
    this.prevQuery = query;
    query = query.toLowerCase();
    if (!query || query == ""){
      this.isError = true;
      return this.original;
    }
    else{
      this.isError = false;
      arr = this.original.filter(function(info){
        if (info.cert.name.toLowerCase().includes(query)){
          return info.cert.name.toLowerCase().includes(query);
        }
        else if (info.org.name.toLowerCase().includes(query)){
          return info.org.name.toLowerCase().includes(query);
        }
        else if (info.uni.name.toLowerCase().includes(query)){
          return info.uni.name.toLowerCase().includes(query);
        }
        else if (info.cert.date.toLowerCase().includes(query)){
          return info.cert.date.toLowerCase().includes(query);
        }
        else{
          let tags = info.tag.map( tag => { return tag.toLowerCase()});
          return tags.findIndex(tag => { return tag.includes(query)}) !== -1 ? true : false
        }
      })
      return arr;
    }
  }

  //Copy tag to searchInput
  copyTag(e: any, tag: string){
    $(".certTagCode").removeClass("activeTag");
    if (!this.hasActiveTag){
      $("#searchInput").val(tag);
      this.hasActiveTag = true;
    }
    else{
      $("#searchInput").val("");
      this.hasActiveTag = false;
    }
    this.searchOnChange(e);
    setTimeout(() => {
      let arrList = $(".certTagCode")
      arrList.map((i: any, el: any) => {
        if (el.innerText == tag){
          el.classList.add("activeTag");
        }
      })
      if (!this.hasActiveTag){$(".certTagCode").removeClass("activeTag");}
    }, 100);
    this.pageSizeOnChange(this.pageSize);
  }

  //Set display item per page
  pageSizeOnChange(size: number){
    this.pageSize = size;
    let remainder = this.infoArr.length % size;
    let colSize = this.infoArr.length / size;
    this.collectionSize = Math.ceil(Math.round(remainder > 2 || remainder == 0 ? colSize : colSize + 1)*10);
  }
}
