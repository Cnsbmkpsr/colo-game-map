import { mapStore } from "../mapStore";
import { observer } from "mobx-react";
import map from "../asset/map_bg.jpg";
import { useTexture } from "@react-three/drei";

const MapImagePlane = () => {
  const height = mapStore.getHeigth;
  const width = mapStore.getWidth;

  const heightOffset = Math.floor(height / 2);
  const widthOffset = Math.floor(width / 2);

  const texture = useTexture({
    map: map,
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[
        widthOffset - (widthOffset * 0.025) / 2,
        0,
        heightOffset - (heightOffset * 0.025) / 2,
      ]}
    >
      <planeGeometry args={[width + 0.025 * width, height + 0.025 * height]} />
      <meshStandardMaterial color="gray" map={texture.map} />
    </mesh>
  );
};

export default observer(MapImagePlane);
