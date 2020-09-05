<template>
  <div :class="'color'+stylenum">
      55555
  </div>
</template>

<script>
import bus from '@/components/event.js';
export default {
    props:{
        stylenum:Number
    },
    data(){
        return {
            data:1
        }
    },
    mounted(){
        this.changeYear();
    },
    methods: {
        changeYear () {
            //接收
            // bus.$on('changeYear', (year) => {
            //     // console.log(year,22222)
            //     this.stylenum = year
            // });
        }
    },
}
</script>

<style>
    .color1{
        color:red
    }
    .color2{
        color:gold
    }
    .color3{
        color:green
    }

</style>