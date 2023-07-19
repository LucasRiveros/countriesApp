import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Subscription } from 'rxjs';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit, OnDestroy {
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public countries: Country[] = [];
  private getCountriesSubscription?: Subscription;
  constructor(private countriesService: CountriesService) { }
  
  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.getCountriesSubscription = this.countriesService.getCountriesByRegion(region)
    .subscribe((data) => {
      this.countries = data;
    })
  }
  
  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStore.byRegion.term;
    this.countries = this.countriesService.cacheStore.byRegion.countries;
  }

  ngOnDestroy(): void {
    this.getCountriesSubscription?.unsubscribe();
  }
}
