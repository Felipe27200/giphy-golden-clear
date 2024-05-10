import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(
    private http: HttpClient,
  ) { }

  lookUpGif(search: string | any)
  {
    return this.http.get<any>(`${this.apiUrl}/search?api_key=${this.apiKey}&q=${search}`)
              .pipe(catchError(this.handleError))
  }

  getTrendingGif()
  {
    return this.http.get<any>(`${this.apiUrl}/trending?api_key=${this.apiKey}`)
              .pipe(catchError(this.handleError))
  }

  public handleError(error: HttpErrorResponse)
  {
    if (error.status === 0)
    {
      // Error del lado del cliente o de red.
      console.error('Ocurrio un error:\n\t', error.error);
    }
    else
    {
      // El backend retorna un código de respuesta no exitoso.
      console.error(`El Backend retorno el código ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Algo malo paso, por favor intente de nuevo más tarde.'));
  }
}
