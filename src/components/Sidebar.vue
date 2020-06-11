<template>
    <div>
        <a-menu mode="inline"
                style="height: 100%"
                v-model="selectedCategory"
        >
            <a-sub-menu key="category">
                <span slot="title">Category</span>
                <a-menu-item v-for="(category, index) in categories"
                             :key="index"
                             @click="handleFilter('choose-category', category, 'selectedCategory', 'categories', index)"
                >
                    {{ category }}
                </a-menu-item>
            </a-sub-menu>
        </a-menu>

        <a-menu mode="inline"
                style="height: 100%"
                v-model="selectedStatus"
        >
            <a-sub-menu key="status">
                <span slot="title">Status</span>
                <a-menu-item v-for="(status, index) in statuses"
                             :key="`status${index}`"
                             @click="handleFilter('choose-status', status, 'selectedStatus', 'statuses', index)"
                >
                    {{ status }}
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
    export default {
        props: {
            blob: Object
        },

        data() {
            return {
                categories: [],
                statuses: [],
                selectedCategory: [],
                selectedStatus: [],
            }
        },

        mounted() {
            this.categories = this.setFilterByName('Category');
            this.statuses = this.setFilterByName('Status');
        },

        methods: {
            setFilterByName (name) {
                return Array.from( new Set( this.blob.features.map( item => item.properties.project[name]) ) )
            },

            handleFilter (emitName, value, selectedKey, sourceArray, index) {
                if ( this[sourceArray][index] === value ) {
                    this[selectedKey] = [];
                }
                this.$nextTick(() => {
                    this.$emit( emitName, this[selectedKey].length === 0 ? '' : value );
                })
            }
        }
    }
</script>