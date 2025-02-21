import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/response';
@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private baseUrl = `${environment.apiUrl}/api/seller/analysis`;

  constructor(private http: HttpClient) { }
}
