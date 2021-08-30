import { useContext, useEffect } from "react";
import "./VectorLayer.scss";
import MapContext from "../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import { fromLonLat, get, transform } from "ol/proj";
import {toLonLat} from 'ol/proj';
import { Point } from "ol/geom";
import Feature from "ol/Feature";
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from "ol/style";
import {get as getProjection} from 'ol/proj';
import { getProjection_EPSG_25831 } from '../Utils/Functions'
import Overlay from 'ol/Overlay';
import {toStringHDMS} from 'ol/coordinate';

const VectorLayer = ({ usersData }) => {
	getProjection_EPSG_25831();
	
	const { map } = useContext(MapContext);
	
	useEffect(() => {
		if (!map) return;

		const container = document.getElementById('popup');
		const content = document.getElementById('popup-content');
		const closer = document.getElementById('popup-closer');

		const overlay = new Overlay({
			element: container,
			autoPan: true,
			autoPanAnimation: {
			duration: 250,
			},
		});

		closer.onclick = function () {
			overlay.setPosition(undefined);
			closer.blur();
			return false;
		};

		map.addOverlay(overlay);
		map.on('singleclick', function (evt) {
			const coordinate = evt.coordinate;

			var feature = map.forEachFeatureAtPixel(evt.pixel,
				function (feature) {
					return feature 
				})
			if (feature) {
				content.innerHTML = '<p>Hola sóc el/la ' + feature.get('name') + ' </p>';
				overlay.setPosition(coordinate);
			}
		  });
	}, [map]);

	useEffect(() => {
		if (!map) return;
		
		const projection = getProjection('EPSG:25831');

		var vectorSource = new VectorSource({
			features: []
		});
		
		let vectorLayer = new OLVectorLayer({
			source: vectorSource
		});

		var iconStyle = new Style({
			image: new Icon({
				anchor: [16, 48],
				anchorXUnits: 'pixels',
				anchorYUnits: 'pixels',
				imgSize: [48, 48],
				src: 'https://vfernandez.me/colegiatsAplicacio/icons/kid.png'
			})
		})
	
		usersData?.forEach( (feature,index) => {
			let iconFeature = new Feature({
				geometry: new Point(fromLonLat([Number(feature.latitud), Number(feature.longitud)], projection)),
				name: feature.nom
			})
			iconFeature.setStyle(iconStyle)
			vectorSource.addFeature(iconFeature)
		})
	
		map.addLayer(vectorLayer) 
		vectorLayer.setZIndex(400);

		return () => {
			if (map) {
				//map.removeLayer(vectorLayer);
			}
		};
	}, [map, usersData]);

	return null;
};

export default VectorLayer;
