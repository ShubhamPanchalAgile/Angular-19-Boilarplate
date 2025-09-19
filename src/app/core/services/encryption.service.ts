import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private secretKey = environment.secretKey;

  constructor() {}

  encryptObject(payload: any) {
    const stringified = JSON.stringify(payload);
    return this.encrypt(stringified);
  }

  encrypt(value: string): string {
    return AES.encrypt(value, this.secretKey).toString();
  }

  decrypt(textToDecrypt: string) {
    return AES.decrypt(textToDecrypt, this.secretKey).toString(enc.Utf8);
  }
}
