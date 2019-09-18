import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { IRecruitmentForm } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentsService {

  constructor(private http: HttpClient) {
  }

  rest_api = 'http://192.168.20.11:500/candidate/';
  recruitment = new BehaviorSubject<any>({});
  selected_recruitment = this.recruitment.asObservable();

  change_recruitment(recruitment) {
    this.recruitment.next(recruitment);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllRecruitments(): Observable<any> {
    return this.http.get(this.rest_api + 'allevaluations');
  }

  getRecruitmentById(recruitment): Observable<any> {
    return this.http.post(this.rest_api + 'recruitments/id', recruitment, this.httpOptions);
  }

  addRecruitment(evaluationForm: IRecruitmentForm): Observable<any> {
    console.log(evaluationForm);
    return this.http.post(this.rest_api + 'postevaluation', evaluationForm, this.httpOptions);
  }

  uploadCadidateCv(cvFile): Observable<any> {
    const formData: FormData = new FormData();
    console.log(cvFile);

    formData.append('cv', JSON.stringify(cvFile.cv.path), cvFile.cv.name);
    console.log(formData);

    return this.http.post(this.rest_api + 'uploadcadidatecv', formData);
  }

  deleteRecruitment(candidateId): Observable<any> {
    return this.http.delete(this.rest_api + `deleteevaluation/${candidateId}`, this.httpOptions);
  }

  editRecruitment(recruitmentForm: IRecruitmentForm): Observable<any> {
    return this.http.put(this.rest_api + 'updateevaluation', recruitmentForm, this.httpOptions);
  }

  getCandidateCv(payload) {
    this.http.post(this.rest_api + 'getcandidatecv', payload).subscribe(res => {
      console.log('img: ', res);
    }, error => {
      console.log(error);
    })
  }

}
