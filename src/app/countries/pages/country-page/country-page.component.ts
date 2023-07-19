import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit, OnDestroy {
  public country?: Country;
  private getCountriesSubscription?: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.getCountriesSubscription = this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.countriesService.getCountriesByAlphaCode(id);
        }),
      ).subscribe((country) => {
        if (!country) return this.router.navigateByUrl('');
        return this.country = country;
      });
  }

  ngOnDestroy(): void {
    this.getCountriesSubscription?.unsubscribe();
  }
  /* Version without switchmap: (subscription hell)
  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        this.searchCountry(id);
      })
  }

  private searchCountry(code: string): void {
    this.countriesService.getCountriesByAlphaCode(code)
      .subscribe(data => {
        console.log('data is ', data);

      })
  }*/

}
function takeUntilDestroyed(): import("rxjs").OperatorFunction<Country | null, unknown> {
  throw new Error('Function not implemented.');
}

