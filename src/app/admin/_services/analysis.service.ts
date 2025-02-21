import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/response';
@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private baseUrl = `${environment.apiUrl}/api/admin/analysis`;

  constructor(private http: HttpClient) { }

//* Customers
  getGenderCount(){
    return this.http.get<{ status: number, message: string, data:  [{count:number,gender:string}]  }>
    (`${this.baseUrl}/GenderCount`)
  }

  numOfRegistrationOverMonth(){
    return this.http.get<{ status: number, message: string, data:  []  }>
    (`${this.baseUrl}/getRegistrationMonth`)
  }
  numOfRegistrationOverDayOfWeeks(){
    return this.http.get<{ status: number, message: string, data:  []  }>
    (`${this.baseUrl}/getRegistrationsPerWeek`)
  }
//* Orders
getOrdersByDayOfWeek(){
  return this.http.get<{ status: number, message: string, data:  []  }>
  (`${this.baseUrl}/getOrdersByDayOfWeek`)
}

getOrdersByMonth(){
  return this.http.get<{ status: number, message: string, data:  []  }>
  (`${this.baseUrl}/getOrdersByMonth`)
}
getOrderCountsByStatus(){
  return this.http.get<{ status: number, message: string, data:  {values:[],labels:[]}  }>
  (`${this.baseUrl}/getOrderCountsByStatus`)
}
//* Sellers
getSellerRegistrationsPerWeek(){
  return this.http.get<{ status: number, message: string, data:  []  }>
  (`${this.baseUrl}/getSellerRegistrationsPerWeek`)
}

getSellerRegistrationMonth(){
  return this.http.get<{ status: number, message: string, data:  []  }>
  (`${this.baseUrl}/getSellerRegistrationMonth`)
}
SellersCountsBystatus(){
  return this.http.get<{ status: number, message: string, data:  {values:[],labels:[]}  }>
  (`${this.baseUrl}/SellersCountsBystatus`)
}
//* Cards
getNumofProducts(){
  return this.http.get<{ status: number, message: string, data:  number  }>
  (`${this.baseUrl}/NumofProducts`)
}
getNumofBranches(){
  return this.http.get<{ status: number, message: string, data:  number  }>
  (`${this.baseUrl}/NumofBranches`)
}
getNumofOrders(){
  return this.http.get<{ status: number, message: string, data:  number  }>
  (`${this.baseUrl}/NumofOrders`)
}
getTotalSales(){
  return this.http.get<{ status: number, message: string, data:  number  }>
  (`${this.baseUrl}/TotalSales`)
}
}
