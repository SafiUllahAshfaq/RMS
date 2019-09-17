import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentsService {

  constructor(private http: HttpClient) {
  }

  rest_api = 'http://localhost:3000';
  recruitment = new BehaviorSubject<any>({});
  selected_recruitment = this.recruitment.asObservable();

  change_recruitment(recruitment) {
    this.recruitment.next(recruitment);
  }



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getObservableRecruitments(): Observable<any> {
    return this.http.get(this.rest_api + '/recruitments');
  }

  getrecruitment(recruitment): Observable<any> {
    return this.http.post(this.rest_api + '/recruitments/id', recruitment, this.httpOptions);
  }

  addrecruitment(recruitment): Observable<any> {
    return this.http.post(this.rest_api + '/recruitments', recruitment, this.httpOptions);
  }

  deleterecruitment(recruitment): Observable<any> {
    return this.http.post(this.rest_api + '/recruitments/delete', recruitment, this.httpOptions);
  }

  editrecruitment(recruitment): Observable<any> {
    return this.http.put(this.rest_api + '/recruitments', recruitment, this.httpOptions);
  }

}
