const InputLayerSelectorAndOpacity = (props) => {
    return (
        <>
            <input 
                type={props.type}
                name={props.name}
                defaultValue={props.defaultValue}
                checked={props.checked}
                onChange={props.onChange}
                className={props.className}
                defaultChecked={props.defaultChecked}
                id={props.id}>
            </input>
            <label>{props.layerName}</label>
            <input 
                defaultValue="1" 
                id ="topoOpacity" 
                className="opacity margin-left-10" 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                onChange={props.onChangeRange}>  
            </input>
         </>
    )
}

export default InputLayerSelectorAndOpacity;

