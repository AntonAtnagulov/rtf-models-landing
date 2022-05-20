import './App.scss';
import React, { Suspense, useRef, useEffect } from 'react';
import Header from './components/Header';
import state from './components/State';

import { Section } from './components/Section';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';


const Model = ({ modelPath }) => {
    const gltf = useGLTF(modelPath, true);
    return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={0.7} />
            <directionalLight position={[0, 10, 0]} intensity={0.6} />
            <spotLight intensity={0.5} position={[1000, 0, 0]} />
        </>
    );
};

const HtmlContent = ({ domContent, children, modelPath, positionY }) => {
    const ref = useRef();
    useFrame(() => {
        ref.current.rotation.y += 0.01;
    });

    return (
        <Section factor={1.5} offset={1}>
            <group position={[0, positionY, 0]}>
                <mesh ref={ref} position={[0, -35, 0]}>
                    <Model modelPath={modelPath} />
                </mesh>
                <Html portal={domContent} fullscreen>{children}</Html>
            </group>
        </Section>
    );
};

function App() {
  const domContent = useRef()

  const scrollArea = useRef()
  const onScroll = (e) => (state.top.current = e.target.scrollTop)

  useEffect(() => void onScroll({ target: scrollArea.current }), [])

    return (
        <>
            <Header />
            <Canvas colorManagment camera={{ position: [0, 0, 120], fov: 70 }}>
                <Lights />
                <Suspense fallback={null}>
                    <HtmlContent domContent={domContent} modelPath="/Yellow.gltf" positionY={250}>
                        <div className="container">
                            <h1 className="title">Yellow</h1>
                        </div>
                    </HtmlContent>

                    <HtmlContent domContent={domContent} modelPath="/Green.gltf" positionY={0}>
                        <div className="container">
                            <h1 className="title">Green</h1>
                        </div>
                    </HtmlContent>

                    <HtmlContent domContent={domContent} modelPath="/Grey.gltf" positionY={-250}>
                        <div className="container">
                            <h1 className="title">Grey</h1>
                        </div>
                    </HtmlContent>
                </Suspense>
            </Canvas>
            <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
              <div style={{position: 'sticky', top: 0}} ref={domContent}></div>
              <div style={{height: `${state.sections * 100}vh`}}></div>
            </div>
        </>
    );
}

export default App;
