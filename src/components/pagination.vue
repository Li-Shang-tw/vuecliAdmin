<template>
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class='{disabled:pagination.current_page==1}'><a class="page-link" href="#" @click.prevent="clickPage('pre')">Previous</a></li>
    
    <li class="page-item " :class="{active:page==pagination.current_page}"  v-for="page in pagination.total_pages" :key="page"><a class="page-link" href="#"  @click.prevent="clickPage(page)" >{{page}}</a></li>
    
    <li class="page-item" :class='{disabled:pagination.current_page==pagination.total_pages}' ><a class="page-link" href="#" @click.prevent="clickPage('next')">Next</a></li>
  </ul>
</nav>
</template>
<script>
export default {
  props:["pagination"],
  methods:{
 clickPage(page){  

   //上下頁
   if(page=="pre"){
     page = this.pagination.current_page -1
     }
   else if(page=="next"){
     page = this.pagination.current_page +1
   }
   
    const url=`${page}`;
    
    this.$router.push(url)
   
    
 }
}
  
}
</script>



