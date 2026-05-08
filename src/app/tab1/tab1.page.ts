import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonSegment,
    IonSegmentButton,
    IonText,
    IonTitle,
    IonToolbar,
  ],
})
export class Tab1Page implements OnInit {
  modo: 'login' | 'registro' = 'login';
  email = '';
  password = '';
  mensaje = '';
  esError = false;
  cargando = false;
  autenticado = false;

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    const { data } = await this.supabaseService.obtenerSesion();
    this.autenticado = !!data.session;
  }

  async enviarFormulario() {
    this.mensaje = '';
    this.esError = false;

    if (!this.email || !this.password) {
      this.mensaje = 'Ingresa tu correo y contrasena.';
      this.esError = true;
      return;
    }

    this.cargando = true;
    const resultado =
      this.modo === 'login'
        ? await this.supabaseService.login(this.email, this.password)
        : await this.supabaseService.registrar(this.email, this.password);
    this.cargando = false;

    if (resultado.error) {
      this.mensaje = resultado.error.message;
      this.esError = true;
      return;
    }

    if (this.modo === 'registro') {
      this.mensaje = 'Cuenta creada. Ahora inicia sesion.';
      this.modo = 'login';
      this.password = '';
      return;
    }

    this.autenticado = true;
    this.router.navigate(['/tabs/tab2']);
  }
}
