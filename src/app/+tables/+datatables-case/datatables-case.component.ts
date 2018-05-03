import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {  FadeInTop} from "../../shared/animations/fade-in-top.decorator";
import { HttpClient } from '@angular/common/http';

@FadeInTop()
@Component({
  selector: 'sa-datatables-case',
  templateUrl: './datatables-case.component.html',
})

export class DatatablesCaseComponent implements OnInit {
  public REST_ROOT = 'http://localhost:8080/regactapi';
  options = {
      dom: "Bfrtip",
      ajax: (data, callback, settings) => {
        this.http.get(this.REST_ROOT + '/cursos/consultarCursosActivosPorNombreUsu?nombre=Juan Arcila')
          .map((data: any)=>(data.data || data))
          .catch(this.handleError)
          .subscribe((data) => {
            console.log('data from rest endpoint', data);
            callback({
              aaData: data.slice(0, 100)
            })
          })
      },
      columns: [ 
        {data: 'id'}, 
        {data: 'nombre'}, 
        {data: 'cantidadHoras'}, 
        {data: 'fechaInicio'}, 
        {data: 'fechaFin'}, 
        {data: 'estado'}
      ]
    };

    constructor(private http: HttpClient) {
    }

  ngOnInit() {    
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}