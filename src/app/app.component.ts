import { Component, OnInit } from '@angular/core';
import { CheckUpdatesService } from './services/check-updates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly checkUpdatesService: CheckUpdatesService) {
  }

  ngOnInit(): void {
      this.checkUpdatesService.checkVersions();
  }
}
