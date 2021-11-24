const borneVue=6;//amplitude de deplacement de la camera

function init(){
 var stats = initStats();
 // creation de rendu et de la taille
 let rendu = new THREE.WebGLRenderer({ antialias: true });
 rendu.shadowMap.enabled = true;
 scene = new THREE.Scene();
 let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
 rendu.shadowMap.enabled = true;
 rendu.setClearColor(new THREE.Color(0xFFFFFF));
 rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
 cameraLumiere(scene,camera);
 lumiere(scene);
 //repere(scene);
 //controls = new THREE.TrackballControls(camera);
 //plans contenant deux axes du repere
 //planRepere(scene);

 let Bleu = new THREE.MeshPhongMaterial({
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
 let Rouge = new THREE.MeshPhongMaterial({
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

 tabPierres = []; //À FAIRE : trouver un moyen d'en faire une variable locale
 let cptTir = 0;
 let tirEnCours = false;
 let pierre_courante = initPierre(Rouge);
 let balais = initBalais(Rouge);
 let balai2 = initBalais(Rouge);
 balai2.rotateZ(Math.PI);
 scene.add(pierre_courante);
 let piste = initPiste(scene);
 scene.add(piste);

 //points de contrôles courbe de tir
 let p0 = new THREE.Vector3(0,0,0);
 let p2 = new THREE.Vector3(0,33.31,0);
 let p1 = new THREE.Vector3(0,p2.y/2,0);
 let p2_sphere = point(p1);
 let p3_sphere = point(p2);
 scene.add(p2_sphere);
 scene.add(p3_sphere);

 //courbe de Bezier visible du joueur != courbe de tracjectoire
 let bezier = traceBezier([p0,p1,p2],10);
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

   this.P2x = p2.x;
   this.P2y = p2.y-33.31;
   this.P1x = p1.x;
   this.P1y = p1.y-16.655;

   this.vueMaison = function(){
     if(camera.position.y != 33.31){
       camera.position.set(0,33.31,25);
       camera.lookAt(0,33.31,0);
     }else{
       camera.position.set(0*6,-6*6,6*6);
       camera.lookAt(0,6,6);
     }
   }

   this.tirPierre = function(){
      if(tirEnCours == false && cptTir <10){
        cptTir++;
        console.log("Tir n°"+cptTir);
        tabPierres.push(pierre_courante);
        let pasTir = (2.5/calculDistance(p0,p2))/16.6;
        scene.add(balais);
        scene.add(balai2);
        tir_pierre(scene,camera,pierre_courante,pasTir,p0.clone(),p1.clone(),p2.clone(),balais,balai2);
        tirEnCours = true;
        //verrouiller menu GUI
        console.log("Tir en cours, ce n'est pas une simulation, la pierre peut avoir un comportement pour le moins \"étrange\"");
        setTimeout(function(){
          if(pierre_courante.children[0].material.color.r == 1){
            pierre_courante = initPierre(Bleu);
            balais = initBalais(Bleu);
            balai2 = initBalais(Bleu);
            balai2.rotateZ(Math.PI);
          }else{
            pierre_courante = initPierre(Rouge);
            balais = initBalais(Rouge);
            balai2 = initBalais(Rouge);
            balai2.rotateZ(Math.PI);
          }
          scene.add(pierre_courante);
          //deverouiller menu GUI
          tirEnCours = false;
          let distanceRouge = 100;
          let distanceBleu = 100;
          triDistance(tabPierres);
          //À FAIRE : ajout calcul des scores
        },10000);
      }
   }

   //pour actualiser dans la scene
   this.actualisation = function () {
    posCamera();
    reAffichage();
   }; // fin this.actualisation
 }; // fin de la fonction menuGUI

 // ajout de la camera dans le menu
 //ajoutCameraGui(gui,menuGUI,camera);
 //ajout du menu pour actualiser l'affichage
 //gui.add(menuGUI, "actualisation");
 gui.add(menuGUI, "P2x",-2.25,2.25).onChange(function(){
   scene.remove(p3_sphere);
   scene.remove(bezier);
   p2.x = menuGUI.P2x;
   bezier = traceBezier([p0,p1,p2],10);
   p3_sphere = point(p2);
   scene.add(p3_sphere);
   scene.add(bezier);
 });
 gui.add(menuGUI, "P2y",-3.66,3.66).onChange(function(){
   scene.remove(p3_sphere);
   scene.remove(bezier);
   p2.y = menuGUI.P2y+33.31;
   bezier = traceBezier([p0,p1,p2],10);
   p3_sphere = point(p2);
   scene.add(p3_sphere);
   scene.add(bezier);
 });
 gui.add(menuGUI, "P1x",-2.25,2.25).onChange(function(){
   scene.remove(p2_sphere);
   scene.remove(bezier);
   p1.x = menuGUI.P1x;
   bezier = traceBezier([p0,p1,p2],10);
   p2_sphere = point(p1);
   scene.add(p2_sphere);
   scene.add(bezier);
 });
 gui.add(menuGUI, "P1y",-3,12.995).onChange(function(){
   scene.remove(p2_sphere);
   scene.remove(bezier);
   p1.y = menuGUI.P1y+16.655;
   bezier = traceBezier([p0,p1,p2],10);
   p2_sphere = point(p1);
   scene.add(p2_sphere);
   scene.add(bezier);
 });
 gui.add(menuGUI, "vueMaison");
 gui.add(menuGUI, "tirPierre");
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
 }
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
