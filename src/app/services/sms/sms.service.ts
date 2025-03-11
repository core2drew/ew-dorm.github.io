import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { API_URL } from '../../app.token';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  constructor(
    @Inject(API_URL) protected apiUrl: string,
    private http: HttpClient,
  ) {}

  getMessages() {
    return this.http.get(`${this.apiUrl}`);
  }
}
