import { Injectable } from '@angular/core';
import { retry, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserDTO } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

    private readonly BASE_URL = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) { }

    private httpHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }  

    public getUsers(): Observable<UserDTO> {
        return this.httpClient.get<UserDTO>(this.BASE_URL + '/users')
        .pipe(
            tap((item) => console.log("Users:", item)),
            retry(3),
            catchError(this.processError)
        )
    }

    public getSingleUser(id: string): Observable<UserDTO> {
        return this.httpClient.get<UserDTO>(this.BASE_URL + '/users/' + id)
        .pipe(
            tap((item) => console.log("User:", item)),
            retry(1),
            catchError(this.processError)
        )
    }  

    public addUser(data: UserDTO): Observable<UserDTO> {
        return this.httpClient.post<UserDTO>(this.BASE_URL + '/users', JSON.stringify(data), this.httpHeader)
        .pipe(
            tap((item) => console.log("User add:", item)),
            retry(1),
            catchError(this.processError)
        )
    }  

    public updateUser(id: string, data: UserDTO): Observable<UserDTO> {
        return this.httpClient.put<UserDTO>(this.BASE_URL + '/users/' + id, JSON.stringify(data), this.httpHeader)
        .pipe(
            tap((item) => console.log("User update:", item)),
            retry(1),
            catchError(this.processError)
        )
    }

    public deleteUser(id: string): Observable<UserDTO> {
        return this.httpClient.delete<UserDTO>(this.BASE_URL + '/users/' + id, this.httpHeader)
        .pipe(
            tap((item) => console.log("User delete:", item)),
            retry(1),
            catchError(this.processError)
        )
    }

    private processError(err: any) {
        let message = '';
        if(err.error instanceof ErrorEvent) {
            message = err.error.message;
        } else {
            message = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        console.log(message);
        return throwError(message);
    }
}