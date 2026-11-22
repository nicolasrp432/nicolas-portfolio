import * as THREE from 'three';

/** Procedural geometry; every surface is a mesh, with no bitmap or remote model. */
export function createKing() {
  const root = new THREE.Group();
  const definitions = [
    { name: 'Base', y: 0, profile: [[0,0],[.74,0],[.78,.06],[.78,.16],[.72,.23],[.69,.26],[.65,.34],[.57,.39],[0,.39]] },
    { name: 'Cuerpo', y: .39, profile: [[0,0],[.55,0],[.55,.08],[.44,.15],[.33,.3],[.24,.75],[.27,1.13],[.36,1.3],[.44,1.35],[0,1.35]] },
    { name: 'Collar', y: 1.74, profile: [[0,0],[.46,0],[.51,.07],[.51,.15],[.46,.22],[.32,.24],[.32,.32],[0,.32]] },
    { name: 'Corona', y: 2.06, profile: [[0,0],[.3,0],[.35,.12],[.44,.4],[.46,.45],[.44,.51],[.33,.54],[0,.54]] },
  ];
  const parts = definitions.map((d,index) => {
    const group = new THREE.Group(); group.name=d.name; group.position.y=d.y; group.userData={part:index,homeY:d.y};
    const geometry = new THREE.LatheGeometry(d.profile.map(([x,y])=>new THREE.Vector2(x,y)),48);
    const material = new THREE.MeshPhysicalMaterial({color:'#dd8450',metalness:.05,roughness:.16,transmission:.65,thickness:.7,ior:1.45,clearcoat:1,envMapIntensity:1.4});
    const add = (geo,position) => {
      const mesh=new THREE.Mesh(geo,material); if(position) mesh.position.copy(position);mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.part=index;group.add(mesh);
      const wire=new THREE.LineSegments(new THREE.WireframeGeometry(geo),new THREE.LineBasicMaterial({color:'#ebcab0',transparent:true,opacity:.3}));wire.position.copy(mesh.position);wire.visible=false;wire.userData.wire=true;group.add(wire);
    };
    add(geometry);
    if(index===3) {
      add(new THREE.BoxGeometry(.15,.55,.15),new THREE.Vector3(0,.79,0));
      add(new THREE.BoxGeometry(.43,.15,.15),new THREE.Vector3(0,.86,0));
    }
    root.add(group); return group;
  });
  return {root,parts};
}
