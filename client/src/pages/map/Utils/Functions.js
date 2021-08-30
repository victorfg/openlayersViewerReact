import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';

const getProjection_EPSG_25831 = () => {
    proj4.defs("EPSG:25831","+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    register(proj4);
}

export {
    getProjection_EPSG_25831
};