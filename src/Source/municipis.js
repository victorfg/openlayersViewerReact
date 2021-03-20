import TileWMS from 'ol/source/TileWMS';

function municipis() {
	return new TileWMS({
        url: 'http://mapcache.icc.cat/map/bases/service?',
        params: {
            'LAYERS': 'topo'
        }
    })
}

export default municipis;