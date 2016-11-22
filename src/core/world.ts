import { Store } from './store';
import { State } from './state';
import { EntityPool } from './entity-pool';
import { Entity } from './entity';
import { Type } from './type';

interface WorldConfiguration {
  components: Array<Type<any>>;
}

export class World {
  private store: Store;
  private pool: EntityPool;
  private systems: Array<any>;

  constructor(config: WorldConfiguration) {
    this.store = new Store(new State());
    this.pool = new EntityPool();
  }

  createEntity(): Entity {
    return this.pool.createEntity();
  }

}