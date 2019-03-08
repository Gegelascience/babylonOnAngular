import { Scene, PointLight, Vector3, Color3, StandardMaterial, Texture, MeshBuilder, Mesh } from 'babylonjs';

export class Moon {

    moonlight: PointLight;
    moon: Mesh;
    hideTexture: StandardMaterial;
    moonTexture: StandardMaterial;

    constructor(scene: Scene) {
        this.moonlight = new PointLight(
            'moon',
            new Vector3(0, 50, 0),
            scene
        );
        this.moonlight.diffuse = new Color3(0, 0, 0);
        this.moonlight.specular = new Color3(0, 0, 0);
        this.moon = MeshBuilder.CreateSphere(
            'moonlight',
            { diameter: 10 },
            scene
        );
        this.moonTexture = new StandardMaterial('moonTexture', scene);
        this.moonTexture.diffuseTexture = new Texture(
            './assets/textures/moon.jpg',
            scene,
            true,
            false
        );

        this.moonTexture.specularColor = new Color3(0, 0, 0);
        this.moon.material = this.moonTexture;
        this.hideTexture = new StandardMaterial('hide', scene);
        this.hideTexture.emissiveColor = new Color3(0, 0, 0);
        this.hideTexture.ambientColor = new Color3(0, 0, 0);
        this.hideTexture.diffuseColor = new Color3(0, 0, 0);
        this.hideTexture.specularColor = new Color3(0, 0, 0);
    }

    animate(alpha: number): number {

        this.moonlight.position = new BABYLON.Vector3(
            50 * Math.sin(alpha),
            0,
            50 * Math.cos(alpha)
        );
        this.moon.position = this.moonlight.position;
        if (this.moon.position.x <= -5 && this.moon.position.z <= -5) {
            this.moon.material = this.hideTexture;
        } else {
            this.moon.material = this.moonTexture;
        }
        this.moon.rotation.y -= 0.01;
        alpha -= 0.01;
        return alpha;
    }
}
