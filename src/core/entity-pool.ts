import { Entity } from './entity';

export class EntityPool {
  private nextId: number;
  private entities: { [id: number] : Entity };

  createEntity(): Entity {
    let entity = new Entity(this.nextId);
    this.nextId++;
    return entity;
  }
}