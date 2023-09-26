import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';

import { first, interval, concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckUpdatesService {
  constructor(private readonly appRef: ApplicationRef,
              private readonly updates: SwUpdate) { }

  public checkVersions(): void {
    this.updates.versionUpdates.subscribe((event: VersionEvent) => {
      if (event.type === "VERSION_DETECTED") {
        console.log("Version Detected");
        if (confirm("Gostaria de atualizar para a nova versão?")) {
          this.updates.activateUpdate().then(() => window.location.reload());
        }
      }
    });

    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(10 * 1000);
    const checkUpdateVersion$ = concat(appIsStable$, everySixHours$);

    checkUpdateVersion$.subscribe(() => this.updates.checkForUpdate());
  }
}
