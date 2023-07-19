import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit, OnDestroy {
  public countries: Country[] = [];
  public lastTerm: string = '';
  private searchCountrySubscription?: Subscription;

  constructor(private countriesService: CountriesService) { }
  
  searchByName( term: string ): void {
    this.searchCountrySubscription = this.countriesService.getCountriesByName(term)
      .subscribe((data) => {
        this.countries = data;
        console.log(data)
      })
  }

  ngOnInit(): void {
    this.lastTerm = this.countriesService.cacheStore.byName.term;
    this.countries = this.countriesService.cacheStore.byName.countries;
  }

  ngOnDestroy(): void {
    this.searchCountrySubscription?.unsubscribe();
  }
}
