import { Type } from './type';
import { Component } from './component';
import { EntityId } from './entity';

type ComponentMap<T> = Map<EntityId,T>;
type ComponentTypeRegistry = { [id: string] : ComponentMap<any> };

export class State {
  registries: ComponentTypeRegistry = {};

  getComponentMap<T>(type: Type<T>): ComponentMap<T> {
    return this.registries[type.name];
  }

  registerComponentType(type: Type<any>) {
    this.registries[type.name] = new Map();
  }

  createComponent<T extends Component>(entityId: EntityId, type: Type<T>): T {
    let component = new type();
    component.entityId = entityId;
    this.getComponentMap(type).set(entityId, component);
    return component;
  }
}