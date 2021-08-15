import React from "react"
import { useState,useContext, useEffect } from "react";
import './App.scss';
import Map from "./Map";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import { Layers, BaseLayers, GroupLayers, VectorLayer } from "./Layers";
import { topo, orto, comarques,municipis } from "./Source";
import { Controls, FullScreenControl } from "./Controls";
import { baseLayers, layers } from "./Utils/Constants";
import MenuComponent from "./Menu/MenuComponent";
import mapConfig from "./dataSample.json";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";
const markersLonLat = [mapConfig.manresa, mapConfig.barcelona];

//TODO: ACONSEGUIR MARCAR AL MAPA PUNTS DE MANRESA I BARCELONA
function addMarkers(lonLatArray) {
    var iconStyle = new Style({
      image: new Icon({
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: mapConfig.markerImage32,
      }),
    });
    let features = lonLatArray.map((item) => {
      let feature = new Feature({
        geometry: new Point(fromLonLat([4.35247, 50.84673])),
      });
      feature.setStyle(iconStyle);
      return feature;
    });
    return features;
}


const App = () => {
    const [openMenuOptions, setOpenMenuOptions] = useState(false);
    const [selectedBaseLayer, setSelectedBaseLayer] = useState({ ORTOFOTOMAPA_MAP: true, TOPOGRAFIC_MAP: false });
    const [selectLayers, setSelectLayers] = useState({ COMARQUES_LAYER:true, MUNICIPIS_LAYER:false });
    const [opacityLayer, setOpacityLayer] = useState({dom_element: null, value: null});
    const [features, setFeatures] = useState(addMarkers(markersLonLat));

    const [usersData, setUsersData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
        .then((res) => res.json())
        .then((data) => setUsersData(data));
    }, []);

    const handlerRadioButtonsBaseLayer = (ev) => {
        let newObj = {
            TOPOGRAFIC_MAP: ev.value == baseLayers.TOPOGRAFIC_MAP ? ev.checked : !ev.checked,
            ORTOFOTOMAPA_MAP: ev.value == baseLayers.ORTOFOTOMAPA_MAP ? ev.checked : !ev.checked
        }
        setSelectedBaseLayer(newObj);
    }

    const handlerCheckButtonsLayers = (ev) => {
        switch (ev.value) {
            case layers.COMARQUES_LAYER:
                setSelectLayers((prevState) => ({
                    ...prevState,
                    COMARQUES_LAYER: ev.checked
                }));
                break;
        
            case layers.MUNICIPIS_LAYER:
                setSelectLayers((prevState) => ({
                    ...prevState,
                    MUNICIPIS_LAYER: ev.checked
                }));
                break;
        }
    }

    const handlerOpacityLayer = (ev) => {
        let newObj = {
            dom_element: ev,
            value: ev.value
        }
        setOpacityLayer(newObj);
    }

    const usersName = usersData?.map((name) => name.AGENT_NAME);

    return (
        <>
            {usersName}
            <div className="grid-container">
                <MenuComponent 
                    selectedBaseLayer={selectedBaseLayer} 
                    openMenuOptions={openMenuOptions}
                    handlerRadioButtonsBaseLayer={handlerRadioButtonsBaseLayer}
                    handlerCheckButtonsLayers={handlerCheckButtonsLayers}
                    handlerOpacityLayer={handlerOpacityLayer}
                />    
                <div id="map" className="map">
                    <div className="title">
                        <div id="menuLeft" className="bar-menu-left" onClick={() => setOpenMenuOptions(prevState => !prevState)}><i className="fa fa-bars" aria-hidden="true"></i></div>
                        Mapa comarcal / municipal    
                    </div>
                    <Map 
                        selectedBaseLayer={selectedBaseLayer} 
                        selectLayers={selectLayers}
                        opacityLayer={opacityLayer}
                    >
                        <Layers>
                            {selectedBaseLayer.TOPOGRAFIC_MAP && (
                                <BaseLayers
                                    source={topo()}
                                    title={baseLayers.TOPOGRAFIC_MAP}
                                />
                            )}
                            {selectedBaseLayer.ORTOFOTOMAPA_MAP && (
                                <BaseLayers
                                    source={orto()}
                                    title={baseLayers.ORTOFOTOMAPA_MAP}
                                />
                            )}
                            
                            {selectLayers.COMARQUES_LAYER && (
                                <GroupLayers
                                    source={comarques()}
                                    title={layers.COMARQUES_LAYER}
                                    selectedBaseLayer={selectedBaseLayer}
                                />
                            )}

                            {selectLayers.MUNICIPIS_LAYER && (
                                <>
                                <GroupLayers
                                    source={municipis()}
                                    title={layers.MUNICIPIS_LAYER}
                                    selectedBaseLayer={selectedBaseLayer}
                                />
                                <VectorLayer source={vector({ features })} />
                                </>
                            )}
                        
                        </Layers>
                        <Controls>
                            <FullScreenControl />
                        </Controls>
                    </Map>
                </div>
            </div>
        </>
    );
};

export default App;