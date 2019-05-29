import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get('/api/user/info');
  }

  login(data: any) {
    return this.http.post('/api/user/login', data)
  }
}
