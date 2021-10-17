//affichage du repere dans la scene
function repere(MaScene){
    var PointO3 = new THREE.Vector3( 0,0,0 );
    var vecI = new THREE.Vector3( 1, 0, 0 );
    var vecJ = new THREE.Vector3( 0, 1, 0 );
    var vecK = new THREE.Vector3( 0, 0, 1 );
    vecteur(MaScene,PointO3,vecI, 0xFF0000, 0.25, 0.125 );
    vecteur(MaScene,PointO3,vecJ, 0x00FF00, 0.25, 0.125 );
    vecteur(MaScene,PointO3,vecK, 0x0000FF, 0.25, 0.125 );
}

const PrecisionArrondi=50;
// test si un nombre est nul
const epsilon = 0.00000001;
function testZero(x){
  var val=parseFloat(Number(x).toPrecision(PrecisionArrondi));
  if (parseFloat(Math.abs(x).toPrecision(PrecisionArrondi))<epsilon) val=0;
  return val;
}

function equateur(i){
  let tab = new Array(i+1);
  for(k=0;k<tab.length;k++){
    let t2 = (k/i*Math.PI*2);
    let x = 1*Math.cos(t2);
    let y = 1*Math.sin(t2);
    let z = 0;
    tab[k] = new THREE.Vector3(x,y,z);
    console.log("Point "+k+" : {"+x+","+y+","+z+"}");
  }
  return tab;
 }

//vecteur normal unitaire a une face
function vecteurProdVec(MaScene,A,u,v,CoulHexa,longCone,RayonCone){
 let w = new THREE.Vector3(0,0,0);
 let C = new THREE.Vector3(0,0,0);
 w.crossVectors(u,v);
 w.normalize();
 C.addVectors(A,w);
 vecteur(MaScene,A,C,CoulHexa,longCone,RayonCone);
}

//vecteur AB qui est une fleche
function vecteur(MaScene,A,B,CoulHexa,longCone,RayonCone){
 var vecAB = new THREE.Vector3( B.x-A.x, B.y-A.y, B.z-A.z );
 vecAB.normalize();
 MaScene.add( new THREE.ArrowHelper( vecAB, A, B.distanceTo(A), CoulHexa, longCone, RayonCone ));
}

function tracePoint(MaScene,A,coul){
  sphereGeom = new THREE.SphereGeometry(0.05,10,10);
  if(coul == undefined)mesh = new THREE.Mesh(sphereGeom,new THREE.MeshBasicMaterial({color: 0x999999}));
  else mesh = new THREE.Mesh(sphereGeom,new THREE.MeshBasicMaterial({color: coul}));
  mesh.position.x = A.x;
  mesh.position.y = A.y;
  mesh.position.z = A.z;
  MaScene.add(mesh)
}

function segment(MaScene, A, B) {
  CoulHexa = 0x000000;
  epai = 1;
  var geometry = new THREE.Geometry();
  geometry.vertices.push(A,B);
  let segAB = new THREE.Line(geometry, new THREE.LineDashedMaterial({
    color: CoulHexa, linewidth: epai
  }))
  MaScene.add(segAB)
}

function traceBezier(tabPoints,nbPts){
  if(tabPoints.length==3){
    cbeBez = new THREE.QuadraticBezierCurve3 (tabPoints[0], tabPoints[1], tabPoints[2]);
  }else cbeBez = new THREE.CubicBezierCurve3(tabPoints[0],tabPoints[1],tabPoints[2],tabPoints[3]);
  let cbeGeometry = new THREE.Geometry();
  cbeGeometry.vertices = cbeBez.getPoints(nbPts);
  let material = new THREE.LineBasicMaterial({
    color : "#00FF00",
    linewidth: 1
  });
  let Bezier = new THREE.Line(cbeGeometry, material);
  return Bezier;
}

function latheBezTab(nbPts,nbPtsRot,tab,coul,opacite,bolTranspa){
  material = new THREE.MeshPhongMaterial({
    color: coul,
    opacity: opacite,
    transparent: bolTranspa,
    emissive: 0x000000,
    flatShading: true,
    shininess: 30,
    side: THREE.DoubleSide,
  })

  bezier = traceBezier(tab,nbPts);
  lathe = new THREE.LatheGeometry(bezier.geometry.vertices,nbPtsRot,0,Math.PI*2);
  mesh = new THREE.Mesh(lathe,material);
  return mesh;
}

// affichage des composantes dans la page HTML
function afficheVecteur(V,nom,lieu){
 var mes = nom+" : (";
 for(var i=0;i<2;i++)
   mes+=V.getComponent(i)+" , ";
 mes+=V.getComponent(2)+" ) <br /><br /> Avec TestZero :<br />";
 mes += nom+" : (";
 for(var i=0;i<2;i++)
   mes+=testZero(V.getComponent(i))+" , ";
 mes+=testZero(V.getComponent(2))+" ) <br />";
 document.getElementById(lieu).innerHTML+=mes;
}
