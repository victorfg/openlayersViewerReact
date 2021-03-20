import React, { useRef, useState, useEffect } from "react"
import './App.scss';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer, BaseLayers, GroupLayers } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector,topo, orto, comarques } from "./Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Controls, FullScreenControl } from "./Controls";
import TileWMS from 'ol/source/TileWMS';
import { render } from '@testing-library/react';


class App extends React.Component {

    static TOPOGRAFIC_MAP = 'TOPOGRAFIC_MAP';
    static ORTOFOTOMAPA_MAP = 'ORTOFOTOMAPA_MAP';

    static MUNICIPIS_LAYER = 'MUNICIPIS_LAYER';
    static COMARQUES_LAYER = 'COMARQUES_LAYER';

    constructor(props) {
        super(props);
        this.state = {
            openMenuOptions: false,
            showTopo:false,
            showOrto:true,
            selectedLayer:App.ORTOFOTOMAPA_MAP
        };
    
        this.handlerRadioButtonsBaseLayer = this.handlerRadioButtonsBaseLayer.bind(this);
    }

    handlerMenu(ev){
        this.setState((state, props) => ({
            openMenuOptions: !state.openMenuOptions
        }));
    }

    handlerRadioButtonsBaseLayer(ev){
        if (ev.value == "topo"){
            this.setState((state, props) => ({
                showTopo: ev.checked,
                showOrto: !ev.checked,
                selectedLayer: App.TOPOGRAFIC_MAP
            }));
        } else {
            this.setState((state, props) => ({
                showOrto: ev.checked,
                showTopo: !ev.checked,
                selectedLayer: App.ORTOFOTOMAPA_MAP
            }));
        }
    }

    handlerCheckButtonsLayers(ev){

    }

	/*const [center, setCenter] = useState([-94.9065, 38.9884]);
    const [showOrto, setShowOrto] = useState(true);
    const [showTopo, setShowTopo] = useState(false);
	const [zoom, setZoom] = useState(9);
	const [showLayer1, setShowLayer1] = useState(true);
	const [showLayer2, setShowLayer2] = useState(true);
    const [openMenuOptions, setOpenMenuOptions] = useState(false);*/

    render(){
        const {openMenuOptions, showTopo, showOrto, selectedLayer} = this.state;
        return (
            <div className="grid-container">
                <div className={"main-menu "+ (openMenuOptions ? "open" : "")} id="mainMenuContainer">
                    <div className="main-menu-options">
                        <div id="menuLeftBaseLayers" className="margin-top-10 cursor-pointer">Capes</div>
                        <div className="separation-line"></div>
                        <div id="inputsLayers">
                            <div className="aligns-items">
                                <input 
                                    type="radio" 
                                    name="baseLayerRadioButton" 
                                    defaultValue='topo'
                                    checked={showTopo}
                                    onChange={event => this.handlerRadioButtonsBaseLayer(event.target)}
                                    className="cursor-pointer">
                                </input><br/>
                                <label>ICC TOPO</label>
                                <input 
                                    defaultValue="1" 
                                    id ="topoOpacity" 
                                    className="opacity margin-left-10" 
                                    type="range" 
                                    min="0" 
                                    max="1" 
                                    step="0.01">  
                                </input>
                            </div>
                            <div className="aligns-items margin-top-10">
                                <input 
                                    className="" 
                                    type="radio" 
                                    name="baseLayerRadioButton" 
                                    defaultValue='orto' 
                                    defaultChecked
                                    checked={showOrto}
                                    onChange={event => this.handlerRadioButtonsBaseLayer(event.target)}
                                    className="cursor-pointer">
                                </input><br/>
                                <label>ICC ORTO</label>
                                <input 
                                    defaultValue="1" 
                                    id ="ortoOpacity" 
                                    className="opacity margin-left-10" 
                                    type="range" 
                                    min="0" 
                                    max="1" 
                                    step="0.01">        
                                </input>
                            </div>
                            <div className="aligns-items margin-top-10">
                                <input 
                                    type="checkbox" 
                                    className="cursor-pointer" 
                                    name="comarquesCheckBox" 
                                    id="comarques" 
                                    defaultValue="comarques" 
                                    defaultChecked
                                    onChange={event => this.handlerCheckButtonsLayers(event.target)}>
                                </input><br/>
                                <label>Comarques</label>
                                <input 
                                    defaultValue="1" 
                                    id ="comarquesOpacity" 
                                    className="opacity margin-left-10" 
                                    type="range" 
                                    min="0" 
                                    max="1" 
                                    step="0.01">
                                </input>
                            </div>
                            <div className="aligns-items margin-top-10">
                                <input 
                                    type="checkbox" 
                                    className="cursor-pointer" 
                                    name="municipisCheckBox" 
                                    id="municipis" 
                                    defaultValue="municipis"
                                    onChange={event => this.handlerCheckButtonsLayers(event.target)}>
                                </input><br/>
                                <label>Municipis</label>
                                <input 
                                    defaultValue="1" 
                                    id ="municipisOpacity" 
                                    className="opacity margin-left-10" 
                                    type="range" 
                                    min="0" 
                                    max="1" 
                                    step="0.01">
                                </input>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="map" className="map">
                    <div className="title">
                        <div id="menuLeft" className="bar-menu-left" onClick={() => this.handlerMenu(!openMenuOptions)}><i className="fa fa-bars" aria-hidden="true"></i></div>
                        Mapa comarcal / municipal    
                    </div>
                    <Map selectedLayer={selectedLayer}>
                        <Layers>
                            {showTopo && (
                                <BaseLayers
                                    source={topo()}
                                    zIndex={0}
                                    extent = {[257904,4484796,535907,4751795]}
                                    title={App.TOPOGRAFIC_MAP}
                                />
                            )}
                            {showOrto && (
                                <BaseLayers
                                    source={orto()}
                                    zIndex={0}
                                    extent = {[257904,4484796,535907,4751795]}
                                    title={App.ORTOFOTOMAPA_MAP}
                                />
                            )}
                            {
                                <GroupLayers
                                    source={comarques()}
                                    zIndex={0}
                                    extent = {[257904,4484796,535907,4751795]}
                                    title={App.COMARQUES_LAYER}
                                    visible
                                />
                            }
                        </Layers>
                        <Controls>
                            <FullScreenControl />
                        </Controls>
                    </Map>
                </div>
            </div>
        );
    }	
}

export default App;