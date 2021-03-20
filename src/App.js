import React, { useRef, useState, useEffect } from "react"
import './App.scss';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer, BaseLayers, GroupLayers } from "./Layers";
import { topo, orto, comarques,municipis } from "./Source";
import { Controls, FullScreenControl } from "./Controls";
import { baseLayers, layers } from "./Utils/Constants";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenuOptions: false,
            selectedBaseLayer:{
                ORTOFOTOMAPA_MAP:true,
                TOPOGRAFIC_MAP:false
            },
            selectLayers:{
                COMARQUES_LAYER:true,
                MUNICIPIS_LAYER:false
            }
        };
    }

    handlerMenu(ev){
        this.setState((state, props) => ({
            openMenuOptions: !state.openMenuOptions
        }));
    }

    handlerRadioButtonsBaseLayer(ev){
        switch (ev.value) {
            case baseLayers.TOPOGRAFIC_MAP:
                this.setState((state, props) => ({
                    selectedBaseLayer: {
                        ...state.selectedBaseLayer,
                        TOPOGRAFIC_MAP: ev.checked,
                        ORTOFOTOMAPA_MAP: !ev.checked
                    }
                }));
                break;
        
            case baseLayers.ORTOFOTOMAPA_MAP:
                this.setState((state, props) => ({
                    selectedBaseLayer: {
                        ...state.selectedBaseLayer,
                        ORTOFOTOMAPA_MAP: ev.checked,
                        TOPOGRAFIC_MAP: !ev.checked
                    }
                }));
                break;
        }
    }

    handlerCheckButtonsLayers(ev){
        switch (ev.value) {
            case layers.COMARQUES_LAYER:
                this.setState((state, props) => ({
                    selectLayers: {
                        ...state.selectLayers,
                        COMARQUES_LAYER: ev.checked
                    }
                }));
                break;
        
            case layers.MUNICIPIS_LAYER:
                this.setState((state, props) => ({
                    selectLayers: {
                        ...state.selectLayers,
                        MUNICIPIS_LAYER: ev.checked
                    }
                }));
                break;
        }
    }

    render(){
        const {openMenuOptions, selectedBaseLayer, selectLayers} = this.state;
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
                                    defaultValue={baseLayers.TOPOGRAFIC_MAP}
                                    checked={selectedBaseLayer.TOPOGRAFIC_MAP}
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
                                    defaultValue={baseLayers.ORTOFOTOMAPA_MAP} 
                                    defaultChecked
                                    checked={selectedBaseLayer.ORTOFOTOMAPA_MAP}
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
                                    defaultValue={layers.COMARQUES_LAYER} 
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
                                    defaultValue={layers.MUNICIPIS_LAYER}
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
                    <Map selectedBaseLayer={selectedBaseLayer} selectLayers={selectLayers}>
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
                                />
                            )}

                            {selectLayers.MUNICIPIS_LAYER && (
                                <GroupLayers
                                    source={municipis()}
                                    title={layers.MUNICIPIS_LAYER}
                                />
                            )}

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