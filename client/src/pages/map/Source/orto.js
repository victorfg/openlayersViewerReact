 import TileWMS from 'ol/source/TileWMS';

function orto() {
	return new TileWMS({
        url: 'http://geoserveis.icgc.cat/icc_mapesbase/wms/service?',
        params: {
            'LAYERS': 'orto25c'
        }
    })
}

export default orto;