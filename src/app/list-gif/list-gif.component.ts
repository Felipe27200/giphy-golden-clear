import { Component, Input, OnChanges } from '@angular/core';

import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-list-gif',
  templateUrl: './list-gif.component.html',
  styleUrl: './list-gif.component.css'
})
export class ListGifComponent implements OnChanges {
  @Input() listGif: any[] = [];

  dataEmpty: any = "no";
  messages: Message[] | undefined;

  ngOnChanges()
  {
    if (this.listGif.length <= 0)
    {
      this.dataEmpty = "yes";
      this.messages = [{ severity: 'info', detail: 'No se encontraron resultados!' }];
    }
    else
      this.dataEmpty = "no";
  }
}
