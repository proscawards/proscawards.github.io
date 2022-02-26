import { AES, enc } from 'crypto-js';

export class CryptoService {

    secretKey = "proscawards_portfolio";
    constructor() {}
  
    encrypt(value : string) : string{
      return AES.encrypt(value, this.secretKey.trim()).toString();
    }
  
    decrypt(textToDecrypt : string){
      return AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(enc.Utf8);
    }
}