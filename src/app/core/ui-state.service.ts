import { Injectable, signal } from '@angular/core';

/** Shared UI state. `ready` flips once the intro loader has finished so entrance animations play in view. */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  readonly ready = signal(false);
  readonly menuOpen = signal(false);

  markReady(): void { this.ready.set(true); }
}
