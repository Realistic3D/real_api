import * as THREE from 'three';
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";


export const Domain = "app.real-api.online";
export async function Scene(scene, camera) {
    const realName = camera.name;
    const oldParent = camera.parent;
    const isChild = oldParent === scene;
    if(!isChild) {
        scene.add(camera);
        camera.name = "REAL_EYE";
    }
    const areaLights = [];
    scene.traverse((child)=> {
        if(child.type === "REAL_AREA_LIGHT") areaLights.push(child);
    });

    parseLights(areaLights);

    const exporter = new GLTFExporter();
    const options = {binary: true};
    const buffer = await new Promise((resolve, reject) => {
        exporter.parse(scene, (glb) => resolve(glb), (err) => reject(err), options);
    });
    // return new Blob([buffer], {type: 'model/gltf-binary'});
    return new Blob([buffer], {type: 'application/octet-stream'});
}

function parseLights(areaLights) {
    if(!areaLights || !areaLights.length) return;
    for (const child of areaLights) {
        const parent = child.parent;
        parent.remove(child);

        const areaLight = new THREE.Group();
        areaLight.name = "REAL_AREA_LIGHT";

        const scale = new THREE.Group();
        const position = new THREE.Group();
        const rotation = new THREE.Group();
        scale.name = `scale|${child.scale.x}_${child.scale.y}_${child.scale.z}`;
        position.name = `position|${child.position.x}_${child.position.y}_${child.position.z}`;
        rotation.name = `rotation|${child.rotation.x}_${child.rotation.y}_${child.rotation.z}`;
        areaLight.add(scale);
        areaLight.add(position);
        areaLight.add(rotation);

        const info = child.parse();
        for (const key in info) {
            const group = new THREE.Group();
            const value = info[key];

            if(key === "color") group.name = `${key}|${parseColor(value)}`;
            else group.name = `${key}|${JSON.stringify(value)}`;
            areaLight.add(group);
            console.log(group.name);
        }
        parent.add(areaLight);
    }
}

function parseColor(value) {
    return `r:${parseNumber(value.r)}, g:${parseNumber(value.g)}, b:${parseNumber(value.b)}`;
}

function parseNumber(value) {
    return parseFloat((value.toFixed(5)).toString());
}
