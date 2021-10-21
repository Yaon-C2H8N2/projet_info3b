function initPiste(scene) {
/*  fond = new THREE.PlaneGeometry(4.5,42,0);
  fond.translate(0,0,0);
  materialBlanc = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide} );
  mesh_fond = new THREE.Mesh(fond, materialBlanc);*/

  //scene.add(mesh_fond);

  rond_rouge = new THREE.RingGeometry( 1.88, 1.22, 20 );
  rond_rouge.translate(0,33.31,0);
  materialRouge = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
  mesh_rond_rouge = new THREE.Mesh(rond_rouge, materialRouge);
  //scene.add(mesh_rond_rouge);

  rond_bleu = new THREE.RingGeometry(0.66, 0.15, 20);
  rond_bleu.translate(0,33.31,0);
  materialBleu = new THREE.MeshBasicMaterial( {color: 0x0000ff, side: THREE.DoubleSide} );
  mesh_rond_bleu = new THREE.Mesh(rond_bleu, materialBleu);
  //scene.add(mesh_rond_bleu);


  ptDepart1 = new THREE.Vector3(-2.25,0,0);
  ptDepart2 = new THREE.Vector3(2.25,0,0);
  segment(scene, ptDepart1, ptDepart2);

  zone_maison1 = new THREE.Vector3(-2.25,29.65,0);
  zone_maison2 = new THREE.Vector3(2.25,29.65,0);
  segment(scene, zone_maison1, zone_maison2);

  piste = new THREE.Group();

  //piste.add(mesh_fond);
  piste.add(mesh_rond_rouge);
  piste.add(mesh_rond_bleu);

  //piste.position.y = 15.97;


  materialGris = new THREE.MeshBasicMaterial( {color: 0xd3d3d3, side: THREE.DoubleSide} );
  //bordures piste en x = -2.25 et 2.25
   coin1 = new THREE.Vector3(-2.25, -5.03, 0);  tracePoint(scene, coin1);
   coin2 = new THREE.Vector3(-2.25, 36.97, 0);  tracePoint(scene, coin2);
   coin3 = new THREE.Vector3(2.25, 36.97, 0);   tracePoint(scene, coin3);
   coin4 = new THREE.Vector3(2.25, -5.03, 0);   tracePoint(scene, coin4);
   coin5 = new THREE.Vector3(-2.75, -5.53, 0);  tracePoint(scene, coin5);
   coin6 = new THREE.Vector3(-2.75, 37.47, 0);  tracePoint(scene, coin6);
   coin7 = new THREE.Vector3(2.75, 37.47, 0);   tracePoint(scene, coin7);
   coin8 = new THREE.Vector3(2.75, -5.53, 0);   tracePoint(scene, coin8);

   long1 = new THREE.PlaneGeometry(0.5,43);
   long1.translate(2.5,15.97,0);
   long1Mesh = new THREE.Mesh(long1, materialGris);
   long2 = new THREE.PlaneGeometry(0.5,43);
   long2.translate(-2.5,15.97,0);
   long2Mesh = new THREE.Mesh(long2, materialGris);
   larg1 = new THREE.PlaneGeometry(5.5,0.5);
   larg1.translate(0,-5.28,0);
   larg1Mesh = new THREE.Mesh(larg1, materialGris);
   larg2 = new THREE.PlaneGeometry(5.5,0.5);
   larg2.translate(0,37.22,0);
   larg2Mesh = new THREE.Mesh(larg2, materialGris);



   piste.add(long1Mesh);
   piste.add(long2Mesh);
   piste.add(larg1Mesh);
   piste.add(larg2Mesh);
  //bordures piste en y = -5.03 et 36,97

  return piste;
}
