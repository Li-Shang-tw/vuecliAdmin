<template>
<div>
  <button 
   type="button"
   class="btn btn-outline-primary btn-sm" @click="showModel">新增產品</button>
</div>
  <tr v-for="(product) in products" :key="product.id">
              <td>{{product.category}}</td>
              <td>{{product.title}}</td>
              <td class="text-end">{{product.origin_price}}</td>
              <td class="text-end">{{product.price}}</td>
              <td>
                <span v-if="product.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="passProductId(product.id,'edit')"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="passProductId(product.id,'delete')"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
            <pagination :pagination="pagination"></pagination>
           <modify-modal></modify-modal>

</template>

<script>
import pagination from '../components/pagination.vue';

 


export default {  
  name: "Products",
  data(){
    return{
      products:[],
      pagination:{}
    }
  },
  methods:{
    getProductsApi(page){     
      const  apiUrl =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(apiUrl).then(
        res=>{
          if(res.data.success){
            this.products =res.data.products;
            this.pagination =res.data.pagination;
            console.log(this.products);
            console.log(this.pagination);
          }
          else{
            alert(res.data.message)
          }
        }
      )
    },
    showModel(){

    },
    createProduct(){
       const  apiUrl =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      this.$http.post(apiUrl).then(
        res=>{
          if(res.data.success){
           console.log(res.data.message)
          }
          else{
            alert(res.data.message)
          }
        }
      )
    }

  },
  created(){
    //預設取得第一頁
    this.getProductsApi(1)
  },
  components: {
    pagination,
    modifyModal
  },
};
</script>
