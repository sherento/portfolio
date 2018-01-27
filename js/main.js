console.log(jQuery, $);

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

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

const addAxes = () => {
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);
};

// texture = THREE.ImageUtils.loadTexture("portfolio.png");
// material = new THREE.MeshBasicMaterial({ map: texture });
// var field = new THREE.Mesh(geometry, material);

// const photo = new THREE.TextureLoader().load(
//   THREEx.ArToolkitContext.baseURL + "image/WDi24-26.jpg"
// );
// const photoMaterial = new THREE.SpriteMaterial({
//   map: photo,
//   opacity: 0.8,
//   fog: true
// });
// var photoSprite = new THREE.Sprite(photoMaterial);
// markerRoot5.add(photoSprite);

// instantiate a loader
// var loader = new THREE.ImageLoader();
//
// // load a image resource
// loader.load(
// 	// resource URL
// 	'textures/skyboxsun25degtest.png',
//
// 	// onLoad callback
// 	function ( image ) {
// 		// use the image, e.g. draw part of it on a canvas
// 		var canvas = document.createElement( 'canvas' );
// 		var context = canvas.getContext( '2d' );
// 		context.drawImage( image, 100, 100 );
// 	},

// var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
// var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
// var plane = new THREE.Mesh( geometry, material );
// scene.add( plane );

//         //set mesh
//         var material = new THREE.MeshBasicMaterial({
//             //map : THREE.ImageUtils.loadTexture('images/image.jpg'),  // if I put only this, I see no mesh
//             color : 0x0000ff    // this draws blue mesh
//         });
//
//
//         // plane
//         var plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), material);
//
//         scene.add(plane);

const addPlane = () => {
  //mesh is a geometry and a material
  const planeGeometry = new THREE.PlaneGeometry(60, 20); //depth and width
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcfd8dc,
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;
  scene.add(plane);
};
const init = () => {
  // interact with the renderer (change size, background)
  renderer.setClearColor(0xeceff1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Create some basic Meshes
  // Add them into the Scene
  // Put the renderer on the page
  // Re-render the renderer
  // TODO: Render the scene! Use the renderer, pass in a scene and a camera.
  // const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
  // // 1000 is the limit
  // camera.position.x = -30;
  // camera.position.y = 40;
  // camera.position.z = 30;
  // camera.lookAt(scene.position);

  addAxes();
  addPlane();
  addCube();
  addSphere();
  addPointLight();

  gui = new dat.GUI();
  gui.add(controller, "rotationSpeed", 0, 5);
  gui.add(controller, "bouncingSpeed", 0, 5);

  controls = new THREE.OrbitControls(camera, renderer.domElement); //first parameter is camera, 2nd what event handler

  renderer.render(scene, camera);
  document.querySelector("#output").appendChild(renderer.domElement);

  animate(); //re-render the scene and update the shapes as quickly as you can
};

window.onload = init;

const onResize = () => {
  //change the aspect ratio of the camera
  camera.aspect = window.innerWidth / window.innerHeight;
  //update the shapes and their positions
  camera.updateProjectionMatrix();
  //update the size of the renderer itself
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);

// window.setInterval(animate);
//request animation frame
