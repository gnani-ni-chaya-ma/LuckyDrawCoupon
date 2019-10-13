import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  currentUser: any;

  constructor(private httpClient: HttpClient) { }

  generateCoupon(data: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/registerAndGenerateTicket`, data);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/login`, data);
  }
}
