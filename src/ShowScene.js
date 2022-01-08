import { Component } from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

import equal from "fast-deep-equal";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { runInThisContext } from "vm";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

import backgroundImg from "./images/semyung/jisjpyta-900.jpg";

function addShadowedLight(x, y, z, color, intensity, scene) {
  const directionalLight = new THREE.DirectionalLight(color, intensity);
  directionalLight.position.set(x, y, z);
  scene.add(directionalLight);

  directionalLight.castShadow = true;

  const d = 1;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;

  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  directionalLight.shadow.bias = -0.001;

  return scene;
}

class ShowScene extends Component {
  constructor(props) {
    super(props);

    //this.start = this.start.bind(this);
    //this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    console.log(this.props.plyFile);
  }

  componentDidMount() {
    this.renderPlyFile();
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.plyFile, prevProps.plyFile)) {
      this.mount.removeChild(this.renderer.domElement);
      this.renderPlyFile();
      this.animate();
    }
  }

  renderPlyFile() {
    let camera, cameraTarget, scene, renderer;
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, width / height, 1, 15);

    // camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );
    // camera.position.set(-1, 3, 3);
    //camera.position.set(0, 0.6, 3);

    cameraTarget = new THREE.Vector3(0, 0.35, 0);
    camera.position.set(0, 0.6, 3);

    scene = new THREE.Scene();

    // 3D Model 나오는 부분 배경 설정
    const imgLoader = new THREE.TextureLoader();
    scene.background = imgLoader.load(backgroundImg);

    // scene.background = new THREE.Color(0x72645b);
    // scene.fog = new THREE.Fog(0x72645b, 2, 15);

    const loader = new PLYLoader();

    loader.load(this.props.plyFile, function (geometry) {
      // geometry.computeVertexNormals();

      // THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial.
      let material = new THREE.PointsMaterial({
        size: 0.03,
        // flatShading: true,
      });
      material.vertexColors = true;

      // THREE.PointCloud has been renamed to THREE.Points.
      let mesh = new THREE.Points(geometry, material);

      mesh.position.y = 0.3;
      mesh.position.z = 0.3;

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      scene.add(mesh);
    });

    // let plane = new THREE.Mesh(
    //   new THREE.PlaneBufferGeometry(40, 40),
    //   new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x100000 })
    // );
    // plane.rotation.x = -Math.PI / 2;
    // plane.position.y = -0.5;

    // scene.add(plane);

    // plane.receiveShadow = true;

    scene.add(new THREE.HemisphereLight(0x443333, 0x111122));

    scene = addShadowedLight(1, 1, 1, 0xffffff, 1.35, scene);
    scene = addShadowedLight(0.5, 1, -1, 0xffaa00, 1, scene);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(1200, 760);

    renderer.outputEncoding = THREE.sRGBEncoding;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    renderer.shadowMap.enabled = true;

    renderer.xr.enabled = true;

    //codes from https://coderedirect.com/questions/307652/unable-to-change-camera-position-when-using-vrcontrols

    const cameraGroup = new THREE.Group();
    cameraGroup.position.set(0, -1, 1.5);

    renderer.xr.addEventListener("sessionstart", function () {
      scene.add(cameraGroup);
      cameraGroup.add(camera);
    });

    renderer.xr.addEventListener("sessionend", function () {
      scene.remove(cameraGroup);
      cameraGroup.remove(camera);
    });

    this.scene = scene;
    this.camera = camera;
    this.cameraTarget = cameraTarget;
    this.renderer = renderer;

    this.mount.appendChild(this.renderer.domElement);
    this.mount.appendChild(VRButton.createButton(this.renderer));
  }

  componentWillUnmount() {
    //this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  animate() {
    this.renderer.setAnimationLoop(
      (this.renderScene = () => {
        this.camera.lookAt(this.cameraTarget);
        this.renderer.render(this.scene, this.camera);
      })
    );
  }

  render() {
    return (
      <div
        className="ply"
        // 기본 style
        // style={{ width: '500px', height: '500px' }}
        style={{ width: "100%", height: "700px" }}
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ShowScene;
