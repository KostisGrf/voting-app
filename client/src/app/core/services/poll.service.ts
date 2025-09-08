import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poll } from '../../shared/poll';
import { delay, Observable } from 'rxjs';
import { paginatedResponse } from '../../shared/paginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private baseUrl='http://localhost:8080/api/polls';

  constructor(private http:HttpClient) { }

  createPoll(poll:Poll):Observable<Poll>{
    return this.http.post<Poll>(this.baseUrl,poll);

  }

  getPolls(page: number, size: number, sort: string, search?: string): Observable<paginatedResponse> {
  let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

  if (search) {
    params = params.set('search', search);
  }

  return this.http.get<paginatedResponse>(this.baseUrl, { params }).pipe(delay(500));
}

vote(pollId:number,optionIndex:number): Observable<void>{
    
    return this.http.post<void>(`${this.baseUrl}/vote`,{pollId,optionIndex});
  }
}
