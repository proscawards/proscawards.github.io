import { Injectable } from '@angular/core';
import { Router as ngRouter, NavigationStart } from "@angular/router";
import { Location } from "@angular/common";
import { CacheService } from './cache.service';
import { HttpClient } from '@angular/common/http';
import { KEY_PAGE, KEY_TITLE } from '../api/CacheKeys';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})

export class Router {

    constructor(
        private router: ngRouter,
        private location: Location,
        private cacheService: CacheService,
        private httpClient: HttpClient,
        private titleService: Title
    ){
        this.cacheService = new CacheService(this.httpClient);
    }

    routeTo(url: string, title?: string): void{
        if (url == "") {
            this.cacheService.exist(KEY_PAGE) ?
            url = this.cacheService.get(KEY_PAGE) : 
            url = "";
        }
        if (this.cacheService.exist(KEY_PAGE)){
            if (this.cacheService.isEqual(KEY_PAGE, url)){
                this.router.navigate([`/${this.cacheService.get(KEY_PAGE)}`]);
            }
            else{
                this.router.navigate([`/${url}`]);
                this.cacheService.set(KEY_PAGE, url);
            }
        }
        else{
            this.router.navigate([`/${url}`]);
            this.cacheService.set(KEY_PAGE, url);
        }
        this.titleService.setTitle(title!);        
    }

    routeURL(): string{
        return this.router.url.replace("/", "");
    }
}
