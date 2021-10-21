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
   let balai = new THREE.Group();
  //creation base Balai
   let baseBalai = new THREE.BoxGeometry(0.06/*largeur*/, 0.2/*longueur*/, 0.03/*eppaisseur*/)
   let meshBaseBalai = new THREE.Mesh(baseBalai, MaterialPhong);

  //creation manche balai
   let mancheBalai = new THREE.CylinderGeometry(0.02, 0.01, 1.4, 10);
  mancheBalai.translate(0,0.7,0);
  let meshMancheBalai = new THREE.Mesh(mancheBalai, MaterialPhong);
  meshMancheBalai.rotation.x = Math.PI/2;
  meshMancheBalai.rotation.z = -0.4;

  balai.add(meshBaseBalai);
  balai.add(meshMancheBalai);

  //creations cones balai
  cone1 = new THREE.ConeGeometry( 0.01, 0.01, 10 );
  for(let j=0; j<3; j++) {
    for(let i=0; i<7; i++) {
      let cone = cone1.clone();
      cone.translate(0.02-j*0.02, 0.02, 0.09-i*0.03);
      cone.rotateX(-Math.PI/2);
      let meshCone = new THREE.Mesh(cone, MaterialPhong);
      balai.add(meshCone);
    }
  }

 balai.position.y = 1;
 let balai2 = balai.clone();
 balai2.rotateZ(Math.PI);
 balai2.position.y = 1.5;

 let groupeBalai = new THREE.Group();
 groupeBalai.add(balai);
 groupeBalai.add(balai2);

groupeBalai.position.z = 0.018;
 return groupeBalai;

}
