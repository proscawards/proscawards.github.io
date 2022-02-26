import { format, addSeconds, parse, differenceInSeconds } from "date-fns";
import { CryptoService } from "./crypto.service";
const cs = new CryptoService();

export class CacheService {

  readonly CACHE_EXPIRED_IN: number = 3600; //1 hour
  readonly KEY_CACHE: string = 'cache_exp'; 

  //set cache timeout
  setExp(){
    if (!this.exist(this.KEY_CACHE)){
      let exp = format(addSeconds(new Date(), this.CACHE_EXPIRED_IN), 'yyyy,MM,dd,HH,mm,ss');
      this.set(this.KEY_CACHE, exp);
    }
    else{
      let val = this.get(this.KEY_CACHE);
      let dt = parse(val, 'yyyy,MM,dd,HH,mm,ss', new Date())
      let now = new Date();
      if (differenceInSeconds(dt, now) <= 0){
        this.reset();
      }
    }
  }

  //Check if key exist in localstorage
  exist(key: any): Boolean {
    if (localStorage.getItem(key)){
      return true;
    }
    return false;
  }

  //Get value from localstorage
  get(key?: any) {
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
}