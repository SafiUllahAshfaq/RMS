import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentsService {

  constructor(private http: HttpClient) {
  }

  rest_api = 'http://localhost:500/candidate/';
  recruitment = new BehaviorSubject<any>({});
  selected_recruitment = this.recruitment.asObservable();

  change_recruitment(recruitment) {
    this.recruitment.next(recruitment);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getObservableRecruitments(): Observable<any> {
    return this.http.get(this.rest_api + 'recruitments');
  }

  getrecruitment(recruitment): Observable<any> {
    return this.http.post(this.rest_api + 'recruitments/id', recruitment, this.httpOptions);
  }

  postEvaluation(evaluationForm): Observable<any> {
    return this.http.post(this.rest_api + 'recruitments', evaluationForm, this.httpOptions);
  }

  uploadCadidateCv(cvFile): Observable<any> {
    // console.log(cvFile);
    const formData: FormData = new FormData();
    console.log(cvFile);

    formData.append('cv', JSON.stringify(cvFile.cv.path), cvFile.cv.name);
    console.log(formData);

    return this.http.post(this.rest_api + 'uploadcadidatecv', formData);
  }

  deleterecruitment(recruitment): Observable<any> {
    return this.http.post(this.rest_api + 'recruitments/delete', recruitment, this.httpOptions);
  }

  editrecruitment(recruitment): Observable<any> {
    return this.http.put(this.rest_api + 'recruitments', recruitment, this.httpOptions);
  }

}
