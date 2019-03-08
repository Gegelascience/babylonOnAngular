import { Scene, LensFlareSystem, LensFlare, Color3, PointLight } from 'babylonjs';

export class FlareSys {
    constructor(scene: Scene, sunlight: PointLight) {

        const lensFlareSystem = new LensFlareSystem(
            'lensFlareSystem',
            sunlight,
            scene
        );
        const flare00 = new LensFlare(
            0.1,
            0,
            new Color3(1, 1, 1),
            './assets/textures/flare3.jpg',
            lensFlareSystem
        );
        const flare01 = new LensFlare(
            0.4,
            0.1,
            new Color3(1, 1, 1),
            './assets/textures/flare.jpg',
            lensFlareSystem
        );
        const flare02 = new LensFlare(
            0.2,
            0.2,
            new Color3(1, 1, 1),
            './assets/textures/flare.jpg',
            lensFlareSystem
        );
        const flare04 = new LensFlare(
            0.1,
            0.3,
            new Color3(1, 1, 1),
            './assets/textures/flare3.jpg',
            lensFlareSystem
        );
        const flare03 = new LensFlare(
            0.3,
            0.4,
            new Color3(0.5, 0.5, 1),
            './assets/textures/flare.jpg',
            lensFlareSystem
        );
        const flare05 = new LensFlare(
            0.8,
            1.0,
            new Color3(1, 1, 1),
            './assets/textures/flare2.png',
            lensFlareSystem
        );
    }
}
