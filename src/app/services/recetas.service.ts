import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  private recetaSeleccionadaId = new BehaviorSubject<string | null>(null);
  recetaSeleccionadaId$ = this.recetaSeleccionadaId.asObservable();

  constructor(private http: HttpClient) {}

  buscarRecetas(nombre: string) {
    return this.http.get<any>(`${this.apiUrl}/search.php?s=${encodeURIComponent(nombre)}`);
  }

  obtenerDetalleReceta(id: string) {
    return this.http.get<any>(`${this.apiUrl}/lookup.php?i=${id}`);
  }

  seleccionarReceta(id: string) {
    this.recetaSeleccionadaId.next(id);
  }
}
