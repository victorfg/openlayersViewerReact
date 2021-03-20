import TileWMS from 'ol/source/TileWMS';

function comarques() {
    return [
        new TileWMS({
            url: 'http://geoserveis.icc.cat/icgc_bm5m/wms/service?',
            params: {
                'LAYERS': '20_COMARCA_PC'
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

export default comarques;