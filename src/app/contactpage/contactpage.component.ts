import { Component, OnInit } from '@angular/core';
import { CacheService } from '../services/cache.service';
import { HttpClient } from '@angular/common/http';
import { KEY_TITLE } from '../api/CacheKeys';

@Component({
  selector: 'contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.scss']
})
export class ContactpageComponent implements OnInit {

  public title: string = "";

  constructor(
    private cacheService: CacheService,
    private httpClient: HttpClient
  ) { 
    this.cacheService = new CacheService(this.httpClient);
  }

  ngOnInit(): void {
    this.title = "Portfolio - Contact Me";
    this.cacheService.set(KEY_TITLE, this.title);
  }

}
