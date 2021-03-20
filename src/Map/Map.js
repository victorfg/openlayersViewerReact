import React, { useRef, useState, useEffect } from "react"
import "./Map.scss";
import MapContext from "./MapContext";
import * as ol from "ol";
import {get as getProjection} from 'ol/proj';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';

const Map = ({selectedLayer, children }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
	const [optionsMap, setOptionsMap] = useState(null);

	// on component mount
	useEffect(() => {
		proj4.defs("EPSG:25831","+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
		register(proj4);
		const projection = getProjection('EPSG:25831');
		projection.setExtent([257904,4484796,535907,4751795]);
		const extent = [257904,4284796,515907,4751795];
		let options = {
			view: new ol.View({ zoom:0, center:[396905,4618292], projection: projection, extent: extent}),
			controls: []
		};
		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setOptionsMap(options);
		setMap(mapObject);

		return () => mapObject.setTarget(undefined);
	}, map);

	// center change handler
	// TODO: mirar lo de UseEffect com funciona!
	useEffect(() => {
		if (!map && !optionsMap) return;
		map.getLayers().forEach(layer => {
			if (layer && layer.get('title') == "COMARQUES_LAYER"){
				layer.setVisible(true);
			} else {
				if (layer && layer.get('title') != selectedLayer) {
					map.removeLayer(layer);
					layer.setVisible(false);
					console.log("caca1 "+selectedLayer)
				} else if (layer && layer.get('title') == selectedLayer) {
					layer.setVisible(true);
					console.log("caca2 "+selectedLayer)
				}
			}
		});
	}, [[396905,4618292]])

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;
