import { Injectable } from '@angular/core';
import { format, parse, addHours, differenceInHours } from "date-fns";
import { CryptoService } from "./crypto.service";
const cs = new CryptoService();
import { HttpClient } from '@angular/common/http';
import { KEY_CERT, KEY_EDU, KEY_EXP, KEY_EXPIRY, KEY_PAGE, KEY_PROJECT, KEY_VCOUNT, KEY_VCOUNTRY, KEY_BNB_ACTIVE, KEY_PROJECT_ACTIVE } from '../api/CacheKeys';

@Injectable({
  providedIn: 'root',
})

export class CacheService {

  readonly CACHE_EXPIRED_IN: number = 3; //3 hours

  constructor(
    private httpClient: HttpClient
  ){}

  //set cache timeout and salt
  setExp(){
    if (this.exist(KEY_EXPIRY)){
      let val = this.get(KEY_EXPIRY);
      let dt = parse(val, 'yyyy,MM,dd,HH,mm,ss', new Date())
      let now = new Date();
      if (differenceInHours(dt, now) <= 0){
        this.reset();
        let exp = format(addHours(new Date(), this.CACHE_EXPIRED_IN), 'yyyy,MM,dd,HH,mm,ss');
        this.set(KEY_EXPIRY, exp);
      }
    }
    else{
      this.reset();
      let exp = format(addHours(new Date(), this.CACHE_EXPIRED_IN), 'yyyy,MM,dd,HH,mm,ss');
      this.set(KEY_EXPIRY, exp);
    }
    this.subscribe();
    this.cacheUtils();
  }

  //Check if key exist in localstorage
  exist(key: any): Boolean {
    if (localStorage.getItem(key)){
      return true;
    }
    return false;
  }

  //Get value from localstorage
  get(key?: any): any {
    return JSON.parse(cs.decrypt(localStorage.getItem(key) ?? ''));
  }

  //Set value into localstorage
  set(key: any, val: any) {
    localStorage.setItem(key, cs.encrypt(JSON.stringify(val)));
  }

  //Reset all cache
  reset() {
    localStorage.clear();
  }

  //Is two values of the key identical?
  isEqual(key: any, new_val: any){
    let old_val = this.get(key);
    if (old_val == new_val){
      return true;
    }
    return false;
  }

  //Subscribe to all endpoint to prepare for response caching
  subscribe(){
    if (!this.exist(KEY_EXP)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/exp')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.set(KEY_EXP, data);
      });
    }
    if (!this.exist(KEY_CERT)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/cert')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {
          let da: any = parse(a.cert.date, "MMMM yyyy", new Date());
          let db: any = parse(b.cert.date, "MMMM yyyy", new Date());
          return da - db;
        });
        this.set(KEY_CERT, data);
      });
    }
    if (!this.exist(KEY_EDU)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/edu')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.set(KEY_EDU, data);
      });
    }
    if (!this.exist(KEY_PROJECT)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/project')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.set(KEY_PROJECT, data);
      });
    }
    if (!this.exist(KEY_VCOUNTRY)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/').subscribe();
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/country')
      .subscribe(res => {
        this.set(KEY_VCOUNTRY, res);
      });
    }
    if (!this.exist(KEY_VCOUNT)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/count')
      .subscribe(res => {
        this.set(KEY_VCOUNT, res.count)
      });    
    }
  }

  //Cache utilities first, to prevent error
  cacheUtils(){
    if (!this.exist(KEY_PAGE)){
      this.set(KEY_PAGE, '');
    }
    if (!this.exist(KEY_BNB_ACTIVE)){
      this.set(KEY_BNB_ACTIVE, false);
    }
    if (!this.exist(KEY_PROJECT_ACTIVE)){
      this.set(KEY_PROJECT_ACTIVE, 0);
    }
  }
}