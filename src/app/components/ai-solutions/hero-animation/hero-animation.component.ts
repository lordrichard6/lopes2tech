import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-ai-solutions-hero-animation',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #canvas class="hero-canvas webgl"></canvas>`,
  styleUrls: ['./hero-animation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsHeroAnimationComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly isBrowser: boolean;
  private minPan = new THREE.Vector3(-2, -0.5, -2);
  private maxPan = new THREE.Vector3(2, 0.5, 2);

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private controls?: OrbitControls;
  private gltfLoader?: GLTFLoader;
  private textureLoader?: THREE.TextureLoader;
  private bakedTexture?: THREE.Texture;
  private bakedMaterial?: THREE.MeshBasicMaterial;
  private heroModel?: THREE.Group;
  private hemiLight?: THREE.HemisphereLight;
  private fillLight?: THREE.DirectionalLight;
  private themeObserver?: MutationObserver;
  private currentTheme: 'light' | 'dark' = 'dark';
  private animationId?: number;
  private resizeHandler?: () => void;
  private sizes = { width: 0, height: 0 };
  private loaderEl?: HTMLElement | null;

  constructor(
    private readonly ngZone: NgZone,
    private readonly host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.ngZone.runOutsideAngular(() => this.initializeScene());
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }

    this.controls?.dispose();
    this.renderer?.dispose();
    this.bakedTexture?.dispose();
    this.bakedMaterial?.dispose();
    this.disposeScene();
  }

  private initializeScene(): void {
    const canvas = this.canvasRef.nativeElement;
    this.loaderEl = this.document.getElementById('loader');

    this.scene = new THREE.Scene();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.camera = new THREE.PerspectiveCamera(
      10,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.set(8, 4, 15);
    this.scene.add(this.camera);

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x111111, 0.7);
    this.fillLight = new THREE.DirectionalLight(0xffffff, 0.35);
    this.fillLight.position.set(-6, 8, -4);
    this.scene.add(this.hemiLight, this.fillLight);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.minDistance = 21;
    this.controls.maxDistance = 50;
    this.controls.minPolarAngle = Math.PI / 5;
    this.controls.maxPolarAngle = Math.PI / 1.85;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x9bd8ff, 1);
    const rendererAny = this.renderer as THREE.WebGLRenderer & {
      outputColorSpace?: unknown;
      outputEncoding?: unknown;
    };
    const threeAny = THREE as unknown as {
      SRGBColorSpace?: unknown;
      sRGBEncoding?: unknown;
    };
    if ('outputColorSpace' in rendererAny && threeAny.SRGBColorSpace) {
      rendererAny.outputColorSpace = threeAny.SRGBColorSpace as any;
    } else if ('outputEncoding' in rendererAny && threeAny.sRGBEncoding) {
      rendererAny.outputEncoding = threeAny.sRGBEncoding as any;
    }

    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setPath('/models/');

    this.textureLoader = new THREE.TextureLoader();
    this.textureLoader.setPath('/models/');

    this.resizeHandler = () => this.handleResize();
    window.addEventListener('resize', this.resizeHandler, { passive: true });

    this.currentTheme = this.getCurrentTheme();
    this.applyThemeEnvironment();
    this.setupThemeObserver();

    this.loadAssets();
    this.applyThemeEnvironment();
    this.animate();
  }

  private async loadAssets(): Promise<void> {
    try {
      const texture = await this.loadTexture('baked.jpg');
      this.bakedTexture = texture;
      this.bakedMaterial = new THREE.MeshBasicMaterial({ map: texture });

      await this.loadModel('model.glb', this.bakedMaterial);

      if (this.loaderEl) {
        this.loaderEl.style.display = 'none';
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load AI hero assets', error);
    }
  }

  private loadTexture(path: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      if (!this.textureLoader) {
        reject(new Error('Texture loader not initialized'));
        return;
      }

      this.textureLoader.load(
        path,
        (texture) => {
          texture.flipY = false;

          const anyTexture = texture as THREE.Texture & {
            colorSpace?: unknown;
            encoding?: unknown;
          };
          const threeAny = THREE as unknown as {
            SRGBColorSpace?: unknown;
            sRGBEncoding?: unknown;
          };

          if ('colorSpace' in anyTexture && threeAny.SRGBColorSpace) {
            anyTexture.colorSpace = threeAny.SRGBColorSpace as any;
          } else if ('encoding' in anyTexture && threeAny.sRGBEncoding) {
            anyTexture.encoding = threeAny.sRGBEncoding as any;
          }

          if (this.renderer) {
            texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
          }

          resolve(texture);
        },
        undefined,
        reject
      );
    });
  }

  private loadModel(
    path: string,
    material: THREE.MeshBasicMaterial
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.gltfLoader || !this.scene) {
        reject(new Error('GLTF loader not initialized'));
        return;
      }

      this.gltfLoader.load(
        path,
        (gltf: GLTF) => {
          const model = gltf.scene;
          model.position.set(0, 0.2, 0);
          model.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (!mesh.isMesh) {
              return;
            }

            if (Array.isArray(mesh.material)) {
              mesh.material = mesh.material.map(() => material);
            } else {
              mesh.material = material;
            }
          });

          this.scene!.add(model);
          this.heroModel = model;

          this.controls?.target.set(0, 0, 0);
          this.minPan.set(-2, -0.5, -2);
          this.maxPan.set(2, 0.5, 2);
          this.controls?.update();

          resolve();
        },
        (xhr) => {
          const percent = xhr.total
            ? (xhr.loaded / xhr.total) * 100
            : (xhr.loaded / 1) * 100;
          // eslint-disable-next-line no-console
          console.log(`${percent.toFixed(0)}% loaded`);
        },
        reject
      );
    });
  }

  private animate = (): void => {
    if (!this.renderer || !this.scene || !this.camera || !this.controls) {
      return;
    }

    this.controls.update();
    this.controls.target.clamp(this.minPan, this.maxPan);

    if (this.heroModel) {
      const rotationSpeed = 0.015;
      this.heroModel.rotation.y += rotationSpeed * 0.01;
    }

    this.renderer.render(this.scene, this.camera);
    this.animationId = window.requestAnimationFrame(this.animate);
  };

  private handleResize(): void {
    if (!this.camera || !this.renderer) {
      return;
    }

    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private disposeScene(): void {
    if (!this.scene) {
      return;
    }

    this.scene.traverse((object) => {
      const mesh = object as THREE.Mesh;

      if (mesh.isMesh) {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });

    this.themeObserver?.disconnect();
    this.themeObserver = undefined;
  }

  private getCurrentTheme(): 'light' | 'dark' {
    const body = this.document.body;

    if (body.classList.contains('light-theme')) {
      return 'light';
    }

    if (body.classList.contains('dark-theme')) {
      return 'dark';
    }

    return 'dark';
  }

  private applyThemeEnvironment(): void {
    if (!this.scene) {
      return;
    }

    const isDark = this.currentTheme === 'dark';

    const topColor = isDark ? 0x0b1a26 : 0xe6f5ff;
    const bottomColor = isDark ? 0x133044 : 0xbddfff;
    this.scene.background = null;

    this.renderer?.setClearColor(bottomColor, 1);

    if (this.canvasRef?.nativeElement) {
      const canvas = this.canvasRef.nativeElement;
      canvas.style.backgroundImage = `linear-gradient(180deg, ${isDark ? '#0b1a26' : '#e6f5ff'} 0%, ${isDark ? '#133044' : '#bddfff'} 100%)`;
    }

    if (this.hemiLight) {
      if (isDark) {
        this.hemiLight.color.setHex(0xa3c0d6);
        this.hemiLight.groundColor.setHex(0x060b12);
        this.hemiLight.intensity = 0.65;
      } else {
        this.hemiLight.color.setHex(0xf1f7ff);
        this.hemiLight.groundColor.setHex(0xbfd8eb);
        this.hemiLight.intensity = 0.9;
      }
    }

    if (this.fillLight) {
      if (isDark) {
        this.fillLight.color.setHex(0x7aa6c4);
        this.fillLight.intensity = 0.45;
        this.fillLight.position.set(-6, 8, -4);
      } else {
        this.fillLight.color.setHex(0xa1c7e8);
        this.fillLight.intensity = 0.35;
        this.fillLight.position.set(-4, 6, -2);
      }
    }
  }

  private setupThemeObserver(): void {
    if (!this.isBrowser) {
      return;
    }

    this.themeObserver?.disconnect();

    this.themeObserver = new MutationObserver(() => {
      const theme = this.getCurrentTheme();
      if (theme !== this.currentTheme) {
        this.currentTheme = theme;
        this.applyThemeEnvironment();
      }
    });

    this.themeObserver.observe(this.document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }
}

