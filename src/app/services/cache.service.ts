import { format, addSeconds, parse, differenceInSeconds } from "date-fns";
import { CryptoService } from "./crypto.service";
const cs = new CryptoService();

export class CacheService {

  readonly CACHE_EXPIRED_IN: number = 3600; //1 hour
  readonly KEY_EXPIRY: string = 'cache_expiry'; 

  //set cache timeout and salt
  setExp(){
    if (!this.exist(this.KEY_EXPIRY)){
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
}