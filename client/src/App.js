import './App.scss';
import React, { Suspense, useRef, useEffect } from 'react';

import Header from './components/Header';
import state from './components/State';

import { Section } from './components/Section';
import { Canvas, useFrame } from '@react-three/fiber';

import { Html, useGLTF, useProgress } from '@react-three/drei';
import { a, useTransition } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

const Model = ({ modelPath }) => {
    const gltf = useGLTF(modelPath, true);
    return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[0, 5, 10]} intensity={0.8} z />
            <spotLight intensity={0.5} position={[1000, 0, 0]} />
        </>
    );
};

const HtmlContent = ({
    domContent,
    children,
    modelPath,
    positionY,
    scale,
    bgColor,
}) => {
    const ref = useRef();
    useFrame(() => {
        ref.current.rotation.y += 0.01;
    });
    const [refItem, inView] = useInView();

    useEffect(() => {
        inView && (document.body.style.background = bgColor);
    }, [inView]);

    return (
        <Section factor={1.5} offset={1}>
            <group position={[0, positionY, 0]}>
                <mesh ref={ref} position={[0, -35, 0]} scale={scale}>
                    <Model modelPath={modelPath} />
                </mesh>
                <Html portal={domContent} fullscreen>
                    <div className="container" ref={refItem}>
                        {children}
                    </div>
                </Html>
            </group>
        </Section>
    );
};

function Loader() {
    const { active, progress } = useProgress();
    const transition = useTransition(active, {
        from: { opacity: 1, progress: 0 },
        leave: { opacity: 0 },
        update: { progress },
    });
    return transition(
        ({ progress, opacity }, active) =>
            active && (
                <>
                    <a.div className="loading" style={{ opacity }}>
                        <div className="loading-bar-container">
                            <a.div
                                className="loading-bar"
                                style={{ width: progress }}
                            ></a.div>
                            <h6 className="loading-text">loading...</h6>
                        </div>
                    </a.div>
                </>
            )
    );
}

function App() {
    const domContent = useRef();

    const scrollArea = useRef();
    const onScroll = (e) => (state.top.current = e.target.scrollTop);

    useEffect(() => void onScroll({ target: scrollArea.current }), []);

    return (
        <>
            <Header />
            <Canvas colorManagment camera={{ position: [0, 0, 180], fov: 50 }}>
                <Lights />
                <Suspense fallback={null}>
                    <HtmlContent
                        domContent={domContent}
                        modelPath="/gltfPistolFinal/PistolSSP.gltf"
                        positionY={250}
                        scale={0.015}
                        bgColor={'#736f68'}
                    >
                        <div className="container">
                            <h1 className="title">ZX 2027</h1>
                            <h6 className="text">
                                Long barrel pistol after WW3
                            </h6>
                        </div>
                    </HtmlContent>

                    <HtmlContent
                        domContent={domContent}
                        modelPath="/gltfSMGFinal/PBR - Metallic Roughness.glb"
                        positionY={0}
                        scale={0.011}
                        bgColor={'#2d2e2d'}
                    >
                        <div className="container">
                            <h1 className="title">AS 205 SMG</h1>
                            <h6 className="text">
                                Bullpup SMG designed for combat outside the
                                atmosphere
                            </h6>
                        </div>
                    </HtmlContent>

                    <HtmlContent
                        domContent={domContent}
                        modelPath="/SniperGLTF/SniperSPP.gltf"
                        positionY={-250}
                        scale={0.009}
                        bgColor={'#636567'}
                    >
                        <div className="container">
                            <h1 className="title">0.50 Sniper Rifle</h1>
                            <h6 className="text">
                                Bullpup SMG designed for combat outside the
                                atmosphere
                            </h6>
                        </div>
                    </HtmlContent>
                </Suspense>
            </Canvas>
            <Loader />
            <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
                <div
                    style={{ position: 'sticky', top: 0 }}
                    ref={domContent}
                ></div>
                <div style={{ height: `${state.sections * 100}vh` }}></div>
            </div>
        </>
    );
}

export default App;
