import { Injectable } from '@angular/core';
import { format, parse, addHours, differenceInHours } from "date-fns";
import { CryptoService } from "./crypto.service";
const cs = new CryptoService();
import { KEY_EXPIRY, KEY_PAGE, KEY_VCOUNT, KEY_VCOUNTRY, KEY_BNB_ACTIVE, KEY_PROJECT_ACTIVE, KEY_SPLASH } from '../api/CacheKeys';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CacheService {

  readonly CACHE_EXPIRED_IN: number = 3; //3 hours

  constructor(
    private httpClient: HttpClient
  ) {
  }

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
    // if (!this.exist(KEY_CERT)){
    //   this.httpClient.get<any>('https://portfolio-backend-proscawards.vercel.app/cert', {observe : 'response'})
    //   .subscribe(res => {
    //     if (res.status != 200){
    //       this.restart();
    //     }
    //     else{
    //       var data = res.body.slice(0);
    //       data.sort(function(a: any, b: any) {
    //         let da: any = parse(a.cert.date, "MMMM yyyy", new Date());
    //         let db: any = parse(b.cert.date, "MMMM yyyy", new Date());
    //         return da - db;
    //       });
    //       this.set(KEY_CERT, data);
    //     }
    //   });
    // }

    if (!this.exist(KEY_VCOUNTRY)){
      this.httpClient.get<any>('https://portfolio-backend-proscawards.vercel.app/', {observe : 'response'})
      .subscribe(res => {
      });
      this.httpClient.get<any>('https://portfolio-backend-proscawards.vercel.app/country', {observe : 'response'})
      .subscribe(res => {
          this.set(KEY_VCOUNTRY, res.body);
      });
    }
    if (!this.exist(KEY_VCOUNT)){
      this.httpClient.get<any>('https://portfolio-backend-proscawards.vercel.app/count', {observe : 'response'})
      .subscribe(res => {
          this.set(KEY_VCOUNT, res.body.count)
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
    if (!this.exist(KEY_SPLASH)){
      this.set(KEY_SPLASH, false);
    }
  }
}