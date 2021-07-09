<template>
<div>
  <button 
   type="button"
   class="btn btn-outline-primary btn-sm" @click="showModal('create')">新增產品</button>

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
                    class="btn btn-outline-primary btn-sm ml-1"
                    @click="showModal('edit',product)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm  ml-1"
                    @click="delteProduct(product.id)"
                  >
                    刪除
                  </button>
                   <button
                    type="button"
                    class="btn btn-outline-info btn-sm  ml-1"
                     @click="showModal('detail',product)"
                  >
                   檢視詳情
                  </button>
                </div>
              </td>
            </tr>
            <pagination :pagination="pagination"></pagination>
           <modify-modal ref="modifyModal" @proudctsChange=" getProductsApi()" ></modify-modal>
</div>
</template>

<script>
import pagination from '../components/pagination.vue';
import modifyModal from "../components/modifyModal.vue";

 


export default {  
  name: "Products",
  data(){
    return{
      products:[],
      pagination:{},
      modal:{},          
    }
  },  
  props:['page'],
  methods:{
    getProductsApi(){       
       
      const  apiUrl =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${this.page}`;
      this.$http.get(apiUrl).then(
        res=>{
          if(res.data.success){
            this.products =res.data.products;
            this.pagination =res.data.pagination;            
          }
          else{
            alert(res.data.message)
          }
        }
      )
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
    },
    showModal(pattern,targetProduct){
     if(pattern=="create"){
       //清空temporaryProuct
      this.$refs.modifyModal.temporaryProuct={};
        this.$refs.modifyModal.pattern =pattern;
       this.$refs.modifyModal.openModal();
     }
     else if(pattern =="edit"){
           this.$refs.modifyModal.pattern =pattern;
       this.$refs.modifyModal.temporaryProuct ={...targetProduct};
       this.$refs.modifyModal.openModal();
       
     }
     else if(pattern == "detail"){
           this.$refs.modifyModal.pattern =pattern;
       this.$refs.modifyModal.temporaryProuct =targetProduct;
       this.$refs.modifyModal.openModal();
     }
    },
    delteProduct(id){
   const  apiUrl =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http.delete(apiUrl).then(res=>{
         //錯誤通知
      if(!res.data.success){    
       alert(`${res.data.message}`);
      }else{
          //建立成功
       alert("產品刪除成功!!");       
      }
    this.getProductsApi();
      

      })
    } 

  },
 mounted(){
    //預設取得第一頁
    this.getProductsApi(); 
  },
 watch:{
   page(){
    this.getProductsApi();  
   }
 },
  components: {
    pagination,
    modifyModal
  },
};
</script>
