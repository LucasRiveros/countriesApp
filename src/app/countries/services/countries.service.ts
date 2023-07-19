import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of, tap } from "rxjs";
import { Country } from "../interfaces/country.interface";
import { CacheStore } from "../interfaces/cache-store.interface";
import { Region } from "../interfaces/region.type";

@Injectable({ providedIn: 'root' })
export class CountriesService {

    public cacheStore: CacheStore = {
        byName: { term: '', countries: [] },
        byCapital: { term: '', countries: [] },
        byRegion: { term: '', countries: [] },
    }
    private apiUrl: string = 'https://restcountries.com/v3.1';

    constructor(private httpClient: HttpClient) {
        this.getLocalStorage();
    }

    getCountriesByCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap((countries) => {
                    this.cacheStore.byCapital = { term, countries };
                }),
                tap(()=> this.setLocalStorage())
            );
    }

    getCountriesByName(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap((countries) => {
                    this.cacheStore.byName = { term, countries };
                }),
                tap(()=> this.setLocalStorage())
            );
    }

    getCountriesByRegion(term: Region): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${term}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap((countries) => {
                    this.cacheStore.byRegion = { term, countries };
                }),
                tap(()=> this.setLocalStorage())
            );
    }

    getCountriesByAlphaCode(countryCode: string): Observable<Country | null> {
        return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${countryCode}`)
            .pipe(
                map((data) => data.length > 0 ? data[0] : null),
                catchError(() => of(null))
            );
    }

    private getCountriesRequest(url: string): Observable<Country[]> {
        return this.httpClient.get<Country[]>(url)
            .pipe(
                catchError(() => of([]))
            );
    }

    private setLocalStorage() {
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private getLocalStorage() {
        if(!localStorage.getItem('cacheStore')) return;
        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }
} 