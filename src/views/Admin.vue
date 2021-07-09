<template>
  <router-view />
</template>
<script>
export default {
    created(){      
     //檢查是否登入
     //取出token      
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
       if(token ==""){
       alert('您尚未登入請重新登入。');
       this.$router.push('/login')
       }     
       //將token預設放進axios的header      
         this.$http.defaults.headers.common.Authorization = token;  
   }
}
</script>