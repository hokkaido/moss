import "reflect-metadata";

export class Component {

  private _entityId: number;

  get entityId(): number {
    return this._entityId;
  }

  set entityId(value: number) {
    this._entityId = value;
  }
}