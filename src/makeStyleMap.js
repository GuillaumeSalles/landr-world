import { fromJS } from "immutable";
import MAP_STYLE from "./map-style.json";

const defaultMapStyle = fromJS(MAP_STYLE);
const defaultLayers = defaultMapStyle.get("layers");
const categories = [
  "labels",
  "roads",
  "buildings",
  "parks",
  "water",
  "background"
];

// Layer id patterns by category
const layerSelector = {
  background: /background/,
  water: /water/,
  parks: /park/,
  buildings: /building/,
  roads: /bridge|road|tunnel/,
  labels: /label|place|poi/
};

// Layer color class by type
const colorClass = {
  line: "line-color",
  fill: "fill-color",
  background: "background-color",
  symbol: "text-color"
};

const visibility = {
  water: true,
  parks: false,
  buildings: false,
  roads: false,
  labels: true,
  background: true
};
const color = {
  water: "#0F1E2D",
  parks: "#E6EAE9",
  buildings: "#c0c0c8",
  roads: "#ffffff",
  labels: "#8D9AA5",
  background: "#142739"
};

function makeMapStyle() {
  const layers = defaultLayers
    .filter(layer => {
      const id = layer.get("id");
      return categories.every(
        name => visibility[name] || !layerSelector[name].test(id)
      );
    })
    .map(layer => {
      const id = layer.get("id");
      const type = layer.get("type");
      const category = categories.find(name => layerSelector[name].test(id));
      if (category && colorClass[type]) {
        return layer.setIn(["paint", colorClass[type]], color[category]);
      }
      return layer;
    });

  return defaultMapStyle.set("layers", layers);
}

export default makeMapStyle;
