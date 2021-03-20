import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";

const BaseLayers = ({ source, zIndex = 0, extent, title, visible }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let tileLayer = new OLTileLayer({
			source,
			zIndex,
            extent,
            title,
            visible
		});

       
		map.addLayer(tileLayer);
		tileLayer.setZIndex(zIndex);
	});

	return null;
};

export default BaseLayers;
