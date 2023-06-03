import * as THREE from 'three';

export declare function Scene(scene: THREE.Scene, camera: THREE.Camera): Promise<Blob>;

export declare class AreaLight extends THREE.Object3D {
    constructor(width: number, height: number, color?: number|THREE.Color, intensity?: number);
}

export declare const Domain: string;
