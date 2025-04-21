import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  get(url: string, options: any = {}) {
    return this.http.get(url, options);
  }
  post(url: string, body: any, options = {}) {
    return this.http.post(url, body, options);
  }
}
