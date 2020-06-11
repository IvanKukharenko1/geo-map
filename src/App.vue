<template>
  <div id="app" style="height: 100%;">
    <a-row type="flex" style="height: 100%; overflow-y: hidden">
      <a-col :span="6">
        <Sidebar :blob="blob"
                 @choose-category="chosenCategory = $event"
                 @choose-status="chosenStatus = $event"
        ></Sidebar>
      </a-col>
      <a-col :span="18">
        <Map :blob="blob"
             :chosenCategory="chosenCategory"
             :chosenStatus="chosenStatus"
        ></Map>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import testBlob from './data/testBlob.json';

export default {
  data () {
    return {
      blob: testBlob,
      chosenCategory: '',
      chosenStatus: ''
    }
  },
  components: {
    Sidebar,
    Map
  }
}
</script>
