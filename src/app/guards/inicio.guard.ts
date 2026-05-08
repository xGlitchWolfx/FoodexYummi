import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const inicioGuard: CanActivateFn = async () => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);
  const { data } = await supabaseService.obtenerSesion();

  return router.createUrlTree([data.session ? '/tabs/tab2' : '/tabs/tab1']);
};
