import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  @Input()
  public placeholder: string = '';
  @Input()
  public term: string = '';
  @Output()
  public onValue = new EventEmitter<string>();
  private debouncer = new Subject<string>();
  private debouncerSubscription?: Subscription;

  onKeyUp(value: string): void {
    this.debouncer.next(value);
  }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.onValue.emit(value);
      })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
