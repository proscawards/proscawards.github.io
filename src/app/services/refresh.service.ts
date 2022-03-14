import { Injectable } from '@angular/core';
import { Router as ngRouter, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators'
import { Router } from './router.service';

@Injectable({
    providedIn: 'root',
})

export class Refresh{

    constructor(
        private router: Router, 
        private ngRouter: ngRouter
    ){
        this.ngRouter.events
        .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
        .subscribe(event => {
          if (event.id === 1 && event.url === event.urlAfterRedirects){
           this.router.routeTo();
          }
        })
    }
}