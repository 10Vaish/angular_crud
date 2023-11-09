import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiService } from './services/api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const demo=inject(ApiService);
  console.log("Hii");
  if (demo.isLogin) {
    return true;
  }else{
    alert("Please Login");
    return false;
  }
};
