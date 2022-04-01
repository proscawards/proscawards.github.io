import { Injectable } from '@angular/core';
import { Router as ngRouter, NavigationStart } from "@angular/router";
import { Location } from "@angular/common";
import { CacheService } from './cache.service';
import { HttpClient } from '@angular/common/http';
import { KEY_PAGE } from '../api/CacheKeys';

@Injectable({
    providedIn: 'root',
})

export class Router {

    constructor(
        private router: ngRouter,
        private location: Location,
        private cacheService: CacheService,
        private httpClient: HttpClient,
    ){
        this.cacheService = new CacheService(httpClient);
    }

    routeTo(url?: string): void{
        if (url == null){
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
    }

    routeURL(): string{
        return this.router.url.replace("/", "");
    }

    // routeRefresh(): void{
    //     this.router.events.subscribe(event => {
    //         if (event instanceof NavigationStart) {
    //           if (!!event.url && event.url.match(/^\/#/)) {
    //               console.log("event.url")
    //             this.router.navigate([event.url.replace('/#', '')]);
    //             console.log(event.url.replace('/#', ''))
    //           }
    //         }
    //     });
    // }
}
