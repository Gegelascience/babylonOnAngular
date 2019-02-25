import { Component, OnInit, OnDestroy } from '@angular/core';
import * as BABYLON from '../../../assets/babylon.custom.js';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit, OnDestroy {

  /**
   * Gestion VR
   */
  vrHelper: any;

  constructor() { }

  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    const scene = this.createScene(canvas, engine); // Call the createScene function

    engine.runRenderLoop(function () {
      // Register a render loop to repeatedly render the scene
      scene.render();
    });

    window.addEventListener('resize', function () {
      // Watch for browser/canvas resize events
      engine.resize();
    });
  }

  /**
   * fonction qui crée la scene
   * @param canvas endroit où dessiner
   * @param engine babylon engine
   */
  createScene(canvas, engine) {
    // Create the scene space
    const scene = new BABYLON.Scene(engine);
    // Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera(
      'Camera',
      0,
      0,
      0,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.setPosition(new BABYLON.Vector3(-80, 50, 80));
    camera.attachControl(canvas, false);
    camera.upperRadiusLimit = 500;
    camera.lowerRadiusLimit = 50;

    this.vrHelper = scene.createDefaultVRExperience({ createDeviceOrientationCamera: false });

    // Sun
    const sunlight = new BABYLON.PointLight(
      'sun',
      new BABYLON.Vector3(200, 0, 0),
      scene
    );
    const sun = new BABYLON.MeshBuilder.CreateSphere(
      'astre',
      { diameter: 80 },
      scene
    );
    const solar = new BABYLON.StandardMaterial('solar', scene);
    solar.emissiveTexture = new BABYLON.Texture(
      './assets/textures/sun.jpg',
      scene,
      true,
      false
    );
    sun.material = solar;
    sun.position = sunlight.position;

    // black background
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // Earth
    const sphere = BABYLON.MeshBuilder.CreateSphere(
      'sphere',
      { diameter: 30 },
      scene
    );
    const planete = new BABYLON.StandardMaterial('planete', scene);
    planete.ambientTexture = new BABYLON.Texture(
      './assets/textures/earth.jpg',
      scene,
      true,
      true
    );
    planete.specularColor = new BABYLON.Color3(0, 0, 0);
    // false permet de ne pas inverser l'axe y pour la texture
    sphere.material = planete; // texture
    sphere.isBlocker = true;
    sphere.rotation.x = Math.PI;


    // Lens flares
    const lensFlareSystem = new BABYLON.LensFlareSystem(
      'lensFlareSystem',
      sunlight,
      scene
    );
    const flare00 = new BABYLON.LensFlare(
      0.1,
      0,
      new BABYLON.Color3(1, 1, 1),
      './assets/textures/flare3.jpg',
      lensFlareSystem
    );
    const flare01 = new BABYLON.LensFlare(
      0.4,
      0.1,
      new BABYLON.Color3(1, 1, 1),
      './assets/textures/flare.jpg',
      lensFlareSystem
    );
    const flare02 = new BABYLON.LensFlare(
      0.2,
      0.2,
      new BABYLON.Color3(1, 1, 1),
      './assets/textures/flare.jpg',
      lensFlareSystem
    );
    const flare04 = new BABYLON.LensFlare(
      0.1,
      0.3,
      new BABYLON.Color3(1, 1, 1),
      './assets/textures/flare3.jpg',
      lensFlareSystem
    );
    const flare03 = new BABYLON.LensFlare(
      0.3,
      0.4,
      new BABYLON.Color3(0.5, 0.5, 1),
      './assets/textures/flare.jpg',
      lensFlareSystem
    );
    const flare05 = new BABYLON.LensFlare(
      0.8,
      1.0,
      new BABYLON.Color3(1, 1, 1),
      './assets/textures/flare2.png',
      lensFlareSystem
    );

    // Moon
    const moonlight = new BABYLON.PointLight(
      'moon',
      new BABYLON.Vector3(0, 50, 0),
      scene
    );
    moonlight.diffuse = new BABYLON.Color3(0, 0, 0);
    moonlight.specular = new BABYLON.Color3(0, 0, 0);
    const moon = BABYLON.MeshBuilder.CreateSphere(
      'moonlight',
      { diameter: 10 },
      scene
    );
    const moontexture = new BABYLON.StandardMaterial('moonTexture', scene);
    moontexture.diffuseTexture = new BABYLON.Texture(
      './assets/textures/moon.jpg',
      scene,
      true,
      false
    );
    moontexture.specularColor = new BABYLON.Color3(0, 0, 0);
    moon.material = moontexture;
    const hideMaterial = new BABYLON.StandardMaterial('hide', scene);
    hideMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
    hideMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
    hideMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    hideMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    // Animations
    let alpha = 0;
    scene.registerBeforeRender(function () {
      sphere.rotation.y -= 0.01;
      moonlight.position = new BABYLON.Vector3(
        50 * Math.sin(alpha),
        0,
        50 * Math.cos(alpha)
      );
      moon.position = moonlight.position;
      if (moon.position.x <= -45) {
        moon.material = hideMaterial;
      } else {
        moon.material = moontexture;
      }
      moon.rotation.y -= 0.01;
      alpha -= 0.01;
    });

    return scene;
  }

  /**
   * Destruction du composant
   */
  ngOnDestroy() {
    if (this.vrHelper != null) {
      this.vrHelper.dispose();
    }
  }

}
