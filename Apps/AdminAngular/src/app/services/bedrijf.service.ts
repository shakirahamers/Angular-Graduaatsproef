import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BedrijfService {

  constructor(private http: HttpClient) { }

  getBedrijven(): Observable<any[]> {
    const url = 'https://localhost:7020/api/Bedrijf';
    return this.http.get<any[]>(url);
  }

  getBezoekersInBedrijf(id: number): Observable<any> {
    const url = `https://localhost:7020/api/Bezoeker/GetBezoekersInBedrijf/${id}`;
    return this.http.get(url);
  }

  getParkingContractBedrijf(id : number): Observable<any> {
    const url = `https://localhost:7020/api/ParkingContract/${id}`;
    return this.http.get(url);
  }

  getAlleBezoekersAanwezig(): Observable<any> {
    const url = `https://localhost:7020/api/Bezoeker`;
    return this.http.get(url);
  }

  getBedrijfById(id: number): Observable<any> {
    const url = `https://localhost:7020/api/Bedrijf/${id}`;
    return this.http.get(url);
  }

  putBedrijf(bedrijf: any): Observable<any> {
    const url = `https://localhost:7020/api/Bedrijf/${bedrijf.id}`;
    return this.http.put(url, bedrijf);
  }
  
  postBedrijf(bedrijf: any): Observable<any> {
    const url = `https://localhost:7020/api/Bedrijf`;
    return this.http.post(url, bedrijf);
  }

  deleteBedrijf(bedrijfId: number): Observable<any> {
    const url = `https://localhost:7020/api/Bedrijf/${bedrijfId}`;
    return this.http.delete(url);
  }

  getActieveBedrijven(): Observable<any[]> {
    const url = 'https://localhost:7020/api/Bedrijf/GetActieveBedrijven';
    return this.http.get<any[]>(url);
  }

  getParkingcontracten(): Observable<any[]> {
    const url = 'https://localhost:7020/api/ParkingContract';
    return this.http.get<any[]>(url);
  }

  getActieveParkingcontracten(): Observable<any[]> {
    const url = 'https://localhost:7020/api/ParkingContract/getActieveParkingContracten';
    return this.http.get<any[]>(url);
  }

  deleteParkingContract(id: number): Observable<any> {
    const url = `https://localhost:7020/api/ParkingContract/${id}`;
    return this.http.delete(url);
  }

  postParkingContract(parkingContract: any): Observable<any> {
    const url = `https://localhost:7020/api/ParkingContract`;
    return this.http.post(url, parkingContract);
  }
}
