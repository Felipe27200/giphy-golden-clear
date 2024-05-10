import { Component, OnInit } from '@angular/core';

import { GiphyService } from './api-giphy/giphy.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Giphy Golden Clear';
  listGif: any;

  constructor (
    private giphyService: GiphyService 
  ) {}

  addItemListGif(data: any)
  {
    this.listGif = data;
  }

  ngOnInit(): void {
    this.giphyService.getTrendingGif()
      .subscribe((response: any) => {
        this.listGif = response.data;
      });
  }
}
