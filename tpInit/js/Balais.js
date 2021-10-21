/*function initBalai(scene) {
  manche = new THREE.CylinderGeometry(0.03, 0.03, 2, 50);
  mesh_manche = new THREE.Mesh(manche, MaterialPhong);

  rect_balai = new THREE.BoxGeometry(1,0.05,0.15);
  rect_balai.translate(0,-1,0);
  mesh_rect_balai = new THREE.Mesh(rect_balai, MaterialPhong);

  poil_balai = new THREE.ConeGeometry(0.01, -0.1, 20);
  poil_balai.translate(0,-1.075,0);
  mesh_poil_balai = new THREE.Mesh(poil_balai, MaterialPhong);

  poil_balai2 = new THREE.ConeGeometry(0.01, -0.1, 20);
  poil_balai2.translate(0.25,-1.075,0);
  mesh_poil_balai2 = new THREE.Mesh(poil_balai2, MaterialPhong);

  poil_balai3 = new THREE.ConeGeometry(0.01, -0.1, 20);
  poil_balai3.translate(-0.25,-1.075,0.00);
  mesh_poil_balai3 = new THREE.Mesh(poil_balai3, MaterialPhong);


  //merge du balai
  balai = new THREE.Geometry();

  mesh_manche.updateMatrix();
  balai.merge(mesh_manche.geometry, mesh_manche.matrix);

  mesh_rect_balai.updateMatrix();
  balai.merge(mesh_rect_balai.geometry, mesh_rect_balai.matrix);

  mesh_poil_balai.updateMatrix();
  balai.merge(mesh_poil_balai.geometry, mesh_poil_balai.matrix);

  mesh_poil_balai2.updateMatrix();
  balai.merge(mesh_poil_balai2.geometry, mesh_poil_balai2.matrix);

  mesh_poil_balai3.updateMatrix();
  balai.merge(mesh_poil_balai3.geometry, mesh_poil_balai3.matrix);

  mesh_balai = new THREE.Mesh(balai, MaterialPhong);

  scene.add(mesh_balai);

}*/
 //creation balai
 MaterialPhong = new THREE.MeshPhongMaterial({
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

function initBalai(scene) {
  //creation base Balai
  baseBalai = new THREE.BoxGeometry(0.06/*largeur*/, 0.2/*longueur*/, 0.03/*eppaisseur*/)
  meshBaseBalai = new THREE.Mesh(baseBalai, MaterialPhong);

  //creation manche balai
  mancheBalai = new THREE.CylinderGeometry(0.02, 0.01, 1.4, 10);
  mancheBalai.translate(0,0.7,0);
  meshMancheBalai = new THREE.Mesh(mancheBalai, MaterialPhong);
  meshMancheBalai.rotation.x = Math.PI/2;
  meshMancheBalai.rotation.z = -0.4;


  balai = new THREE.Group();
  balai.add(meshBaseBalai);
  balai.add(meshMancheBalai)
  return balai;
}
