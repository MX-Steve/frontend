<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
if (window.console && window.console.log) {
  console.log(
    "%c 遵纪守法，违规必究",
    'font-family: "Helvetica Neue", Helvetica, Arial,sans-serif;font-size:12px;color:#fc5531;-webkit-text-fill-color:#fc5531;-webkit-text-stroke: 1px #fc5531;'
  );
}
</script>
