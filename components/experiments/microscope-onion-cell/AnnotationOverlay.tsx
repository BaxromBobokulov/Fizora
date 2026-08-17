import { useEffect, useRef, useState } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import { Path, Svg } from "react-native-svg";

type Point = { x: number; y: number };

function pathFromPoints(points: Point[]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  return `M ${first.x.toFixed(1)},${first.y.toFixed(1)} ` + rest.map((p) => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

// Simple freehand annotation layer over the viewport — pencil mode only,
// deliberately minimal (no undo/color picker/eraser): a few marks a student
// can sketch over what they're observing, not a drawing tool.
type AnnotationOverlayProps = {
  diameter: number;
  active: boolean;
  color: string;
};

export function AnnotationOverlay({ diameter, active, color }: AnnotationOverlayProps) {
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);

  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => activeRef.current,
      onMoveShouldSetPanResponder: () => activeRef.current,
      onPanResponderGrant: (event) => {
        if (!activeRef.current) return;
        const { locationX, locationY } = event.nativeEvent;
        setCurrentStroke([{ x: locationX, y: locationY }]);
      },
      onPanResponderMove: (event) => {
        if (!activeRef.current) return;
        const { locationX, locationY } = event.nativeEvent;
        setCurrentStroke((prev) => [...prev, { x: locationX, y: locationY }]);
      },
      onPanResponderRelease: () => {
        setCurrentStroke((prev) => {
          if (prev.length > 1) {
            setStrokes((existing) => [...existing, prev]);
          }
          return [];
        });
      },
    })
  ).current;

  return (
    <View
      pointerEvents={active ? "auto" : "none"}
      style={[StyleSheet.absoluteFill, { borderRadius: diameter / 2, overflow: "hidden" }]}
      {...panResponder.panHandlers}
    >
      <Svg width={diameter} height={diameter}>
        {strokes.map((stroke, index) => (
          <Path
            key={index}
            d={pathFromPoints(stroke)}
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
        {currentStroke.length > 1 && (
          <Path
            d={pathFromPoints(currentStroke)}
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
}
