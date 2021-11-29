function initPiste(scene) {

  let rond_rouge = new THREE.RingGeometry( 1.88, 1.22, 50 );
  rond_rouge.translate(0,33.31,0);
  let materialRouge = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
  let mesh_rond_rouge = new THREE.Mesh(rond_rouge, materialRouge);

  let rond_bleu = new THREE.RingGeometry(0.66, 0.15, 50);
  rond_bleu.translate(0,33.31,0);
  let materialBleu = new THREE.MeshBasicMaterial( {color: 0x0000ff, side: THREE.DoubleSide} );
  let mesh_rond_bleu = new THREE.Mesh(rond_bleu, materialBleu);


  let ptDepart1 = new THREE.Vector3(-2.25,0,0);
  let ptDepart2 = new THREE.Vector3(2.25,0,0);
  segment(scene, ptDepart1, ptDepart2);

  let zone_maison1 = new THREE.Vector3(-2.25,29.65,0);
  let zone_maison2 = new THREE.Vector3(2.25,29.65,0);
  segment(scene, zone_maison1, zone_maison2);

  let piste = new THREE.Group();

  piste.add(mesh_rond_rouge);
  piste.add(mesh_rond_bleu);


  let materialGris = new THREE.MeshBasicMaterial( {color: 0xd3d3d3, side: THREE.DoubleSide} );
  //bordures piste en x = -2.25 et 2.25
  //bordures piste en y = -5.03 et 36,97
  let coin1 = new THREE.Vector3(-2.25, -5.03, 0);  //tracePoint(scene, coin1);
  let coin2 = new THREE.Vector3(-2.25, 36.97, 0);  //tracePoint(scene, coin2);
  let coin3 = new THREE.Vector3(2.25, 36.97, 0);   //tracePoint(scene, coin3);
  let coin4 = new THREE.Vector3(2.25, -5.03, 0);   //tracePoint(scene, coin4);
  //bordures rectangle exterieur piste à +0.5
  let coin5 = new THREE.Vector3(-2.75, -5.53, 0);  //tracePoint(scene, coin5);
  let coin6 = new THREE.Vector3(-2.75, 37.47, 0);  //tracePoint(scene, coin6);
  let coin7 = new THREE.Vector3(2.75, 37.47, 0);   //tracePoint(scene, coin7);
  let coin8 = new THREE.Vector3(2.75, -5.53, 0);   //tracePoint(scene, coin8);

  let long1 = new THREE.PlaneGeometry(0.5,43);
  long1.translate(2.5,15.97,0);
  let long1Mesh = new THREE.Mesh(long1, materialGris);
  let long2 = new THREE.PlaneGeometry(0.5,43);
  long2.translate(-2.5,15.97,0);
  let long2Mesh = new THREE.Mesh(long2, materialGris);
  let larg1 = new THREE.PlaneGeometry(5.5,0.5);
  larg1.translate(0,-5.28,0);
  let larg1Mesh = new THREE.Mesh(larg1, materialGris);
  let larg2 = new THREE.PlaneGeometry(5.5,0.5);
  larg2.translate(0,37.22,0);
  let larg2Mesh = new THREE.Mesh(larg2, materialGris);



  piste.add(long1Mesh);
  piste.add(long2Mesh);
  piste.add(larg1Mesh);
  piste.add(larg2Mesh);


  return piste;
}
