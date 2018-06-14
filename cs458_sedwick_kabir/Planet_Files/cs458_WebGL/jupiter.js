let clock = new THREE.Clock();

const imgLoc = "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/PlanetMaps/";
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000),
light = new THREE.PointLight(0xFFFFFF, 2, 2500);
camera.position.set(1300, 0, 0),
camera.add(light),
scene = new THREE.Scene();
camera.lookAt(scene.position);
//light.position.set(2000, 2000, 1500);
//scene.add(light),
scene.add(camera);

let planetGeo = new THREE.SphereGeometry (500, 32, 32),
planetMaterial = new THREE.MeshPhongMaterial(),
planetMesh = new THREE.Mesh(planetGeo, planetMaterial);
scene.add(planetMesh);

let loader = new THREE.TextureLoader();
planetMaterial.map = loader.load(imgLoc+'2k_jupiter.jpg');
//venusMaterial.bumpMap = loader.load(imgLoc+'mars-bump.jpg');
planetMaterial.bumpScale = 8;
planetMaterial.specular = new THREE.Color('#000000');

let renderer = new THREE.WebGLRenderer({antialiasing : true});
renderer.setSize(window.innerWidth , window.innerHeight )
planetloc.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render(){
   var delta = clock.getDelta();
   planetMesh.rotation.y += 0.1 * delta;
   renderer.clear();
   renderer.render(scene, camera);
}

animate();

planetloc.addEventListener('mousedown', function() {
  planetloc.style.cursor = "-moz-grabbing";
  planetloc.style.cursor = "-webkit-grabbing";
  planetloc.style.cursor = "grabbing";
})

planetloc.addEventListener('mouseup', function() {
  planetloc.style.cursor = "-moz-grab";
  planetloc.style.cursor = "-webkit-grab";
  planetloc.style.cursor = "grab";
})

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeigh);
}
