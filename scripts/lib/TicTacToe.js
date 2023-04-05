import * as THREE from 'three';


export class TicTacToe {

    constructor() {

        this.camera= new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.mouse = new THREE.Vector2();
        this.scene = new THREE.Scene();

        this.camera.position.z = 1;

        this.renderer.setSize( window.innerWidth, window.innerHeight );


        // const light = new THREE.AmbientLight( "violet", 0.1 );
        // this.scene.add( light );


        const geometry = new THREE.PlaneGeometry( 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: "violet", side: THREE.DoubleSide} );
        this.mesh = new THREE.Mesh( geometry, material );
        this.scene.add( this.mesh );


        document.body.appendChild( this.renderer.domElement );

        window.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );

        this.animate();
    }




    onMouseMove( event ) {
        this.mouse.x = event.clientX - window.innerWidth / 2;
        this.mouse.y = event.clientY - window.innerHeight / 2;
    }


    animate( time ) {

        requestAnimationFrame( this.animate.bind(this) );

        this.mesh.rotation.x = (this.mouse.y / 1000);
        this.mesh.rotation.y = (this.mouse.x / 1000);

        this.renderer.render( this.scene, this.camera );

    }


}