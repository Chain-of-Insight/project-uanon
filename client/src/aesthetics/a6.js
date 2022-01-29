/**
 * Project Uanon - Autumn code drawing
 * @author: drew@chainofinsight.com
 * Tree generator @extends: https://github.com/mattatz/THREE.Tree [@author: mattatz / http://mattatz.github.io/]
 **/

const THREE = require('three');

THREE.TreeGeometry = {
  build : function(tree) {
    let geometry = new THREE.Geometry();

    this.buildBranches(tree.root, geometry);
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    return geometry;
  },
  buildBranches : function(branch, geometry) {
    let radiusSegments = branch.radiusSegments;
    let heightSegments = branch.segments.length - 1;
    let vertices = [];
    let faces = [];
    let faceVertexUvs = [];
    let indices = [];
    let uvs = [];
    let index = 0;
    let offset = geometry.vertices.length;
    
    for (let y = 0; y <= heightSegments; y++) {
      let indicesRow = [];
      let segment = branch.segments[y];

      vertices = vertices.concat(segment.vertices);
      uvs.push(segment.uvs);
      
      for (let x = 0; x <= radiusSegments; x++) {
        indicesRow.push(index++);
      }

      indices.push(indicesRow);
    }

    for (let x = 0; x < radiusSegments; x++) {
      for(let y = 0; y < heightSegments; y++) {
        let cy = y, ny = y + 1;
        let cx = x, nx = x + 1;

        let v1 = indices[cy][cx] + offset;
        let v2 = indices[ny][cx] + offset;
        let v3 = indices[ny][nx] + offset;
        let v4 = indices[cy][nx] + offset;

        let uv1 = uvs[cy][cx];
        let uv2 = uvs[ny][cx];
        let uv3 = uvs[ny][nx];
        let uv4 = uvs[cy][nx];

        faces.push(new THREE.Face3(v1, v4, v2));
        faceVertexUvs.push([uv1, uv4, uv2]);

        faces.push(new THREE.Face3(v2, v4, v3));
        faceVertexUvs.push([uv2, uv4, uv3]);
      }
    }

    if (branch.from === null) {
      let bottom = branch.segments[0];

      vertices.push(bottom.position);
      indices.push(index++);

      let y = 0;

      for (let x = 0; x < radiusSegments; x++) {
        let v1 = indices[y][x] + offset;
        let v2 = indices[y][x + 1] + offset;
        let v3 = index - 1 + offset;

        let uv1 = uvs[y][x];
        let uv2 = uvs[y][x + 1];
        let uv3 = new THREE.Vector2(uv2.x, branch.uvOffset);

        faces.push(new THREE.Face3(v1, v3, v2));
        faceVertexUvs.push([uv1, uv3, uv2]);
      }
    } else {
      let from = branch.from;
      let y = 0;
      vertices = vertices.concat(from.vertices);

      let bottomIndices = [];
      for(let x = 0; x <= radiusSegments; x++) {
        bottomIndices.push((index++) + offset);
      }

      for (let x = 0; x < radiusSegments; x++) {
        let v0 = indices[y][x] + offset;
        let v1 = indices[y][x + 1] + offset;
        let v2 = bottomIndices[x];
        let v3 = bottomIndices[x + 1];

        let uv0 = uvs[y][x];
        let uv1 = uvs[y][x + 1];
        let uv2 = from.uvs[x];
        let uv3 = from.uvs[x + 1];

        faces.push(new THREE.Face3(v0, v3, v1));
        faceVertexUvs.push([uv0, uv3, uv1]);

        faces.push(new THREE.Face3(v0, v2, v3));
        faceVertexUvs.push([uv0, uv2, uv3]);
      }
    }

    geometry.vertices = geometry.vertices.concat(vertices);
    geometry.faces = geometry.faces.concat(faces);
    geometry.faceVertexUvs[0] = geometry.faceVertexUvs[0].concat(faceVertexUvs);

    let self = this;
    branch.children.forEach(function(child) {
      self.buildBranches(child, geometry);
    });
  },
  buildLineStrips : function(tree) {
    let vertices = [];
    let recur = function(branch) {
      let segments = branch.segments;
      for (let i = 0, n = segments.length; i < n - 1; i++) {
        let s0 = segments[i];
        let s1 = segments[i + 1];
        vertices.push(s0.position, s1.position);
      }

      branch.children.forEach(function(child) {
        recur(child);
      });
    };
    recur(tree.root);

    let geometry = new THREE.Geometry();
    geometry.vertices = vertices;
    return geometry;
  },
  calculateLength : function(tree) {
    return this.calculateSegmentLength(tree.root);
  },
  calculateSegmentLength : function(branch) {
    let longest = 0.0;
    let self = this;
    branch.children.forEach(function(child) {
      let len = self.calculateSegmentLength(child);
      if (len > longest) {
        longest = len;
      }
    });
    return longest + branch.calculateLength();
  }
};

THREE.TreeSpawner = function(params) {
  params = params || {};
  this.theta = params.theta || Math.PI * 0.5; 
  this.attenuation = params.attenuation || 0.75; 

  this.rootRange = params.rootRange || new THREE.Vector2(0.75, 1.0);
};

THREE.TreeSpawner.prototype = {
  spawn : function(branch, extension) {
    let theta = this.theta;
    let atten = this.attenuation;

    let htheta = theta * 0.5;
    let x = Math.random() * theta - htheta;
    let z = Math.random() * theta - htheta;
    let len = branch.length * atten;

    let rot = new THREE.Matrix4();
    let euler = new THREE.Euler(x, 0, z);
    rot.makeRotationFromEuler(euler);
    rot.multiply(branch.rotation);

    let segmentIndex;
    extension = extension || false;
    if (extension) {
      segmentIndex = branch.segments.length - 1;
    } else {
      segmentIndex = Math.floor((Math.random() * (this.rootRange.y - this.rootRange.x) + this.rootRange.x) * branch.segments.length);
    }

    let segment = branch.segments[segmentIndex];
    return new THREE.TreeBranch({
      from : segment,
      rotation : rot,
      length : len,
      uvOffset : segment.uvOffset,
      uvLength : branch.uvLength,
      generation : branch.generation + 1,
      generations : branch.generations,
      radius : branch.radius,
      radiusSegments : branch.radiusSegments,
      heightSegments : branch.heightSegments
    });
  }
};

THREE.TreeBranch = function(params) {
  var from = params.from;
  this.rotation = params.rotation;
  this.length = params.length;

  this.generation = params.generation || 0;
  this.generations = params.generations;

  this.uvLength = params.uvLength || 10.0;
  this.uvOffset = params.uvOffset || 0.0;
  this.radius = params.radius || 0.1;
  this.radiusSegments = params.radiusSegments;
  this.heightSegments = params.heightSegments;

  if (from instanceof THREE.TreeSegment) {
    this.from = from;
    // this.position = from.position;
    this.position = from.position.clone().add(new THREE.Vector3(0, 1, 0).applyMatrix4(from.rotation).setLength(0.05));
  } else if(from instanceof THREE.Vector3) {
    this.from = null; // root branch
    this.position = from;
  } else {
    console.warning("from argument is missing");
  }

  let direction = (new THREE.Vector3(0, 1, 0)).applyMatrix4(this.rotation);
  this.to = this.position.clone().add(direction.setLength(this.length));

  this.segments = this.buildTreeSegments(this.radius, this.radiusSegments, direction, this.heightSegments);
  this.children = [];
}

THREE.TreeBranch.prototype = {

  buildTreeSegments : function(radius, radiusSegments, direction, heightSegments) {
    // randomize control point
    let theta = Math.PI * 0.25;
    let htheta = theta * 0.5;
    let x = Math.random() * theta - htheta;
    let z = Math.random() * theta - htheta;
    let rot = new THREE.Matrix4();
    let euler = new THREE.Euler(x, 0, z);
    rot.makeRotationFromEuler(euler);
    direction.applyMatrix4(rot);
    
    let controlPoint = this.position.clone().add(direction.setLength(this.length * 0.5));
    let curve = new THREE.CatmullRomCurve3([this.position, controlPoint, this.to]);
    let fromRatio = this.generation == 0 ? 1.0 : 1.0 - this.generation / (this.generations + 1);
    let toRatio = 1.0 - (this.generation + 1) / (this.generations + 1);
    let fromRadius = radius * fromRatio;
    let toRadius = radius * toRatio;
    let rotation = this.rotation;
    let segments = [];
    let uvLength = this.uvLength;
    let uvOffset = this.uvOffset;
    let points = curve.getPoints(heightSegments);

    if (this.from !== null) {
      uvOffset += this.from.position.distanceTo(points[0]) / uvLength;
    }

    segments.push(new THREE.TreeSegment(points[0], rotation, uvOffset, fromRadius, radiusSegments));

    for (let i = 1; i < heightSegments; i++) {
      let p0 = points[i];
      let p1 = points[i + 1];
      let ry = i / (heightSegments - 1);
      let radius = fromRadius + (toRadius - fromRadius) * ry;
      let d = p1.distanceTo(p0);
      uvOffset += d / uvLength;

      let segment = new THREE.TreeSegment(p0, rotation, uvOffset, radius, radiusSegments);
      segments.push(segment);
    }

    return segments;
  },
  branch : function(spawner, count) {
    for(let i = 0; i < count; i++) {
      this.spawn(spawner, i == 0);
    }
    this.children.forEach(function(child) {
      child.branch(spawner, count - 1);
    });
  },
  grow : function(spawner) {
    if (this.children.length <= 0) {
      this.branch(spawner, 1);
    } else {
      this.children.forEach(function(child) {
        child.grow(spawner);
      });
    }
  },
  spawn : function(spawner, extension) {
    let child = spawner.spawn(this, extension);
    this.children.push(child);
  },
  branchlets : function() {
    if (this.children.length == 0) {
      return this;
    } else {
      return Array.prototype.concat.apply(
        [],
        this.children.map(function(child) { return child.branchlets(); })
      );
    }
  },
  calculateLength : function() {
    let segments = this.segments;
    let length = 0;
    for (let i = 0, n = segments.length - 1; i < n; i++) {
        let p0 = segments[i].position;
        let p1 = segments[i + 1].position;
        length += p0.distanceTo(p1);
    }
    return length;
  }
};

THREE.TreeSegment = function(position, rotation, uvOffset, radius, radiusSegments) {
  this.position = position;
  this.rotation = rotation;
  this.uvOffset = uvOffset;
  this.radius = radius;
  this.vertices = [];
  this.uvs = [];
  this.build(radius, radiusSegments);
};

THREE.TreeSegment.prototype = {
  build : function(radius, radiusSegments) {
    let thetaLength = Math.PI * 2;

    for (let x = 0; x <= radiusSegments; x++) {
      let u = x / radiusSegments;
      let vertex = new THREE.Vector3(radius * Math.sin(u * thetaLength), 0, radius * Math.cos(u * thetaLength)).applyMatrix4(this.rotation).add(this.position);			
      this.vertices.push(vertex);
      this.uvs.push(new THREE.Vector2(u, this.uvOffset));
    }
  }
};

THREE.Tree = function(params, spawner) {
  params = params || {};
  let from = params.from || new THREE.Vector3();
  let rotation = new THREE.Matrix4();
  if (params.rotation) {
    if (params.rotation instanceof THREE.Euler) {
      var euler = params.rotation;
      rotation.makeRotationFromEuler(euler);
    } else if (params.rotation instanceof THREE.Matrix4) {
      rotation = params.rotation;
    }
  }

  let length = params.length || 3.0;
  let uvLength = params.uvLength || 10.0;
  let generations = (params.generations !== undefined) ? params.generations : 5;
  let radius = params.radius || 0.1;

  this.radiusSegments = params.radiusSegments || 8;
  this.heightSegments = params.heightSegments || 8;

  this.generations = generations;
  this.root = new THREE.TreeBranch({ 
    from : from,
    rotation : rotation,
    length : length,
    uvLength : uvLength,
    generation : 0,
    generations : this.generations,
    radius : radius,
    radiusSegments : this.radiusSegments,
    heightSegments : this.heightSegments
  });

  this.spawner = spawner || new THREE.TreeSpawner();
  this.root.branch(this.spawner, this.generations);
};

THREE.Tree.prototype = {
  grow : function(count, spawner) {
    spawner = spawner || this.spawner;
    this.generation++;
    this.root.grow(spawner, count);
  },
  branchlets : function() {
    return this.root.branchlets();
  }
};

//// * ////

let p = [];
let ambientLight, 
    hemisphereLight, 
    shadowLight, 
    geom, 
    mat,
    scene,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    renderer,
    camera,
    container,
    terra,
    tree,
    treeGeom,
    treeMesh,
    HEIGHT, 
    WIDTH;

function createScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;

  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  // 50% chance but non-uniform
  const doFog = Math.random() <= 0.5;
  if (doFog) {
    scene.fog = new THREE.Fog(0xf58585,100,780);
  }

  camera.position.x = 0;
  camera.position.z = 220;
  camera.position.y = 150;
  camera.rotation.x = -Math.PI / 6;
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById("fall-of-HUman");
  container.appendChild(renderer.domElement);
  renderer.render(scene, camera);

  window.addEventListener("resize", handleWindowResize, false);
}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function createLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
  shadowLight.position.set(150, 420, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;
  ambientLight = new THREE.AmbientLight(0xff8d8d, 0.5);
  scene.add(ambientLight);
  scene.add(hemisphereLight);
  scene.add(shadowLight);
}

const Terra = function () {
  geom = new THREE.CylinderGeometry(500, 500, 2900, 33, 34);
  geom.mergeVertices();
  
  let l = geom.vertices.length;
  this.plates = [];

  for (let i = 0; i < l; i++) {
    let v = geom.vertices[i];

    this.plates.push({
      y: v.y,
      x: v.x,
      z: v.z,
      ang: Math.random() * Math.PI * 2,
      amp: 20 + Math.random() * 15,
      speed: 0.016 + Math.random() * 0.032
    });
  }

  mat = new THREE.MeshPhongMaterial({
    color: 0x1B1734,
    opacity: 0.9,
    shading: THREE.FlatShading
  });

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;
  this.mesh.rotation.z += Math.PI / 2;
  this.mesh.position.y -= 700;
};

Terra.prototype.moveWaves = function() {
  let verts = this.mesh.geometry.vertices;
  let l = verts.length;
  for (let i = 0; i < l; i++) {
    let v = verts[i];
    let vprops = this.plates[i];
    v.x = (vprops.x + Math.cos(vprops.ang) * vprops.amp);
    v.y = (vprops.y + Math.sin(vprops.ang) * vprops.amp);

    vprops.ang += vprops.speed;
  }

  this.mesh.geometry.verticesNeedUpdate = true;

  terra.mesh.rotation.z += 0.005;
};

function createTerra() {
  terra = new Terra();
  terra.moveWaves();
  scene.add(terra.mesh);
}

// function normalize(v, vmin, vmax, tmin, tmax) {
//   let nv = Math.max(Math.min(v, vmax), vmin);
//   let dv = vmax - vmin;
//   let pc = (nv - vmin) / dv;
//   let dt = tmax - tmin;
//   let tv = tmin + pc * dt;
//   return tv;
// }

const Particle = function() {
  this.mesh = new THREE.Object3D();
  this.radius = 1400;
  this.side = 3;
  this.s = Math.PI * getRandomInt(0, 360) / 180;
  this.t = Math.PI * getRandomInt(0, 360) / 180;
  geom = new THREE.BoxGeometry(this.side, this.side, this.side, 1, 1, 1);
  mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });
  let xAxis = this.radius * Math.cos(this.s) * Math.sin(this.t);
  let yAxis = this.radius * Math.sin(this.s) * Math.sin(this.t);
  let zAxis = this.radius * Math.cos(this.t);
  this.par = new THREE.Mesh(geom, mat);
  this.par.position.x = xAxis;
  this.par.position.y = yAxis;
  this.par.position.z = zAxis;
  this.mesh.add(this.par);
};

function createParticle() {
  for (let i = 0; i < 1000; i++) {
    p[i] = new Particle();
    scene.add(p[i].mesh);
  }
}

let currTrees = [];
function createTree() {
  let gen = getRandomInt(4,6);
  let len = getRandomFloat(45,65);
  let uvLen = gen * len;
  let rad = 0.75;
  let radSeg = 8;
  let heightSeg = 8;
  tree = new THREE.Tree({
    generations: gen,					// # for branch' hierarchy
    length: len,							// length of root branch
    uvLength: uvLen,					// uv.v ratio against geometry length (recommended is generations * length)
    radius: rad,							// radius of root branch
    radiusSegments: radSeg,		// # of radius segments for each branch geometry
    heightSegments: heightSeg	// # of height segments for each branch geometry
  });

  treeGeom = THREE.TreeGeometry.build(tree);

  treeMesh = new THREE.Mesh(
    treeGeom, 
    // Tree bark material
    new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: 0x3b3b3b,
      shininess: 40,
      shading: THREE.FlatShading
    })
  );

  let x, y, z;
  x = getRandomFloat((0-(window.innerHeight/3)),(window.innerHeight/3));
  y = getRandomFloat(-95,-40);
  z = getRandomFloat(-5,5);
  treeMesh.position.set(x,y,z);

  scene.add(treeMesh);
  currTrees.push(treeMesh);
}

function createForest() {
  let totalTrees = getRandomInt(1,10);
  for (let i = 0; i < totalTrees; i++) {
    createTree();
  }
}

let mI = 0;
const ConstM = 325;
function move() {
  if (mI > ConstM) {
    mI = 0;
    return;
  }
  renderer.render(scene, camera);
  terra.mesh.rotation.x += 0.002 + getRandomInt(1,10) / 100000;
  if (mI <= ConstM) {
    if (currTrees.length) {
      currTrees.forEach((tree)=> {
        if (tree['uuid']) {
          let object = scene.getObjectByProperty('uuid', tree['uuid']);
          // object.geometry.dispose();
          // object.material.dispose();
          scene.remove(object);
        }
      });
    }
    requestAnimationFrame(move);
    if (mI == ConstM) {
      createForest();
      draw();
    }
    mI++;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFloat(min, max) {
  let base = getRandomInt(min, max);
  let suffix = Math.random();
  let c = base + suffix;
  if (c > max) {
    c = max;
  }
  if (c < min) {
    c = min;
  }
  return c;
}

function draw() {
  renderer.render(scene, camera);
  // console.log("Draw", THREE);
}

//// * ////

function make() {
  createScene();
  createLights();
  createParticle();
  createTerra();
  createForest();
  draw();
  // const moveButton = document.getElementById('pillage');
  // moveButton.addEventListener('click', move);
}

export default {make, move};