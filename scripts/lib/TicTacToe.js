import * as THREE from 'three';
import gsap from "gsap";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

export class TicTacToe {

    constructor() {

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.mouse = new THREE.Vector2();
        this.scene = new THREE.Scene();
        this.raycaster = new THREE.Raycaster();

        document.body.appendChild( this.renderer.domElement );

        const orbit = new OrbitControls( this.camera, this.renderer.domElement);

        this.camera.position.set(0, 10, 0);

        this.onWindowResize();


        this.group = new THREE.Group();

        const planeMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 3),
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                visible: false
            })
        );

        planeMesh.rotateX(-Math.PI / 2);
        this.scene.add(planeMesh);

        this.grid = new THREE.GridHelper(3, 3);
        this.scene.add(this.grid);

        const highlightMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                transparent: true
            })

        );
        highlightMesh.rotateX(-Math.PI / 2);
        highlightMesh.position.set(1, 0, 0);
        this.scene.add(highlightMesh);

        // this.group.add(highlightMesh);x
        // this.group.add(planeMesh);
        // this.group.add(this.grid);

        // this.scene.add(this.group);

        let intersects;

        const that = this;

        window.addEventListener('mousemove', function(e) {

            that.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            that.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            that.raycaster.setFromCamera(that.mouse, that.camera);
            intersects = that.raycaster.intersectObject(planeMesh);

            if(intersects.length > 0) {
                const intersect = intersects[0];
                const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(1);
                highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);

                const objectExist = objects.find(function(object) {
                    return (object.position.x === highlightMesh.position.x)
                        && (object.position.z === highlightMesh.position.z)
                });

                if(!objectExist)
                    highlightMesh.material.color.setHex(0xFFFFFF);
                else
                    highlightMesh.material.color.setHex(0xFF0000);
            }
        });

        const sphereMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 4, 2),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color: 0xFFEA00
            })
        );

        const objects = [];

        window.addEventListener('mousedown', function() {

            const objectExist = objects.find(function(object) {
                return (object.position.x === highlightMesh.position.x) && (object.position.z === highlightMesh.position.z)
            });

            if(!objectExist) {
                if(intersects.length > 0) {
                    const sphereClone = sphereMesh.clone();
                    sphereClone.position.copy(highlightMesh.position);
                    that.scene.add(sphereClone);
                    objects.push(sphereClone);
                    highlightMesh.material.color.setHex(0xFF0000);
                }
            }
            console.log(that.scene.children.length);
        });




        window.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        this.animate();
    }




    animate( time ) {

        requestAnimationFrame( this.animate.bind(this) );

        // gsap.to(this.group.rotation, { duration: .5, x: this.mouse.y / 1000, y: this.mouse.x / 1000 });

        this.renderer.render( this.scene, this.camera );

    }


    onWindowResize ( ) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth , window.innerHeight);
    }

    onMouseMove( event ) {
        this.mouse.x = event.clientX - window.innerWidth / 2;
        this.mouse.y = event.clientY - window.innerHeight / 2;
    }


}