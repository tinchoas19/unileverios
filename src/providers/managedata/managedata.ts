import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
/*
  Generated class for the ManagedataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ManagedataProvider {

  data : Observable <any>;
  userId : number;

  constructor(public http: Http) {
    console.log('Hello ManagedataProvider Provider');
    this.userId = 0;
  }

  setUserId(id){
    this.userId = id;
  }

  crearParticipante(nombre, apellido,idempleado):Observable<any>{
    var headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json');
        const requestOptions = new RequestOptions({ headers: headers });
   
   
    var body = JSON.stringify({nombre: nombre, apellido: apellido, idempleado: idempleado});
   
    return this.http.post("http://ctrlztest.com.ar/unilever/api/crearparticipante.php", body, { headers: headers, withCredentials: true })
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data)))
    );
    

    /* .subscribe(res => {
      console.log("violvio", res.json().status);
      return res.json().status;
    }, (err) => {
      console.log("chau");
   
      return "error";
    }); */
   
   }
   
   subirImagen(image, idempleado):any{
    var headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json');
        const requestOptions = new RequestOptions({ headers: headers });
   
   
    var body = JSON.stringify({foto: image, idempleado: this.userId});
    
    return new Promise((resolve, reject) => {
      this.http.post("http://ctrlztest.com.ar/unilever/api/guardarfoto.php", body, { headers: headers, withCredentials: true })
      .subscribe(res => {
        console.log("violvio", res);
        resolve(res);
      }, (err) => {
        console.log("chau");
     
        //return "error";
      });
    });
  } 
}
