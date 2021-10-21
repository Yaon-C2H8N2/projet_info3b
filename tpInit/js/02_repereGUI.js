const borneVue=6;//amplitude de deplacement de la camera

function init(){
 var stats = initStats();
    // creation de rendu et de la taille
 let rendu = new THREE.WebGLRenderer({ antialias: true });
 rendu.shadowMap.enabled = true;
 scene = new THREE.Scene();
 let result;
 camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
 rendu.shadowMap.enabled = true;
 rendu.setClearColor(new THREE.Color(0xFFFFFF));
 rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
 cameraLumiere(scene,camera);
 lumiere(scene);
 //repere(scene);
 //controls = new THREE.TrackballControls(camera);
 //plans contenant deux axes du repere
 //planRepere(scene);

 Bleu = new THREE.MeshPhongMaterial({
   color: "#0000FF",
   opacity: 0.5,
   //transparent: true,
   emissive: 0x000000,
   //specular: "#00FFFF",
   flatShading: true,
   shininess: 30,
   //wireframe: true,
   side: THREE.DoubleSide,
 })

 Rouge = new THREE.MeshPhongMaterial({
   color: "#FF0000",
   opacity: 0.5,
   //transparent: true,
   emissive: 0x000000,
   //specular: "#00FFFF",
   flatShading: true,
   shininess: 30,
   //wireframe: true,
   side: THREE.DoubleSide,
 })

 function test_point(A,coul){
   sphereGeom = new THREE.SphereGeometry(0.05,10,10);
   if(coul == undefined)mesh = new THREE.Mesh(sphereGeom,new THREE.MeshBasicMaterial({color: 0x999999}));
   else mesh = new THREE.Mesh(sphereGeom,new THREE.MeshBasicMaterial({color: coul}));
   mesh.position.x = A.x;
   mesh.position.y = A.y;
   mesh.position.z = A.z;
   return mesh;
 }

 pierre_rouge = initPierre(scene,Rouge);
 scene.add(pierre_rouge);
 piste = initPiste(scene);
 scene.add(piste);

<<<<<<< Updated upstream
 balai = initBalai(scene);
 scene.add(balai);
 balai.position.y = 1;

 p1 = new THREE.Vector3(pierre_rouge.getWorldPosition().x,pierre_rouge.getWorldPosition().y,0);
=======
 p1 = new THREE.Vector3(pierre_rouge.position.x,pierre_rouge.position.y,0);
>>>>>>> Stashed changes
 p3 = new THREE.Vector3(0,33.31,0);
 p2 = new THREE.Vector3(0,(33.31+pierre_rouge.getWorldPosition().y)/2,0);
 p2_sphere = test_point(p2);
 p3_sphere = test_point(p3);
 scene.add(p2_sphere);
 scene.add(p3_sphere);

 bezier = traceBezier([p1,p2,p3],10);
 scene.add(bezier);


 //********************************************************
 //
 //  D E B U T     M E N U     G U I
 //
 //********************************************************
 var gui = new dat.GUI();//interface graphique utilisateur
  // ajout du menu dans le GUI
 let menuGUI = new function () {
   this.cameraxPos = 0;   //à remttre à 0    -1
   this.camerayPos = -6;   //à remttre à -6   -4.6
   this.camerazPos = 6;   //à remettre à 6    3.7
   this.cameraZoom = 6;   //à remttre à 6   0.5
   //pb avec camera lockAt
   this.cameraxDir = 0;
   this.camerayDir = 6;   //à remettre à 6    0
   this.camerazDir = 6;   //à remettre à 6    1

   this.P3x = p3.x;
   this.P3y = p3.y-33.31;
   this.P2x = p2.x;
   this.P2y = p2.y-16.655;
   //pour actualiser dans la scene
   this.actualisation = function () {
    posCamera();
    reAffichage();
   }; // fin this.actualisation
 }; // fin de la fonction menuGUI

 // ajout de la camera dans le menu
 ajoutCameraGui(gui,menuGUI,camera);
 //ajout du menu pour actualiser l'affichage
 gui.add(menuGUI, "actualisation");
 gui.add(menuGUI, "P3x",-2.25,2.25).onChange(function(){
   scene.remove(p3_sphere);
   scene.remove(bezier);
   p3.x = menuGUI.P3x;
   bezier = traceBezier([p1,p2,p3],10);
   p3_sphere = test_point(p3);
   scene.add(p3_sphere);
   scene.add(bezier);
 })
 gui.add(menuGUI, "P3y",-3,3.66).onChange(function(){
   scene.remove(p3_sphere);
   scene.remove(bezier);
   p3.y = menuGUI.P3y+33.31;
   bezier = traceBezier([p1,p2,p3],10);
   p3_sphere = test_point(p3);
   scene.add(p3_sphere);
   scene.add(bezier);
 })
 gui.add(menuGUI, "P2x",-2.25,2.25).onChange(function(){
   scene.remove(p2_sphere);
   scene.remove(bezier);
   p2.x = menuGUI.P2x;
   bezier = traceBezier([p1,p2,p3],10);
   p2_sphere = test_point(p2);
   scene.add(p2_sphere);
   scene.add(bezier);
 })
 gui.add(menuGUI, "P2y",-3,13.66).onChange(function(){
   scene.remove(p2_sphere);
   scene.remove(bezier);
   p2.y = menuGUI.P2y+16.655;
   bezier = traceBezier([p1,p2,p3],10);
   p2_sphere = test_point(p2);
   scene.add(p2_sphere);
   scene.add(bezier);
 })
 menuGUI.actualisation();
 //********************************************************
 //
 //  F I N     M E N U     G U I
 //
 //********************************************************
 renduAnim();

  // definition des fonctions idoines
 function posCamera(){
  camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom),menuGUI.camerayPos*testZero(menuGUI.cameraZoom),menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
  camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
  actuaPosCameraHTML();
 }

 //affichage dans la page HTML
 function actuaPosCameraHTML(){
  document.forms["controle"].PosX.value=testZero(menuGUI.cameraxPos);
  document.forms["controle"].PosY.value=testZero(menuGUI.camerayPos);
  document.forms["controle"].PosZ.value=testZero(menuGUI.camerazPos);
  document.forms["controle"].DirX.value=testZero(menuGUI.cameraxDir);
  document.forms["controle"].DirY.value=testZero(menuGUI.camerayDir);
  document.forms["controle"].DirZ.value=testZero(menuGUI.camerazDir);
 } // fin fonction posCamera
  // ajoute le rendu dans l'element HTML
 document.getElementById("webgl").appendChild(rendu.domElement);

  // affichage de la scene
 rendu.render(scene, camera);


 function reAffichage() {
  setTimeout(function () {
   posCamera();
 }, 200);// fin setTimeout(function ()
    // render avec requestAnimationFrame
  rendu.render(scene, camera);
 }// fin fonction reAffichage()


  function renduAnim() {
    stats.update();
    // render avec requestAnimationFrame
    requestAnimationFrame(renduAnim);
// ajoute le rendu dans l'element HTML
    //controls.update();
    rendu.render(scene, camera);
  }

} // fin fonction init()
