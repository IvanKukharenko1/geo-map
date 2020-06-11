<template>
    <MglMap :accessToken="accessToken"
            :mapStyle="mapStyle"
            @load="onMapLoaded"
    >
        <MglGeojsonLayer :sourceId="geoJson.data.id"
                         layerId="layerId"
                         :source="geoJson"
                         :layer="geoJsonLayer"
        />
    </MglMap>
</template>

<script>
    import Mapbox from "mapbox-gl";
    import { MglMap, MglGeojsonLayer } from "vue-mapbox";
    import mapConfig from '../config'

    export default {
        props: {
            blob: Object,
            chosenCategory: String,
            chosenStatus: String
        },

        data() {
            return {
                accessToken: mapConfig.MAPBOX_GL_ACCESS_TOKEN,
                mapStyle: mapConfig.MAPBOX_GL_STYLE,
                geoJsonLayer: {
                    type: "circle",
                    paint: {
                        "circle-color": "red"
                    }
                }
            };
        },

        created() {
            this.mapbox = Mapbox;
        },

        methods: {
            async onMapLoaded (event) {
                const asyncActions = event.component.actions

                await asyncActions.flyTo({
                    center: this.center,
                    zoom: 13,
                    speed: 2
                })
            },

            filterFeatures () {
                let res = this.filterByCondition('Category', this.blob.features)
                return this.filterByCondition('Status', res);
            },

            filterByCondition (condition, prev) {
                return this[`chosen${condition}`] === '' ? prev : prev.filter( item => {
                    return item.properties.project[condition] === this[`chosen${condition}`];
                } );
            }
        },

        computed: {
            center () {
                const coordinates = [0, 0];
                if (this.blob) {
                    this.blob.features.map( item => {
                        coordinates[0] += item.geometry.coordinates[0];
                        coordinates[1] += item.geometry.coordinates[1];
                    });
                    coordinates[0] /= this.blob.features.length;
                    coordinates[1] /= this.blob.features.length;
                }
                return coordinates;
            },
            geoJson () {
                const json = {
                    type: 'geojson',
                    data: {
                        features: this.filterFeatures(),
                        analytics: this.blob.analytics,
                        type: 'FeatureCollection'
                    }
                }
                json.data.id = 'source';
                return json;
            }
        },

        components: {
            MglMap,
            MglGeojsonLayer
        }
    };
</script>