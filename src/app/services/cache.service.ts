import { Injectable } from '@angular/core';
import { format, addSeconds, parse, differenceInSeconds } from "date-fns";
import { CryptoService } from "./crypto.service";
const cs = new CryptoService();
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CacheService {

  readonly CACHE_EXPIRED_IN: number = 3600; //1 hour
  readonly KEY_EXPIRY: string = 'cache_expiry'; 
  readonly KEY_EXP: string = 'cache_exp';
  readonly KEY_EDU: string = 'cache_edu';
  readonly KEY_CERT: string = 'cache_cert';
  readonly KEY_PROJ: string = 'cache_project';
  readonly KEY_VCOUNT: string = 'cache_vcount';
  readonly KEY_VCOUNTRY: string = 'cache_vcountry';

  constructor(
    private httpClient: HttpClient
  ){}

  //set cache timeout and salt
  setExp(){
    if (!this.exist(this.KEY_EXPIRY)){
      this.reset();
      let exp = format(addSeconds(new Date(), this.CACHE_EXPIRED_IN), 'yyyy,MM,dd,HH,mm,ss');
      this.set(this.KEY_EXPIRY, exp);
    }
    else{
      let val = this.get(this.KEY_EXPIRY);
      let dt = parse(val, 'yyyy,MM,dd,HH,mm,ss', new Date())
      let now = new Date();
      if (differenceInSeconds(dt, now) <= 0){
        this.reset();
        this.setExp();
      }
    }
    this.subscribe();
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

  //Subscribe to all endpoint to prepare for response caching
  subscribe(){
    if (!this.exist(this.KEY_EXP)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/exp')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.set(this.KEY_EXP, data);
      });
    }
    if (!this.exist(this.KEY_CERT)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/cert')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {
          let da: any = parse(a.cert.date, "MMMM yyyy", new Date());
          let db: any = parse(b.cert.date, "MMMM yyyy", new Date());
          return da - db;
        });
        this.set(this.KEY_CERT, data);
      });
    }
    if (!this.exist(this.KEY_EDU)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/edu')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.set(this.KEY_EDU, data);
      });
    }
    if (!this.exist(this.KEY_PROJ)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/project')
      .subscribe(res => {
        var data = res.slice(0);
        data.sort(function(a: any, b: any) {return a.id - b.id});
        this.set(this.KEY_PROJ, data);
      });
    }
    if (!this.exist(this.KEY_VCOUNTRY)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/').subscribe();
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/country')
      .subscribe(res => {
        this.set(this.KEY_VCOUNTRY, res);
      });
    }
    if (!this.exist(this.KEY_VCOUNT)){
      this.httpClient.get<any>('https://proscawards-portfolio-backend.herokuapp.com/count')
      .subscribe(res => {
        this.set(this.KEY_VCOUNT, res.count)
      });    
    }
  }
}