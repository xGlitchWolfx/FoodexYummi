import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonSearchbar,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonSearchbar,
    IonSpinner,
    IonText,
  ],
})
export class Tab2Page implements OnInit {
  recetas: any[] = [];
  cargando = false;
  mensajeError = '';
  terminoBusqueda = 'chicken';

  constructor(
    private recetasService: RecetasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buscarRecetas(this.terminoBusqueda);
  }

  buscarRecetas(nombre: string) {
    const termino = nombre?.trim();

    if (!termino) {
      this.recetas = [];
      this.mensajeError = 'Escribe el nombre de una receta para buscar.';
      return;
    }

    this.cargando = true;
    this.mensajeError = '';
    this.terminoBusqueda = termino;

    this.recetasService.buscarRecetas(termino).subscribe({
      next: (respuesta) => {
        this.recetas = respuesta.meals ?? [];
        this.cargando = false;

        if (this.recetas.length === 0) {
          this.mensajeError = 'No se encontraron recetas con ese nombre.';
        }
      },
      error: () => {
        this.recetas = [];
        this.cargando = false;
        this.mensajeError = 'No se pudieron cargar las recetas. Intenta nuevamente.';
      },
    });
  }

  seleccionarReceta(receta: any) {
    this.recetasService.seleccionarReceta(receta.idMeal);
    this.router.navigate(['/tabs/tab3']);
  }
}
