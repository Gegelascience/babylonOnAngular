import { Scene, MeshBuilder, StandardMaterial, Texture, Color3, Mesh } from 'babylonjs';

export class Earth {
    sphere: Mesh;
    constructor(scene: Scene) {
        this.sphere = MeshBuilder.CreateSphere(
            'sphere',
            { diameter: 30 },
            scene
        );
        const planete = new StandardMaterial('planete', scene);
        planete.ambientTexture = new Texture(
            './assets/textures/earth.jpg',
            scene,
            true,
            true
        );
        planete.specularColor = new Color3(0, 0, 0);
        // false permet de ne pas inverser l'axe y pour la texture
        this.sphere.material = planete; // texture
        this.sphere.isBlocker = true;
        this.sphere.rotation.x = Math.PI;
    }

    animate(): void {
        this.sphere.rotation.y -= 0.01;
    }
}
