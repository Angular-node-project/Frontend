import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Clerk } from 'src/app/_models/clerk';
import { Response } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root'
})
export class ClerksService {
  private baseUrl = `${environment.apiUrl}/api/admin/clerk`;
  constructor(private http: HttpClient) { }

  getAllClerks(page: number, searchWord: string): Observable<Response<any>> {
    var result = this.http.get<Response<any>>(`${this.baseUrl}?page=${page}&searchWord=${searchWord}`);
    return result;
  }
  save(newClerk:Clerk): Observable<Response<Clerk>> {
    var result = this.http.post<Response<Clerk>>(`${this.baseUrl}`, newClerk);
    return result;
  }
  update(role: Clerk): Observable<Response<any>> {
    var result = this.http.put<Response<any>>(`${this.baseUrl}`, role);
    return result;
  }
  updateStatus(clerk_id: string, status: string): Observable<Response<any>> {
    var result = this.http.put<Response<any>>(`${this.baseUrl}/${clerk_id}/${status}`, {});
    return result;
  }

}
