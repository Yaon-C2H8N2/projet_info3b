function initPiste(scene) {
  fond = new THREE.PlaneGeometry(3,8,0);
  materialBlanc = new THREE.MeshBasicMaterial( {color: 0xd3d3d3, side: THREE.DoubleSide} );
  mesh_fond = new THREE.Mesh(fond, materialBlanc);
  scene.add(mesh_fond);

  rond_rouge = new THREE.RingGeometry( 0.5, 0.8, 20 );
  rond_rouge.translate(0,3,0.01);
  materialRouge = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
  mesh_rond_rouge = new THREE.Mesh(rond_rouge, materialRouge);
  scene.add(mesh_rond_rouge);

  rond_bleu = new THREE.RingGeometry(0.1, 0.3, 20);
  rond_bleu.translate(0,3,0.01);
  materialBleu = new THREE.MeshBasicMaterial( {color: 0x0000ff, side: THREE.DoubleSide} );
  mesh_rond_bleu = new THREE.Mesh(rond_bleu, materialBleu);
  scene.add(mesh_rond_bleu);

  //merge piste
  /*piste = new THREE.Geometry();

  mesh_fond.updateMatrix();
  piste.merge(mesh_fond.geometry, mesh_fond.matrix);

  mesh_rond_rouge.updateMatrix();
  piste.merge(mesh_rond_rouge.geometry, mesh_rond_rouge.matrix);

  mesh_rond_bleu.updateMatrix();
  piste.merge(mesh_rond_bleu.geometry, mesh_rond_bleu.matrix);

  //piste.scale.set(2,2,2);
  mesh_piste = new THREE.Mesh(piste,MaterialPhong);
  //scene.add(mesh_piste);
*/
//pas possible prcq pas possible plus de couleur
}
