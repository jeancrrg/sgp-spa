import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {

    private _isLoading: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public readonly isLoading: Observable<any> = this._isLoading.asObservable();

    update(load: any): void {
        this._isLoading.next(load);
    }

    start(): void {
        this._isLoading.next(true);
    }

    stop(): void {
        this._isLoading.next(false);
    }
}
