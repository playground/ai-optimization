import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonService } from './services/common.service';
import { interval, switchMap, take } from 'rxjs';
import { EndPoint } from './models/model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  url = 'https://www.amazingtreats.in';
  numberOfRequests = 100;
  timeInterval = 100;
  endPoint = '';

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.endPoint = location.hostname == 'localhost' ? EndPoint.localhost : EndPoint.production;
  }
  sendRequest() {
    interval(this.timeInterval)       // by default emit every 100ms
      .pipe(
        take(this.numberOfRequests),  // take only numberOfRequests emissions
        switchMap((i) =>              // switchMap makes 1 request per tick
          this.commonService.get(`${this.url}`)
        )
      )
      .subscribe({
        next: (response) => console.log('Response:', response),
        error: (err) => console.error('Request failed:', err),
        complete: () => console.log('All requests complete!')
      });
  }
}
