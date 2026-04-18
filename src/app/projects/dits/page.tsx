"use client";

//import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
//import * as THREE from "three";

/*
function BatteryPrototype() {
	const bodyMaterial = useMemo(
		() => new THREE.MeshStandardMaterial({ color: "#4f5a66", metalness: 0.35, roughness: 0.4 }),
		[]
	);
	const capMaterial = useMemo(
		() => new THREE.MeshStandardMaterial({ color: "#c4ccd4", metalness: 0.7, roughness: 0.25 }),
		[]
	);
	const accentMaterial = useMemo(
		() => new THREE.MeshStandardMaterial({ color: "#8edb44", metalness: 0.2, roughness: 0.55 }),
		[]
	);

	return (
		
        <group rotation={[0.25, -0.35, 0]}>
			<mesh material={bodyMaterial}>
				<cylinderGeometry args={[0.8, 0.8, 3.4, 64]} />
			</mesh>
			<mesh position={[0, 1.78, 0]} material={capMaterial}>
				<cylinderGeometry args={[0.28, 0.28, 0.16, 32]} />
			</mesh>
			<mesh position={[0, 1.62, 0]} material={capMaterial}>
				<torusGeometry args={[0.75, 0.045, 16, 100]} />
			</mesh>
			<mesh position={[0, -0.45, 0.79]} material={accentMaterial}>
				<boxGeometry args={[1.2, 1.5, 0.05]} />
			</mesh>
		</group>
        
	);
}
*/
export default function DITSProjectPage() {
	return (
		<div className="w-full">
			<section className="relative min-h-svh overflow-hidden border-b border-text/10">
				<div className="relative mx-auto grid min-h-svh w-full max-w-7xl items-center gap-10 px-6 py-24 md:grid-cols-[1.15fr_1fr] md:px-12">
					<div className="space-y-6">
						<p className="text-xs uppercase tracking-[0.28em] text-text/55">DITS Project</p>
						<h1 className="text-4xl font-semibold leading-tight md:text-6xl">
							Prototipo de bateria
							<br />
							para experiencia VR
						</h1>
						<p className="max-w-xl text-base leading-relaxed text-text/70 md:text-lg">
							Esta primera seccion esta pensada para integrar el modelo final de la bateria en un canvas 3D.
							Ya tienes una base visual para sustituirla por tu prototipo real de VR cuando lo importes.
						</p>
					</div>
{/*
					  <div className="h-[52vh] min-h-85 w-full overflow-hidden rounded-3xl border border-text/15 bg-background/70 shadow-[0_35px_80px_rgba(0,0,0,0.22)]">
						
                        <Canvas camera={{ position: [2.8, 1.7, 4.2], fov: 45 }}>
							<color attach="background" args={["#000000"]} />
							<ambientLight intensity={0.7} />
							<directionalLight position={[4, 5, 3]} intensity={1.4} />
							<spotLight position={[-4, 4, 2]} intensity={0.9} angle={0.55} penumbra={0.6} />
							<BatteryPrototype />
						</Canvas>
                        
					</div>
                    */}
				</div>
			</section>

			<section className="mx-auto w-full max-w-6xl px-6 py-24 md:px-12">
				<h2 className="mb-6 text-3xl font-semibold md:text-4xl">Video de muestra</h2>
				<p className="mb-8 max-w-3xl text-text/65">
					Reemplaza el archivo de ejemplo por tu video final para mostrar el comportamiento del prototipo.
				</p>

				<div className="overflow-hidden rounded-2xl border border-text/15 bg-black/85 shadow-[0_25px_60px_rgba(0,0,0,0.25)]">
					<video className="aspect-video w-full" controls preload="metadata" playsInline>
						<source src="/videos/dits-demo.mp4" type="video/mp4" />
						Tu navegador no soporta video HTML5.
					</video>
				</div>
			</section>

			<section className="mx-auto w-full max-w-6xl px-6 pb-28 md:px-12">
				<h3 className="mb-6 text-3xl font-semibold md:text-4xl">Descripcion del proyecto</h3>
				<div className="grid gap-8 md:grid-cols-3">
					<article className="rounded-2xl border border-text/10 bg-background/60 p-6 backdrop-blur-sm">
						<h4 className="mb-3 text-lg font-medium">Objetivo</h4>
						<p className="text-sm leading-7 text-text/70">
							Diseñar una experiencia inmersiva donde se visualiza una bateria optimizada para movilidad electrica,
							con foco en materiales, rendimiento y escalabilidad industrial.
						</p>
					</article>

					<article className="rounded-2xl border border-text/10 bg-background/60 p-6 backdrop-blur-sm">
						<h4 className="mb-3 text-lg font-medium">Pipeline VR</h4>
						<p className="text-sm leading-7 text-text/70">
							El siguiente paso es cargar el modelo final en formato GLB y conectar controles WebXR para que el
							usuario pueda inspeccionar la bateria en entorno virtual desde distintos angulos.
						</p>
					</article>

					<article className="rounded-2xl border border-text/10 bg-background/60 p-6 backdrop-blur-sm">
						<h4 className="mb-3 text-lg font-medium">Estado actual</h4>
						<p className="text-sm leading-7 text-text/70">
							Esta pagina ya deja lista la estructura narrativa: hero 3D, video de demostracion y bloque descriptivo,
							para iterar rapido con contenido real del proyecto DITS.
						</p>
					</article>
				</div>
			</section>
		</div>
	);
}
