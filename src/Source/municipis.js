import TileWMS from 'ol/source/TileWMS';

function municipis() {
	return [
        new TileWMS({
            url: 'http://geoserveis.icc.cat/icgc_bm5m/wms/service?',
            params: {
                'LAYERS': '02_TIPUSLINIA_LN'
            }
        }),
        new TileWMS({
            url: 'http://geoserveis.icc.cat/icgc_bm5m/wms/service?',
            params: {
                'LAYERS': '50_NOMCAP_TX'
            }
        })
    ]
}

export default municipis;