import React, { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RedFormat, DataTexture, Color, Vector3 } from "three";
import { GhibliShader } from "./GhibliShader";

export const Trees = forwardRef((props, ref) => {
  const { nodes } = useGLTF("/trees.glb");

  const uniforms = useMemo(() => {
    return {
      colorMap: {
        value: [
          new Color("#427062").convertLinearToSRGB(),
          new Color("#33594e").convertLinearToSRGB(),
          new Color("#234549").convertLinearToSRGB(),
          new Color("#1e363f").convertLinearToSRGB(),
        ],
      },
      brightnessThresholds: {
        value: [0.9, 0.45, 0.0001],
      },
      lightPosition: {
        value: new Vector3(15, 15, 15),
      },
    };
  }, []);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Foliage.geometry}
        position={[0.327, -0.046, -0.684]}
      >
        <shaderMaterial
          attach="material"
          {...GhibliShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
});

useGLTF.preload("/trees.glb");
