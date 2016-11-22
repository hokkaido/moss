import * as Rx from 'rxjs/Rx';

import { Type } from './type';
import { State } from './state';
import { Component } from './component';

function fromDictionary(dictionary) {
    return Rx.Observable.from(Object.keys(dictionary))
      .map(function(key){
        return dictionary[key];
      });
}

export class Store {
  constructor(private state: State) {
  }


  selects<T extends Component, T2 extends Component>(v1: Type<T>, v2: Type<T2>): Rx.Observable<[T,T2]> {
    let r1 = fromDictionary(this.state.getComponentMap(v1));
    let r2 = fromDictionary(this.state.getComponentMap(v2));

    return Rx.Observable
      .merge<T,T2>(r1, r2)
      .groupBy(c => c.entityId)
      .flatMap(group => group.reduce((acc, curr) => [...acc, curr], []))
      .filter(arr => arr.length === 2)
      .map(arr => {
        return [arr[0], arr[1]]
      })
  }

    select<T extends Component, T2 extends Component>(v1: Type<T>, v2: Type<T2>): Rx.Observable<[T,T2]> {
    let r1 = Rx.Observable.of(...this.state.getComponentMap(v1).values());
    let r2 = Rx.Observable.of(...this.state.getComponentMap(v2).values());

    return Rx.Observable
      .merge<T,T2>(r1, r2)
      .groupBy(c => c.entityId)
      .flatMap(group => group.reduce((acc, curr) => [...acc, curr], []))
      .filter(a => a.length === 2);
  }
}