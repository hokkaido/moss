import { Observable } from 'rxjs/Observable';
import { Store } from '../../core/store';
import { GeometryComponent } from '../components/geometry.component';
import { RotationComponent } from '../components/rotation.component';
export class RenderSystem {
  constructor(private store: Store) {
      this.store.select(GeometryComponent,RotationComponent)
        .subscribe(components => {
          let [geo, rot ] = components;
          console.log('renderSystem');
          console.log(geo);
          console.log(rot);
          console.log(components);
        });
  }
}

export const renderSystem = (store: Store) => {
  return store
    .select(GeometryComponent,RotationComponent)
    .subscribe(components => {
      let [geo, rot ] = components;
      console.log('renderSystem');
      console.log(geo);
      console.log(rot);
      console.log(components);
      geo.geometry.rotateX(rot.x);
    });
}