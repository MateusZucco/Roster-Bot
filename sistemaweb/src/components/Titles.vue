<template>
  <div class="box-title">
    <p :class="{'title-1-color': type == 1 ,'title-2-color': type == 2}" class="titles-fonts">{{text}}</p>
  </div>
</template>
<script>
export default {
    props:{
        text:{
            type: String
        },
        type:{
            type: Number,
            default:1
        },
    }
}
</script>
<style>
.box-title{
    padding-top: 55px;
    padding-bottom: 35px;
    display: flex;
    justify-content: center;
}
.title-1-color{
  color: #105C51;
  background: var(--details);
}
.title-2-color{
  color: var(--details);
  background: #105C51;
}
</style>