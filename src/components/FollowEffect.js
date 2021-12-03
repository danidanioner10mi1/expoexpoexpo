import * as THREE from "three";
import Proton from "three.proton.js";

export default class FollowEffect {
  constructor(conf) {
    this.init(conf);
  }

  init({ texture, camera, renderer, scene }) {
    const proton = new Proton();
    const emitter = new Proton.FollowEmitter();
    emitter.ease = 1;
    emitter.rate = new Proton.Rate(
      new Proton.Span(4, 5),
      new Proton.Span(3.01, 3.02)
    );
    emitter.addInitialize(new Proton.Mass(5));
    emitter.addInitialize(new Proton.Life(1.7));
    emitter.addInitialize(new Proton.Body(this.createSprite(texture)));
    emitter.addInitialize(new Proton.Radius(4));
    emitter.addInitialize(new Proton.V(280, new Proton.Vector3D(0, 0, -1), 15));

    emitter.addBehaviour(new Proton.Alpha(0.8, 0));
    emitter.addBehaviour(new Proton.Color("#ffb703", "#fb8500"));
    emitter.addBehaviour(new Proton.Scale(1, 0.5));
    emitter.addBehaviour(
      new Proton.CrossZone(new Proton.ScreenZone(camera, renderer), "dead")
    );

    //emitter.addBehaviour(new Proton.Force(0, 0, -20));
    emitter.setCameraAndRenderer(camera, renderer);

    emitter.emit();

    proton.addEmitter(emitter);
    proton.addRender(new Proton.SpriteRender(scene));

    this.proton = proton;
  }

  createSprite(texture) {
    const map = new THREE.TextureLoader().load(texture);
    const material = new THREE.SpriteMaterial({
      map: map,
      color: 0xff0000,
      blending: THREE.AdditiveBlending,
      fog: true
    });
    return new THREE.Sprite(material);
  }

  addToScene(scene) {
    scene.add(this.plane);
  }

  render() {
    const { proton } = this;
    proton.update();
  }
}
