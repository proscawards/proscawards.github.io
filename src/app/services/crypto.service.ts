import { AES, enc } from 'crypto-js';

export class CryptoService {

    readonly KEY_SALT: string = 'proscawards_portfolio'; 
    readonly ALPHANUMERIC: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890!@#$%^&*()_+-=~`:;[]{}<>,.?/|";
    readonly SALT_LEN: number = 10; 

    constructor(){}

    // setSalt(){
    //   if (!localStorage.getItem(this.KEY_SALT)){
    //     localStorage.clear();
    //     let saltStr: string = "";
    //     for ( var i = 0; i < this.SALT_LEN; i++ ) {
    //       saltStr += this.ALPHANUMERIC.charAt(Math.floor(Math.random() * this.ALPHANUMERIC.length));
    //     }
    //     localStorage.setItem(this.KEY_SALT, this.encrypt(saltStr));
    //   }
    //   else{
    //     this.SALT = localStorage.getItem(this.decrypt(this.KEY_SALT));
    //   }
    // }
  
    encrypt(value : string): any{
      return AES.encrypt(value, this.KEY_SALT.trim()).toString();
    }
  
    decrypt(textToDecrypt : string): any{
      return AES.decrypt(textToDecrypt, this.KEY_SALT.trim()).toString(enc.Utf8);
    }
}