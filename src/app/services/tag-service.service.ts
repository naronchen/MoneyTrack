import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly tags: string[] = ['food', 'coffee', 'transportation', 'rent', 'subscription', 'others'];

  getTags(): string[] {
    return this.tags;
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
