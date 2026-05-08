import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { idCard, images, pencil, person } from 'ionicons/icons';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  autenticado = false;

  constructor(private readonly supabaseService: SupabaseService) {
    addIcons({ idCard, images, pencil, person });
    this.supabaseService.escucharCambiosAuth((autenticado) => {
      this.autenticado = autenticado;
    });
  }

  async ngOnInit() {
    const { data } = await this.supabaseService.obtenerSesion();
    this.autenticado = !!data.session;
  }
}
