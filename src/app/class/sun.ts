import { PointLight, MeshBuilder, StandardMaterial, Texture, Scene } from 'babylonjs';

export class Sun {

    sunlight: PointLight;

    constructor(scene: Scene) {
        this.sunlight = new PointLight(
            'sun',
            new BABYLON.Vector3(200 * Math.cos(Math.PI / 4), 0, 200 * Math.sin(Math.PI / 4)),
            scene
        );
        const sun = MeshBuilder.CreateSphere(
            'astre',
            { diameter: 80 },
            scene
        );
        const solar = new StandardMaterial('solar', scene);
        solar.emissiveTexture = new Texture(
            './assets/textures/sun.jpg',
            scene,
            true,
            false
        );
        sun.material = solar;
        sun.position = this.sunlight.position;
    }
}
