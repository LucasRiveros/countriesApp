import { Region } from './region.type';
import { Country } from './country.interface';

export interface CacheStore {
    byName: TermCountries;
    byCapital: TermCountries;
    byRegion: RegionCountries;
};

export interface TermCountries { 
    term: string;
    countries: Country[];
}

export interface RegionCountries { 
    term: Region;
    countries: Country[];
}
