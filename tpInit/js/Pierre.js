function initPierre(material){
  //traçage des différents cylindres
  let pierre = new THREE.Group();
  let nbFacesCylindres = 10;
  let poigne_horizontale = new THREE.CylinderGeometry(0.2,0.2,1,nbFacesCylindres);
  let mesh_poigne_horizontale = new THREE.Mesh(poigne_horizontale,material);
  let poigne_verticale = new THREE.CylinderGeometry(0.2,0.2,0.5,nbFacesCylindres);
  let mesh_poigne_verticale = new THREE.Mesh(poigne_verticale,material);
  let poigne_base = new THREE.CylinderGeometry(0.8,0.8,0.2,nbFacesCylindres*2);
  let mesh_poigne_base = new THREE.Mesh(poigne_base,material);

  //déplacement des cylindres aux positions souhaitées
  poigne_verticale.translate(0,0.35,0.6);
  poigne_horizontale.rotateX(Math.PI/2);
  poigne_horizontale.translate(0,0.8,-0.1);

  //merge des cylindres
  let poigne = new THREE.Geometry();
  mesh_poigne_base.updateMatrix();
  poigne.merge(mesh_poigne_base.geometry, mesh_poigne_base.matrix);
  mesh_poigne_verticale.updateMatrix();
  poigne.merge(mesh_poigne_verticale.geometry, mesh_poigne_verticale.matrix);
  mesh_poigne_horizontale.updateMatrix();
  poigne.merge(mesh_poigne_horizontale.geometry, mesh_poigne_horizontale.matrix);

  //création de la jointure des cylindres de la poignée
  let tabHaut = [];
  let tabBas = [];
  for(let i=0;i<nbFacesCylindres;i++){
    if(i<(nbFacesCylindres-1)/2){
      tabHaut.push(poigne_verticale.vertices[i]);
      tabBas.push(poigne_horizontale.vertices[(nbFacesCylindres)/2-i]);
    }else{
      tabHaut.push(poigne_verticale.vertices[i]);
      tabBas.push(poigne_horizontale.vertices[((nbFacesCylindres)*1.5-i)%nbFacesCylindres]);
    }
  }

  //merge de la jointure au mesh final
  for(let i=0;i<tabBas.length;i++){
    let faceGeom = new THREE.Geometry();
    faceGeom.vertices = [tabBas[i],tabHaut[i],tabHaut[(i+1)%tabHaut.length],tabBas[(i+1)%tabBas.length]];
    faceGeom.faces = [new THREE.Face3(0,1,2),new THREE.Face3(0,2,3)]
    let faceQuad = new THREE.Mesh(faceGeom);
    faceQuad.updateMatrix();
    poigne.merge(faceQuad.geometry, faceQuad.matrix);
  }

  //affichage de la poignée dans la scene
  mesh_poigne = new THREE.Mesh(poigne,material);
  mesh_poigne.rotateOnWorldAxis(new THREE.Vector3(1,0,0),Math.PI/2);
  pierre.add(mesh_poigne);

  //lathe intermédiaire
  pi1 = new THREE.Vector3(1.5,-0.75,0);
  pi3 = new THREE.Vector3(1.5,-1.25,0);
  pi2 = new THREE.Vector3((pi1.x+pi3.x)/2,(pi1.y+pi3.y)/2,(pi1.z+pi3.z)/2);
  let lathei = latheBezTab(nbFacesCylindres,nbFacesCylindres*2,[pi1,pi2,pi3],material.color,material.opacity,material.transparent);
  lathei.rotateOnWorldAxis(new THREE.Vector3(1,0,0),Math.PI/2);
  pierre.add(lathei);

  //première lathe
  let p1 = poigne_base.vertices[nbFacesCylindres*2+nbFacesCylindres/2];
  let p3 = pi1
  let p2 = new THREE.Vector3(p3.x,p1.y,0);
  let lathe1 = latheBezTab(nbFacesCylindres,nbFacesCylindres*2,[p1,p2,p3],0x999999,1,false)
  lathe1.rotateOnWorldAxis(new THREE.Vector3(1,0,0),Math.PI/2);
  pierre.add(lathe1);

  //deuxième lathe
  let hauteur = Math.abs(p3.y-p1.y);
  let p4 = pi3
  let p5 = p4.clone();
  p5.y = p5.y-hauteur;
  let p6 = new THREE.Vector3(0,p5.y,0);
  let lathe2 = latheBezTab(nbFacesCylindres,nbFacesCylindres*2,[p4,p5,p6],0x999999,1,false);
  lathe2.rotateOnWorldAxis(new THREE.Vector3(1,0,0),Math.PI/2);
  pierre.add(lathe2);

  //diamètre max de la pierre = plus grand cylindre entre lathes.
  //diamètre max réel = 0.3m donc 0.1*diamètre max de la pierre.
  pierre.scale.x = 0.1;
  pierre.scale.y = 0.1;
  pierre.scale.z = 0.1;

  //mise en position de la pierre
  pierre.position.z = 0.175;
  pierre.rotateZ(Math.PI);

  return pierre;
}

let tir = 0;
function tir_pierre(scene,camera,pierre,pasTir,p0,p1,p2,balais,balai2){
  setTimeout(function(){
    vitesse = pasTir*calculDistance(p0,p2)*16.6;
    if(tir<=1 && !checkCollisionPierre(pierre,vitesse) && !checkCollisionBords(pierre)){
      //progression du tir
      pierre.position.y = om(tir,p0,p1,p2).y;
      pierre.position.x = om(tir,p0,p1,p2).x;
      balais.position.y = pierre.position.y;
      balais.position.x = pierre.position.x+Math.sin(tir*75)/2;
      balai2.position.y = pierre.position.y+1.5;
      balai2.position.x = pierre.position.x-Math.sin(tir*75)/2;
      tir += pasTir;
      //positionnement de la caméra au dessus de la maison vers la fin du tir
      if(pierre.position.y<25){
        camera.position.set(pierre.position.x,pierre.position.y-5,pierre.position.z+1);
        camera.lookAt(pierre.position.x,pierre.position.y,pierre.position.z);
      }else if(pierre.position.y>29.65){
        scene.remove(balais);
        scene.remove(balai2);
        camera.position.set(0,33.31,25);
        camera.lookAt(0,33.31,0);
      }else{
        camera.position.set(0,33.31,25);
        camera.lookAt(0,33.31,0);
      }
      tir_pierre(scene,camera,pierre,pasTir,p0,p1,p2,balais,balai2);
    }else{
      //fin du tir
      scene.remove(balais);
      scene.remove(balai2);
      tir = 0;
      //retour caméra position d'origine
      setTimeout(function(){
        camera.position.set(0*6,-6*6,6*6);
        camera.lookAt(0,6,6);
      },1500);
    }
  }, 16.6);
};

function checkCollisionPierre(pierre,vitesse){
  //calcul de la distance avec toutes les pierre en jeu
  for(let i=0;i<tabPierres.length;i++){
    if(pierre != tabPierres[i] && calculDistance(tabPierres[i].position,pierre.position)<=0.3){
      //calcul du vecteur directeur de la trajectoire après collision
      let x = tabPierres[i].position.x-pierre.position.x;
      let y = tabPierres[i].position.y-pierre.position.y;
      let z = tabPierres[i].position.z-pierre.position.z;
      let vec =  new THREE.Vector3(x,y,z);
      //longueur du vecteur est de 0.15m, multiplié par 60 fps on obtient la valeur par laquelle diviser la vitesse pour le pas
      rebond(vitesse/(0.15*60),pierre.position,vec,tabPierres[i]);
      return true;
    }
  }
  return false;
}

function checkCollisionBords(pierre){
  if(pierre.position.x < -2.10 || pierre.position.x > 2.10){
    pierre.parent.remove(pierre);
    tabPierres.splice(tabPierres.indexOf(pierre),1);
    return true;
  }
  else if(pierre.position.y > 36.82){
    pierre.parent.remove(pierre);
    tabPierres.splice(tabPierres.indexOf(pierre),1);
    return true;
  }else return false;
}

function rebond(vitesse,origine,vecteur,pierre){
  //début animation
  setTimeout(function(){
    //si distance origine>pierre inférieure au rayon de la pierre pas de détection de collision
    if(calculDistance(origine,pierre.position)<=0.3){
      pierre.position.x = pierre.position.x + vitesse*vecteur.x;
      pierre.position.y = pierre.position.y + vitesse*vecteur.y;
      rebond(vitesse,origine,vecteur,pierre);
    }
    //deplacement si vitesse assez élevée et pas de collision avec bord
    else if(vitesse>0.001 && !checkCollisionBords(pierre)){
      pierre.position.x = pierre.position.x + vitesse*vecteur.x;
      pierre.position.y = pierre.position.y + vitesse*vecteur.y;
      //décélération
      vitesse = vitesse*0.9;
      //check collision car en dehors de la pierre d'origine
      checkCollisionPierre(pierre,vitesse)
      rebond(vitesse,origine,vecteur,pierre);
    }else{
      //fin du rebond
    }
  },16.6);
}
