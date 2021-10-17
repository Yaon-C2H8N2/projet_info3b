function initPierre(scene,material){
  //traçage des différents cylindres
  nbFacesCylindres = 10;
  poigne_horizontale = new THREE.CylinderGeometry(0.2,0.2,1,nbFacesCylindres);
  mesh_poigne_horizontale = new THREE.Mesh(poigne_horizontale,material);

  poigne_verticale = new THREE.CylinderGeometry(0.2,0.2,0.5,nbFacesCylindres);
  mesh_poigne_verticale = new THREE.Mesh(poigne_verticale,material);

  poigne_base = new THREE.CylinderGeometry(0.8,0.8,0.2,nbFacesCylindres*2);
  mesh_poigne_base = new THREE.Mesh(poigne_base,material);

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
  mesh_poigne = new THREE.Mesh(poigne,material);
  scene.add(mesh_poigne);

  //cylindre de la pierre
  cylindre_milieu = new THREE.CylinderGeometry(1.5,1.5,0.5,nbFacesCylindres*2);
  cylindre_milieu.translate(0,-1,0);
  mesh_cylindre_milieu = new THREE.Mesh(cylindre_milieu,material);
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
  p6 = new THREE.Vector3(0,p5.y,0);
  /*scene.add(traceBezier([p4,p5,p6],10));
  tracePoint(scene,p4);
  tracePoint(scene,p5);
  tracePoint(scene,p6);*/
  scene.add(latheBezTab(nbFacesCylindres,nbFacesCylindres*2,[p4,p5,p6],0x999999,1,false));
}
