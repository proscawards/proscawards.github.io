import { Injectable } from '@angular/core';
import { Router as Route } from "@angular/router";
import { Location } from "@angular/common";
import { CacheService } from './cache.service';
import { HttpClient } from '@angular/common/http';
import { KEY_PAGE } from '../api/CacheKeys';

@Injectable({
    providedIn: 'root',
})

export class Router {

    constructor(
        private router: Route,
        private location: Location,
        private cacheService: CacheService,
        private httpClient: HttpClient,
    ){
        this.cacheService = new CacheService(httpClient);
    }

    routeTo(url: string): void{
        if (this.cacheService.exist(KEY_PAGE)){
            if (this.cacheService.isEqual(KEY_PAGE, url)){
                this.router.navigate([`/${this.cacheService.get(KEY_PAGE)}`], { replaceUrl: true });
            }
            else{
                this.router.navigate([`/${url}`], { replaceUrl: true });
                this.cacheService.set(KEY_PAGE, url);
            }
        }
        else{
            this.router.navigate([`/${url}`], { replaceUrl: true });
            this.cacheService.set(KEY_PAGE, url);
        }
    }

    routeURL(): string{
        return this.router.url.replace("/", "");
    }
}
