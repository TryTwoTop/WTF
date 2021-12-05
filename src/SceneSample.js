import React, { Component } from 'react';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import * as THREE from 'three';

// 추가 - 마우스 콘트롤
// 문제시 바로 삭제
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 추가 - 현재 상황
// 문제 시 바로 삭제
import Stats from 'three/examples/jsm/libs/stats.module';

import dol from './ply/dolphins_be.ply';
import dol2 from './ply/dolphins_le.ply';
import lucky from './ply/Lucy100k.ply';
import jjs from './ply/jjs.ply';
import jjsTest from './ply/jjsTest.ply';

function addShadowedLight( x, y, z, color, intensity, scene) {
  const directionalLight = new THREE.DirectionalLight( color, intensity );
  directionalLight.position.set( x, y, z );
  scene.add( directionalLight );

  directionalLight.castShadow = true;

  const d = 1;
  directionalLight.shadow.camera.left = - d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = - d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;

  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  directionalLight.shadow.bias = - 0.001;

  return scene;
}

class SceneSample extends Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    let camera, cameraTarget, scene, renderer;
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, width / height, 1, 15 );
    // camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );
    camera.position.set( 0, 0.15, 3 );

    cameraTarget = new THREE.Vector3( 0, - 0.1, 0 );

    scene = new THREE.Scene();
		scene.background = new THREE.Color( 0x72645b );
		scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

    const loader = new PLYLoader();
    loader.load('./ply/Lucy100k.ply', function ( geometry ) {
      geometry.computeVertexNormals();
  
      var material = new THREE.MeshStandardMaterial( { color: 0x0055ff, flatShading: true } );
      var mesh = new THREE.Mesh( geometry, material );
  
      mesh.position.y = - 0.2;
      mesh.position.z = 0.3;
      mesh.rotation.x = - Math.PI / 2;

      // 천사 세우기
      mesh.rotation.x = 0;
      mesh.position.y = 0.3;

      mesh.scale.multiplyScalar( 0.001 );
  
      mesh.castShadow = true;
      mesh.receiveShadow = true;
  
      scene.add( mesh );
    });

    var plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( 40, 40 ),
      new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x100000 } )
    );
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -0.5;
    
    scene.add( plane );

    plane.receiveShadow = true;

    scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

    scene = addShadowedLight( 1, 1, 1, 0xffffff, 1.35, scene);
		scene = addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1, scene);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		// renderer.setSize( window.innerWidth, window.innerHeight );

    // 사이즈를 작게 함
    renderer.setSize(1200, 760);
    

    // 테스트 : 아  몰라 ~~~!
    // renderer.setSize(window.innerWidth / 100 * 70 - 34, window.innerHeight);
    
		renderer.outputEncoding = THREE.sRGBEncoding;

    // 추가 - 마우스 콘트롤
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    renderer.shadowMap.enabled = true;

    this.scene = scene;
    this.camera = camera;
    this.cameraTarget = cameraTarget;
    this.renderer = renderer;

    // 테스트 대상임 이걸로 width 100%, height 100% 만들어야함
    console.log(renderer.domElement);

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    const timer = Date.now() * 0.0005;
    // this.camera.position.x = Math.sin( timer ) * 2.5;
    // this.camera.position.z = Math.cos( timer ) * 2.5;
    this.camera.lookAt( this.cameraTarget );
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div className="ply"
        // 기본 style
        // style={{ width: '500px', height: '500px' }}
        style={{ width: '100%', height: '760px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default SceneSample;