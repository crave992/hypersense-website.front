import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  private requests: any = { };

  constructor() { }

  put(urlWithParams: string, response: HttpResponse<any>): void {
    this.requests[urlWithParams] = response;
  }

  get(urlWithParams: string): HttpResponse<any> | undefined {
    return this.requests[urlWithParams];
  }

  invalidateUrl(urlWithParams: string): void {
    this.requests[urlWithParams] = undefined;
  }

  invalidateCache(): void {
    this.requests = { };
  }
}
