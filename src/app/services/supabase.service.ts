import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  registrar(email: string, password: string) {
    return this.supabase.auth.signUp({
      email,
      password,
    });
  }

  login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  logout() {
    return this.supabase.auth.signOut();
  }

  obtenerSesion() {
    return this.supabase.auth.getSession();
  }

  obtenerUsuario() {
    return this.supabase.auth.getUser();
  }

  escucharCambiosAuth(callback: (autenticado: boolean) => void) {
    return this.supabase.auth.onAuthStateChange((_evento, session) => {
      callback(!!session);
    });
  }
}
