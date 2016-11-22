export type EntityId = number;

export class Entity {
  public id: EntityId;
  public active: boolean;

  constructor(id: number) {
    this.id = id;
  }
}