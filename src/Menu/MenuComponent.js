import React from "react"
import InputLayerSelectorAndOpacity from "../Utils/InputComponents"
import { baseLayers, layers } from "../Utils/Constants";

const MenuComponent = (props) => {
    return (
        <div className={"main-menu "+ (props.openMenuOptions ? "open" : "")} id="mainMenuContainer">
            <div className="main-menu-options">
                <div id="menuLeftBaseLayers" className="margin-top-10 cursor-pointer">Capes</div>
                <div className="separation-line"></div>
                <div id="inputsLayers">
                    <div className="aligns-items">       
                        <InputLayerSelectorAndOpacity 
                            type="radio"
                            name="baseLayerRadioButton" 
                            defaultValue={baseLayers.TOPOGRAFIC_MAP}
                            checked={props.selectedBaseLayer.TOPOGRAFIC_MAP}
                            onChange={event => props.handlerRadioButtonsBaseLayer(event.target)}
                            className="cursor-pointer"
                            layerName="ICC Topo"
                            onChangeRange={event => props.handlerOpacityLayer(event.target)}
                        />
                    </div>
                    <div className="aligns-items margin-top-10">
                        <InputLayerSelectorAndOpacity
                            type="radio" 
                            name="baseLayerRadioButton" 
                            defaultValue={baseLayers.ORTOFOTOMAPA_MAP}
                            checked={props.selectedBaseLayer.ORTOFOTOMAPA_MAP}
                            onChange={event => props.handlerRadioButtonsBaseLayer(event.target)}
                            className="cursor-pointer"
                            layerName="ICC Orto"
                            onChangeRange={event => props.handlerOpacityLayer(event.target)}
                        />
                    </div>
                    <div className="aligns-items margin-top-10">
                        <InputLayerSelectorAndOpacity
                            type="checkbox" 
                            name="comarquesCheckBox" 
                            defaultValue={layers.COMARQUES_LAYER}
                            onChange={event => props.handlerCheckButtonsLayers(event.target)}
                            className="cursor-pointer"
                            layerName="Comarques"
                            defaultChecked
                            id="comarques"
                            onChangeRange={event => props.handlerOpacityLayer(event.target)}
                        />
                    </div>
                    <div className="aligns-items margin-top-10">
                        <InputLayerSelectorAndOpacity
                            type="checkbox" 
                            name="municipisCheckBox" 
                            defaultValue={layers.MUNICIPIS_LAYER}
                            onChange={event => props.handlerCheckButtonsLayers(event.target)}
                            className="cursor-pointer"
                            layerName="Municipis"
                            defaultChecked={false}
                            id="municipis"
                            onChangeRange={event => props.handlerOpacityLayer(event.target)}
                        />
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuComponent;