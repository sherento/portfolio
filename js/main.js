// console.log(jQuery, $);

// $(document).ready(function() {
//   $(".enter").click(function() {
//     $(".homeContainer").hide();
//     $(".main").show();
//     $("nav").show();
//   });
// });

// let cube = null;
let sphere = null;
let controls = null;
let gui = null;
let step = 0;

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio || 1);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = -100;
camera.position.y = 30;
camera.position.z = 30;

camera.lookAt(scene.position);

const controller = new function() {
  this.rotationSpeed = 0.02;
  this.bouncingSpeed = 0.02;
}();

const animate = () => {
  step += controller.bouncingSpeed;

  // cube.position.y = 2 + 10 * Math.abs(Math.sin(step));
  //
  // cube.rotation.x += controller.rotationSpeed;
  // cube.rotation.y += controller.rotationSpeed;
  // cube.rotation.z += controller.rotationSpeed;

  sphere.position.z = 20 * Math.cos(step);
  sphere.position.y = 20 * Math.sin(step);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const addAxes = () => {
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);
};

const addPointLight = () => {
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(-40, 60, 20);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;
  scene.add(pointLight);
};

const addSphere = () => {
  const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x039be5
  });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 0; // Left to right
  sphere.position.y = 20; // Top to bottom
  sphere.position.z = 0; // Near to far
  sphere.castShadow = true;
  // sphere.receiveShadow = true;
  scene.add(sphere);
};

// const addCube = () => {
//   // In order to show the user a shape:
//   // 1. Create your material
//   // 2. Create your geometry
//   // 3. Create your mesh (material + geometry)
//   // 4. Add the mesh into the scene
//   // 5. Re-render the renderer (use the scene and the camera)
//   const cubeMaterial = new THREE.MeshLambertMaterial({
//     color: 0xff8f00
//   });
//   const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
//   cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//   cube.position.x = -4;
//   cube.position.y = 3;
//   cube.castShadow = true;
//   scene.add(cube);
// };

const addPlane = () => {
  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcfd8dc,
    side: THREE.DoubleSide
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.y = 0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;

  scene.add(plane);
};

const init = () => {
  // Interact with the renderer (change size, background)
  renderer.setClearColor(0xeceff1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Create some basic meshes
  // Add them into the scene
  // Put the renderer on the page
  // Re-render the renderer

  addAxes();
  addPlane();
  // addCube();
  addSphere();
  addPointLight();

  gui = new dat.GUI();
  gui.add(controller, "rotationSpeed", 0, 5);
  gui.add(controller, "bouncingSpeed", 0, 5);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Render the scene!  Use the renderer, pass in a scene and a camera
  renderer.render(scene, camera);
  document.querySelector("#output").appendChild(renderer.domElement);

  animate(); // Re-render the scene and update the shapes as quickly as you can
};

window.onload = init;

const onResize = () => {
  // Change the aspect ratio of the camera
  camera.aspect = window.innerWidth / window.innerHeight;
  // Update the shapes and their positions
  camera.updateProjectionMatrix();
  // Update the size of the renderer itself
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);
