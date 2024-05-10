import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GiphyService } from '../api-giphy/giphy.service.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-giphy',
  templateUrl: './search-giphy.component.html',
  styleUrl: './search-giphy.component.css'
})
export class SearchGiphyComponent {

  giphyForm = this.fb.group({
    search: ["", Validators.required]
  });

  @Output() listGif = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private giphyService: GiphyService
  ) { }

  onSubmit()
  {
    if (!this.giphyForm.valid)
      return;

    let gifSearch = this.search.value?.trim();

    if (gifSearch == null || (typeof gifSearch === "string" && gifSearch.length === 0))
    {
      this.giphyForm.patchValue({ search: "" });
      return;
    }

    this.giphyService.lookUpGif(gifSearch)
      .subscribe((response: any) => {
        this.listGif.emit(response.data);
      });
  }

  get search() { return this.giphyForm.controls.search }
}
