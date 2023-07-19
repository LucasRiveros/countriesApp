import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit, OnDestroy {
  public countries: Country[] = [];
  public isLoading = false;
  public lastTerm: string = '';
  private searchByCapitalSubscription?: Subscription;

  constructor(private countriesService: CountriesService) { }
  
  searchByCapital( term: string ): void {
    this.isLoading = true;
    this.searchByCapitalSubscription = this.countriesService.getCountriesByCapital(term)
      .subscribe((data) => {
        this.countries = data;
        this.isLoading = false;
      })
  }

  ngOnInit(): void {
    this.lastTerm = this.countriesService.cacheStore.byCapital.term;
    this.countries = this.countriesService.cacheStore.byCapital.countries;
  }

  ngOnDestroy(): void {
    this.searchByCapitalSubscription?.unsubscribe();
  }
}
