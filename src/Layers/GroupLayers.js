import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";
import LayerGroup from 'ol/layer/Group';

const GroupLayers = ({ source, title}) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

        let tileLayer;

        let olTileLayers =  source.map((layer,index) => {
            return new OLTileLayer({
                source: layer,
                title: title
            });
        })

        tileLayer = new LayerGroup({
            layers: olTileLayers
        })
        
        map.addLayer(tileLayer);
	});

	return null;
};

export default GroupLayers;