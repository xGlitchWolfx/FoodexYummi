import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
    IonText,
  ],
})
export class Tab3Page implements OnInit {
  receta: any = null;
  cargando = false;
  mensajeError = '';
  recetaSeleccionada = false;

  constructor(private recetasService: RecetasService) {}

  ngOnInit() {
    this.recetasService.recetaSeleccionadaId$.subscribe((id) => {
      if (id) {
        this.recetaSeleccionada = true;
        this.cargarDetalle(id);
      }
    });
  }

  cargarDetalle(id: string) {
    this.cargando = true;
    this.mensajeError = '';
    this.receta = null;

    this.recetasService.obtenerDetalleReceta(id).subscribe({
      next: (respuesta) => {
        this.receta = respuesta.meals?.[0] ?? null;
        this.cargando = false;

        if (!this.receta) {
          this.mensajeError = 'No se encontro informacion de esta receta.';
        }
      },
      error: () => {
        this.receta = null;
        this.cargando = false;
        this.mensajeError = 'No se pudo cargar el detalle de la receta.';
      },
    });
  }

  obtenerIngredientes() {
    if (!this.receta) {
      return [];
    }

    const ingredientes = [];

    for (let i = 1; i <= 20; i++) {
      const ingrediente = this.receta[`strIngredient${i}`];
      const medida = this.receta[`strMeasure${i}`];

      if (ingrediente && ingrediente.trim() !== '') {
        ingredientes.push(`${medida} ${ingrediente}`);
      }
    }

    return ingredientes;
  }
}
