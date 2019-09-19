import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { IRecruitmentForm } from '../models/interface';

import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentsService {

  constructor(private http: HttpClient) {
  }

  rest_api = 'http://localhost:500/candidate/';
  // rest_api = 'http://192.168.20.11:500/candidate/';
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
    console.log(evaluationForm); // muneeb
    return this.http.post(this.rest_api + 'postevaluation', evaluationForm, this.httpOptions);
  }

  uploadCadidateCv(cvFile): Observable<any> {
    const formData: FormData = new FormData();
    console.log(cvFile);

    formData.append('cv', JSON.stringify(cvFile.cv.path), cvFile.cv.name);
    console.log(formData);

    return this.http.post(this.rest_api + 'uploadcadidatecv', formData);
  }

  uploadCadidateImage(imageFile): Observable<any> {
    console.log(imageFile);
    const formData: FormData = new FormData();
    formData.append('profilePicture', imageFile);
    console.log(formData);

    const httpUploadHeaders = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    }

    return this.http.post(this.rest_api + 'uploadcadidateimage', formData, httpUploadHeaders);
  }

  deleteRecruitment(candidateId): Observable<any> {
    return this.http.delete(this.rest_api + `deleteevaluation/${candidateId}`, this.httpOptions);
  }

  editRecruitment(recruitmentForm: IRecruitmentForm): Observable<any> {
    return this.http.put(this.rest_api + 'updateevaluation', recruitmentForm, this.httpOptions);
  }

  getCandidateCv(payload) {
    const fileName = payload.candidateName.replace(' ', '').trim() + '_' + payload.id;
    this.http.post(this.rest_api + 'getcandidatecv', payload, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    }).subscribe(res => {
      saveAs(res, fileName);
    }, error => {
      console.error(error);
    })
  }

}
