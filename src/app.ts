import * as THREE from 'three';
import { Component } from './core/component';
import { State } from './core/state';
import { Store } from './core/store';
import { GeometryComponent } from './app/components/geometry.component';
import { RotationComponent } from './app/components/rotation.component';
import { RenderSystem } from './app/systems/render.system';

export class App {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;

    private cube: THREE.Mesh;

    constructor() {
        this.initTHREE();
        this.initScene();
        this.render();
        this.testRx();
    }

    private initTHREE(): void {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.scene.add(this.camera);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById("container").appendChild(this.renderer.domElement);
        });
    }

    private initScene(): void {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        this.camera.position.z = 5;
    }

    public render(): void {
        requestAnimationFrame(() => this.render());

        this.cube.rotation.x += 0.1;
        this.cube.rotation.y += 0.1;

        this.renderer.render(this.scene, this.camera);
    }

    private testRx(): void {
        let state = new State();
        state.registerComponentType(GeometryComponent);
        state.registerComponentType(RotationComponent);

        let g1 = state.createComponent(1, GeometryComponent);
        let r1 = state.createComponent(1, RotationComponent);

        let r2 = state.createComponent(2, RotationComponent);

        r1.x = 5;

        let store = new Store(state);

        let renderSystem = new RenderSystem(store);
    }
}