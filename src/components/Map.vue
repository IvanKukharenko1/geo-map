<template>
    <MglMap :accessToken="accessToken"
            :mapStyle="mapStyle"
            @load="onMapLoaded"
    >
        <MglMarker v-for="(marker, index) in geoJson.features"
                   :key="index"
                   :coordinates="marker.geometry.coordinates"
                   color="blue"
        >
            <MglPopup :coordinates="marker.geometry.coordinates"
                      anchor="top"
                      :showed="marker.showed"
            >
                <a-card :title="marker.properties.project['Title']">
                    <p>{{ marker.properties.project['Description'] }}</p>
                </a-card>
            </MglPopup>
        </MglMarker>
    </MglMap>
</template>

<script>
    import Mapbox from "mapbox-gl";
    import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
    import mapConfig from '../config'

    export default {
        props: {
            blob: Object,
            chosenCategory: String,
            chosenStatus: String
        },

        components: {
            MglMap,
            MglMarker,
            MglPopup
        },

        data() {
            return {
                accessToken: mapConfig.MAPBOX_GL_ACCESS_TOKEN,
                mapStyle: mapConfig.MAPBOX_GL_STYLE,
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
                    zoom: mapConfig.ZOOM,
                    speed: mapConfig.SPEED
                })
            },

            filterFeatures () {
                let res = this.filterByCondition('Category', this.blob.features.map( item => ({ ...item, showed: false}) ))
                return this.filterByCondition('Status', res);
            },

            filterByCondition (condition, prev) {
                return this[`chosen${condition}`] === '' ? prev : prev.filter( item => {
                    return item.properties.project[condition] === this[`chosen${condition}`];
                } );
            },
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
                return {
                    features: this.filterFeatures(),
                    analytics: this.blob.analytics,
                }
            }
        }
    };
</script>