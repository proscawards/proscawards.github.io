import { Component } from '@angular/core';
import { CacheService } from '../services/cache.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  private cacheService: CacheService;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.cacheService = new CacheService(this.httpClient);
    this.cacheService.setExp();
  }
}
