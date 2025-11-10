import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import * as THREE from 'three';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly isBrowser: boolean;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private animationId!: number;
  private mouseX = 0;
  private mouseY = 0;

  private readonly handleResize = () => this.onWindowResize();
  private readonly handleMouseMove = (event: MouseEvent) => {
    this.mouseX = (event.clientX - window.innerWidth / 2) / 100;
    this.mouseY = (event.clientY - window.innerHeight / 2) / 100;
  };

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) {
      return;
    }

    this.initThree();
    this.animate();
    this.addEventListeners();
  }

  ngOnDestroy() {
    if (!this.isBrowser) {
      return;
    }

    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('mousemove', this.handleMouseMove);

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThree() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.createParticleSystem();
  }

  private createParticleSystem() {
    const particleCount = 15000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Ocean-themed colors
    const oceanColors = [
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0x0891b2), // Dark cyan
      new THREE.Color(0x0e7490), // Ocean blue
      new THREE.Color(0x0369a1), // Deep blue
      new THREE.Color(0x1e293b)  // Navy
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Create wave-like distribution
      positions[i3] = (Math.random() - 0.5) * 20; // x
      positions[i3 + 1] = (Math.random() - 0.5) * 10; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 20; // z

      // Assign random ocean color
      const color = oceanColors[Math.floor(Math.random() * oceanColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.0005;
    
    if (this.particles) {
      this.particles.rotation.x = time * 0.1;
      this.particles.rotation.y = time * 0.05;

      this.particles.rotation.x += this.mouseY * 0.0001;
      this.particles.rotation.y += this.mouseX * 0.0001;

      const positions = this.particles.geometry.attributes['position'].array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001; // y wave motion
      }
      this.particles.geometry.attributes['position'].needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private addEventListeners() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
