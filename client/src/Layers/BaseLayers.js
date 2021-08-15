import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";

const BaseLayers = ({ source, title }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let tileLayer = new OLTileLayer({
			source,
            title
		});

		map.addLayer(tileLayer);
	}, [map]);

	return null;
};

export default BaseLayers;
