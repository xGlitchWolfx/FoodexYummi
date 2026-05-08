import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonActionSheet,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  imports: [
    IonActionSheet,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
})
export class Tab4Page implements OnInit {
  email = '';
  fotoPerfil = '';
  mostrarOpcionesFoto = false;
  opcionesFoto = [
    { text: 'Camara', handler: () => this.cambiarFoto(CameraSource.Camera) },
    { text: 'Galeria', handler: () => this.cambiarFoto(CameraSource.Photos) },
    { text: 'Cancelar', role: 'cancel' },
  ];

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    const { data } = await this.supabaseService.obtenerUsuario();
    this.email = data.user?.email ?? 'Usuario autenticado';
    this.fotoPerfil = localStorage.getItem(this.claveFotoPerfil) ?? '';
  }

  async cambiarFoto(source: CameraSource) {
    const foto = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.DataUrl,
      source,
    });

    this.fotoPerfil = foto.dataUrl ?? '';
    localStorage.setItem(this.claveFotoPerfil, this.fotoPerfil);
  }

  async cerrarSesion() {
    await this.supabaseService.logout();
    this.router.navigate(['/tabs/tab1']);
  }

  private get claveFotoPerfil() {
    return `fotoPerfil:${this.email}`;
  }
}
