import TileWMS from 'ol/source/TileWMS';
import LayerGroup from 'ol/layer/Group';
import OLTileLayer from "ol/layer/Tile";
function comarques() {
    return (
        new LayerGroup({
            layers:[
                new OLTileLayer({
                  extent: [257904,4484796,535907,4751795],
                  source: new TileWMS({
                      url: 'http://geoserveis.icc.cat/icgc_bm5m/wms/service?',
                      params: {
                          'LAYERS': '20_COMARCA_PC'
                      }
                  }),
                  title:'municipis1',
                  visible:true
                }),
                new OLTileLayer({
                  extent: [257904,4484796,535907,4751795],
                  source: new TileWMS({
                      url: 'http://geoserveis.icc.cat/icgc_bm5m/wms/service?',
                      params: {
                          'LAYERS': '50_NOMCAP_TX'
                      }
                  }),
                  title:'municipis2',
                  visible:true
                }),
                new OLTileLayer({
                  extent: [257904,4484796,535907,4751795],
                  source: new TileWMS({
                      url: 'https://geoserveis.icgc.cat/icgc_bm5m/wms/service?',
                      params: {
                          'LAYERS': '40_TOPO_TX,70_NOMCOMARCA_TX'
                      }
                  }),
                  title:'municipis3',
                  visible:true
                })
            ]
          })
          
    )
}

function comarques1() {
    return (
        new TileWMS({
            url: 'http://geoserveis.icc.cat/icgc_bm5m/wms/service?',
            params: {
                'LAYERS': '20_COMARCA_PC'
            }
        })
    )
}

function comarques2() {
    return (
        new TileWMS({
            url: 'http://geoserveis.icc.cat/icgc_bm5m/wms/service?',
            params: {
                'LAYERS': '50_NOMCAP_TX'
            }
        })
    )
}


export default comarques;