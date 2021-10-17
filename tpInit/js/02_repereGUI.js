const borneVue=6;//amplitude de deplacement de la camera

function init(){
 var stats = initStats();
    // creation de rendu et de la taille
 let rendu = new THREE.WebGLRenderer({ antialias: true });
 rendu.shadowMap.enabled = true;
 scene = new THREE.Scene();
 let result;
 let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
 rendu.shadowMap.enabled = true;
 rendu.setClearColor(new THREE.Color(0xFFFFFF));
 rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
 cameraLumiere(scene,camera);
 lumiere(scene);
 repere(scene);
 controls = new THREE.TrackballControls(camera);
 //plans contenant deux axes du repere
 //planRepere(scene);

 MaterialPhong = new THREE.MeshPhongMaterial({
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

 //traçage des différents cylindres
 nbFacesCylindres = 10;
 poigne_horizontale = new THREE.CylinderGeometry(0.2,0.2,1,nbFacesCylindres);
 mesh_poigne_horizontale = new THREE.Mesh(poigne_horizontale,MaterialPhong);

 poigne_verticale = new THREE.CylinderGeometry(0.2,0.2,0.5,nbFacesCylindres);
 mesh_poigne_verticale = new THREE.Mesh(poigne_verticale,MaterialPhong);

 poigne_base = new THREE.CylinderGeometry(0.8,0.8,0.2,nbFacesCylindres*2);
 mesh_poigne_base = new THREE.Mesh(poigne_base,MaterialPhong);

 //déplacement des cylindres aux positions souhaitées
 poigne_verticale.translate(0,0.35,0.6);
 poigne_horizontale.rotateX(Math.PI/2);
 poigne_horizontale.translate(0,0.8,-0.1);

 //merge des cylindres
 poigne = new THREE.Geometry();

 mesh_poigne_base.updateMatrix();
 poigne.merge(mesh_poigne_base.geometry, mesh_poigne_base.matrix);

 mesh_poigne_verticale.updateMatrix();
 poigne.merge(mesh_poigne_verticale.geometry, mesh_poigne_verticale.matrix);

 mesh_poigne_horizontale.updateMatrix();
 poigne.merge(mesh_poigne_horizontale.geometry, mesh_poigne_horizontale.matrix);

 //création de la jointure des cylindres de la poignée
 tabHaut = [];
 tabBas = [];
 for(i=0;i<nbFacesCylindres;i++){
   if(i<(nbFacesCylindres-1)/2){
     tabHaut.push(poigne_verticale.vertices[i]);
     tabBas.push(poigne_horizontale.vertices[(nbFacesCylindres)/2-i]);
   }else{
     tabHaut.push(poigne_verticale.vertices[i]);
     tabBas.push(poigne_horizontale.vertices[((nbFacesCylindres)*1.5-i)%nbFacesCylindres]);
   }
 }

 //merge de la jointure au mesh final
 for(i=0;i<tabBas.length;i++){
   faceGeom = new THREE.Geometry();
   faceGeom.vertices = [tabBas[i],tabHaut[i],tabHaut[(i+1)%tabHaut.length],tabBas[(i+1)%tabBas.length]];
   faceGeom.faces = [new THREE.Face3(0,1,2),new THREE.Face3(0,2,3)]
   faceQuad = new THREE.Mesh(faceGeom);
   faceQuad.updateMatrix();
   poigne.merge(faceQuad.geometry, faceQuad.matrix);
   //scene.add(faceQuad);
 }

 //affichage de la poignée dans la scene
 mesh_poigne = new THREE.Mesh(poigne,MaterialPhong);
 scene.add(mesh_poigne);

 //cylindre de la pierre
 cylindre_milieu = new THREE.CylinderGeometry(1.5,1.5,0.5,nbFacesCylindres*2);
 cylindre_milieu.translate(0,-1,0);
 mesh_cylindre_milieu = new THREE.Mesh(cylindre_milieu,MaterialPhong);
 scene.add(mesh_cylindre_milieu);

 //première lathe
 p1 = poigne_base.vertices[nbFacesCylindres*2+nbFacesCylindres/2];
 p3 = cylindre_milieu.vertices[nbFacesCylindres/2];
 p2 = new THREE.Vector3(p3.x,p1.y,0);
 /*scene.add(traceBezier([p1,p2,p3],10));
 tracePoint(scene,p1);
 tracePoint(scene,p2);
 tracePoint(scene,p3);*/
 scene.add(latheBezTab(nbFacesCylindres,nbFacesCylindres*2,[p1,p2,p3],0x999999,1,false));

 //deuxième lathe
 hauteur = Math.abs(p3.y-p1.y);
 p4 = cylindre_milieu.vertices[nbFacesCylindres*2+nbFacesCylindres/2];
 p5 = cylindre_milieu.vertices[nbFacesCylindres*2+nbFacesCylindres/2].clone();
 p5.y = p5.y-hauteur;
 p6 = new THREE.Vector3(p1.x,p5.y,0);
 /*scene.add(traceBezier([p4,p5,p6],10));
 tracePoint(scene,p4);
 tracePoint(scene,p5);
 tracePoint(scene,p6);*/
 scene.add(latheBezTab(nbFacesCylindres,nbFacesCylindres*2,[p4,p5,p6],0x999999,1,false));

 //********************************************************
 //
 //  D E B U T     M E N U     G U I
 //
 //********************************************************
 var gui = new dat.GUI();//interface graphique utilisateur
  // ajout du menu dans le GUI
 let menuGUI = new function () {
   this.cameraxPos = camera.position.x;
   this.camerayPos = camera.position.y;
   this.camerazPos = camera.position.z;
   this.cameraZoom = 1;
   //pb avec camera lockAt
   this.cameraxDir = 0;//camera.getWorldDirection().x;
   this.camerayDir = 0;//camera.getWorldDirection().y;
   this.camerazDir = 0;//camera.getWorldDirection().z;
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
   posCamera();//sphereGeom1.parameters.radius = 2;//
  }, 200);// fin setTimeout(function ()
    // render avec requestAnimationFrame
  rendu.render(scene, camera);
 }// fin fonction reAffichage()


  function renduAnim() {
    stats.update();
    // render avec requestAnimationFrame
    requestAnimationFrame(renduAnim);
// ajoute le rendu dans l'element HTML
    controls.update();
    rendu.render(scene, camera);
  }

} // fin fonction init()
