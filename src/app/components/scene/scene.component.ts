import { Component, OnInit, OnDestroy } from '@angular/core';
import { Scene, Engine, ArcRotateCamera, Vector3, Color4, VRExperienceHelper, VRDeviceOrientationArcRotateCamera } from 'babylonjs';
import { Sun } from '../../class/sun';
import { Earth } from '../../class/earth';
import { FlareSys } from '../../class/flare-sys';
import { Moon } from 'src/app/class/moon';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit, OnDestroy {

  /**
   * Gestion VR
   */
  vrHelper: VRExperienceHelper;

  constructor() { }

  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
    const engine = new Engine(canvas, true);

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
  createScene(canvas, engine: Engine) {
    // Create the scene space
    const scene = new Scene(engine);
    // Add a camera to the scene and attach it to the canvas

    this.vrHelper = scene.createDefaultVRExperience();
    this.vrHelper.deviceOrientationCamera.position = new Vector3(40, 30, -80);
    this.vrHelper.deviceOrientationCamera.rotation = new Vector3(0, Math.PI / 6, 0);

    // Sun
    const sun = new Sun(scene);

    // black background
    scene.clearColor = new Color4(0, 0, 0);

    // Earth
    const earth = new Earth(scene);

    // Lens flares
    const lensFlareSystem = new FlareSys(scene, sun.sunlight);


    // Moon
    const moon = new Moon(scene);

    // Animations
    let alpha = 0;
    scene.registerBeforeRender(function () {
      earth.animate();
      alpha = moon.animate(alpha);
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
