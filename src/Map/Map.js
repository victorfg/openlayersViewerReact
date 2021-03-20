import React, { useRef, useState, useEffect } from "react"
import "./Map.scss";
import MapContext from "./MapContext";
import * as ol from "ol";
import {get as getProjection} from 'ol/proj';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import LayerGroup from 'ol/layer/Group';
import { baseLayers, layers } from "../Utils/Constants";

const Map = ({selectedBaseLayer, selectLayers, children }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
	const [optionsMap, setOptionsMap] = useState(null);

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
	}, []);

	useEffect(() => {
		if (!map && !optionsMap) return;
		map.getLayers().forEach(layer => {
			if (layer instanceof LayerGroup){
				layer.getLayers().forEach((lyr,index,array) => {
					if (selectLayers.COMARQUES_LAYER && lyr && lyr.get('title') == layers.COMARQUES_LAYER ||
						selectLayers.MUNICIPIS_LAYER && lyr && lyr.get('title') == layers.MUNICIPIS_LAYER){
						layer.setVisible(true);
					} else if (layer){
						map.removeLayer(layer);
						layer.setVisible(false);
					}
				});
			} else {	
				if (selectedBaseLayer.ORTOFOTOMAPA_MAP && layer && layer.get('title') == baseLayers.ORTOFOTOMAPA_MAP ||
					selectedBaseLayer.TOPOGRAFIC_MAP && layer && layer.get('title') == baseLayers.TOPOGRAFIC_MAP){
						layer.setVisible(true);
				} else if (layer){
					map.removeLayer(layer);
					layer.setVisible(false);
				}
			}
		});
	},[selectedBaseLayer , selectLayers.COMARQUES_LAYER , selectLayers.MUNICIPIS_LAYER])

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;
