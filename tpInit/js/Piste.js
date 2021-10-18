function initPiste(scene) {
  fond = new THREE.PlaneGeometry(4.5,42,0);
  fond.translate(0,0,0);
  materialBlanc = new THREE.MeshBasicMaterial( {color: 0xd3d3d3, side: THREE.DoubleSide} );
  mesh_fond = new THREE.Mesh(fond, materialBlanc);

  //scene.add(mesh_fond);

  rond_rouge = new THREE.RingGeometry( 1.88, 1.22, 20 );
  rond_rouge.translate(0,17.34,0.01);
  materialRouge = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
  mesh_rond_rouge = new THREE.Mesh(rond_rouge, materialRouge);
  //scene.add(mesh_rond_rouge);

  rond_bleu = new THREE.RingGeometry(0.66, 0.15, 20);
  rond_bleu.translate(0,17.34,0.01);
  materialBleu = new THREE.MeshBasicMaterial( {color: 0x0000ff, side: THREE.DoubleSide} );
  mesh_rond_bleu = new THREE.Mesh(rond_bleu, materialBleu);
  //scene.add(mesh_rond_bleu);


  ptDepart1 = new THREE.Vector3(-2.25,0,0.01);
  ptDepart2 = new THREE.Vector3(2.25,0,0.01);
  segment(scene, ptDepart1, ptDepart2);

  piste = new THREE.Group();

  piste.add(mesh_fond);
  piste.add(mesh_rond_rouge);
  piste.add(mesh_rond_bleu);

  piste.position.y = 15,97;


  scene.add(piste);
}
