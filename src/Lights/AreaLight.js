import * as THREE from 'three';

export class AreaLight extends THREE.Object3D {
    constructor(width, height, color = 0xFFFFFF, intensity= 1) {
        super(width, height);

        this.color = color;
        this.portal = false;
        this.beamAngle = 180;
        this.castShadow = true;
        this.intensity = intensity;
        this.shadowCaustics = false;
        this.multipleImportance = true;

        this.name = "REAL_AREA_LIGHT";
        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(color).multiplyScalar(intensity)
        })


        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
        this.mesh = mesh;
        this.type = "REAL_AREA_LIGHT";

        Object.defineProperty(this, 'color', {
            get() {
                return material.color;
            },
            set(value) {
                material.color = new THREE.Color(value).multiplyScalar(this.intensity);
            }
        });

        Object.defineProperty(this, 'intensity', {
            get() {
                return material.color.r;
            },
            set(value) {
                material.color = new THREE.Color(this.color).multiplyScalar(value);
            }
        });
    }
    parse() {
        return {
            type: "REAL_AREA_LIGHT",
            portal: this.portal,
            color: this.color,
            beamAngle: this.beamAngle,
            intensity: this.intensity,
            castShadow: this.castShadow,
            shadowCaustics: this.shadowCaustics,
            multipleImportance: this.multipleImportance
        }
    }
}
