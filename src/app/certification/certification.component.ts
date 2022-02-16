import { Component, OnInit, Inject, HostListener } from '@angular/core';
import info from "./certification-info.json";
import * as $ from "jquery";
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";

interface cert{
  name: string,
  date: string
}

interface org{
  name: string,
  thumbnail: string
}

interface cred{
  id: string,
  url: string
}

interface Info{
  cert: cert,
  org: org,
  uni: org,
  cred: cred,
  hasUni: boolean,
  tag: string[]
}

@Component({
  selector: 'certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {

  Info: Info[] = info;
  private original = this.Info;
  public infoArr = this.Info;
  public prevQuery: string = "";
  private isError: boolean = false;
  private hasActiveTag: boolean = false;
  public page: number = 1;
  public pageSize: number = 6;
  public collectionSize: number = 0;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.pageSizeOnChange(this.pageSize);
  }

  ngOnInit(): void {
    $(".noResultDiv").hide();
    $(".searchCertBtn").attr('disabled', 'true');
  }

  @HostListener('document:click', ['$event'])
  domOnClick(e: any){
    this.isSearching();
    //Weird bug, need to reinitialize again
    this.isSearching();
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
  }

  //Set display item per page
  pageSizeOnChange(size: number){
    this.pageSize = size;
    let remainder = this.infoArr.length % size;
    let colSize = this.infoArr.length / size;
    this.collectionSize = Math.ceil(Math.round(remainder > 2 || remainder == 0 ? colSize : colSize + 1)*10);
  }
}
