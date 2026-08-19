import Svg from "react-native-svg";

import { Burette } from "./Burette";
import { ErlenmeyerFlask } from "./ErlenmeyerFlask";
import { RingStand } from "./RingStand";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./titrationLayout";

type TitrationMiniIllustrationProps = {
  width?: number;
  accentColor: string;
  buretteVolumeML?: number;
  totalLiquidVolumeML?: number;
  pinkProgress?: number;
};

// A small static render of the same apparatus pieces used in the Experiment
// tab, reused as the Theory/Results tabs' illustration instead of a
// placeholder photo — one visual source of truth for what the setup looks
// like, and no new image asset to source.
export function TitrationMiniIllustration({
  width = 90,
  accentColor,
  buretteVolumeML = 12,
  totalLiquidVolumeML = 37,
  pinkProgress = 0.6,
}: TitrationMiniIllustrationProps) {
  const height = (width / CANVAS_WIDTH) * CANVAS_HEIGHT;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}>
      <RingStand accentColor={accentColor} />
      <Burette buretteVolumeML={buretteVolumeML} />
      <ErlenmeyerFlask
        totalLiquidVolumeML={totalLiquidVolumeML}
        pinkProgress={pinkProgress}
        isPlaying={false}
        resetEpoch={0}
      />
    </Svg>
  );
}
