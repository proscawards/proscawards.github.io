import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Title as TitleService } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import { KEY_TITLE } from '../api/CacheKeys';

@Component({
  selector: 'title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnChanges {

  @Input() title: string = "";
  private title_default: string = "Portfolio - proscawards";

  constructor(
    private titleService: TitleService,
    private httpClient: HttpClient,
    private cacheService: CacheService
  ){
    this.cacheService = new CacheService(this.httpClient);
    this.title = this.title_default;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setTitle();
  }

  ngOnInit(): void {
    this.setTitle();
  }

  //Update browser window title
  setTitle() {
    if (this.cacheService.exist(KEY_TITLE)) {
      if (this.cacheService.get(KEY_TITLE) !== this.title) {
        this.title = this.cacheService.get(KEY_TITLE); 
      }
    }
    else {
      this.title = this.title_default;
    }
    this.titleService.setTitle(this.title);
  }
}
