<template>
<div> 
<table class="table">
  <thead>
    <tr>
      <th scope="col">購買時間</th>
      <th scope="col">電郵信箱</th>
      <th scope="col">購買品項</th>
      <th scope="col">總金額</th>
      <th scope="col">付款狀態</th>
      <th scope="col">編輯</th>
    </tr>
  </thead>
  <tbody>
  <tr v-for="(order) in orders" :key="order.id">
              <td>{{ $filters.date(order.create_at) }}</td>
              <td>{{order.user.email}}</td>
              <td ><span style="display:block" v-for="(product,key) in order.products" :key="key" >{{`${productTable[product.product_id].title}*${product.qty}` }}</span></td>
              <td>{{order.total}}</td>
              <td>
                <span v-if="order.is_paid" class="text-success">已付款</span>
                <span v-else>未付款</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                     @click="showModal('edit',order)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"                
                    @click="deleteOrder(order.id)"
                  >
                    刪除
                  </button>
                   <button
                    type="button"
                    class="btn btn-outline-info btn-sm"
                      @click="showModal('detail',order)"
                  >
                   檢視詳情
                  </button>
                </div>
              </td>
            </tr>
  </tbody>
  </table>
            <pagination :pagination="pagination"></pagination>
            <order-modal ref="orderModal" ></order-modal>
           
</div>
</template>


<script>
import pagination from '../components/pagination.vue';
import orderModal from '../components/orderModel.vue'


export default {  
  name: "orders",
  data(){
    return{
      orders:[],
      pagination:{},
      modal:{},   
      productTable:{} ,          
    }
  },
  props:['page'],  
  methods:{
    getAllProducts(){
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`).then(res=>{
        this.productTable =res.data.products;        
      })
    },
    getOdersApi(){       
            const  apiUrl =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.page}`;
      this.$http.get(apiUrl).then(
        res=>{
          if(res.data.success){
            this.orders =res.data.orders;
            this.pagination =res.data.pagination; 
                    
          }
          else{
            alert(res.data.message)
          }
        }
      )
    },  
    showModal(pattern,targetOrder){    
       if(pattern =="edit"){        
           this.$refs.orderModal.pattern =pattern;
         this.$refs.orderModal.tempOrder ={...targetOrder};
         this.$refs.orderModal.openModal();       
         }
       else if(pattern == "detail"){
         this.$refs.orderModal.pattern =pattern;
         this.$refs.orderModal.tempOrder ={...targetOrder};
       this.$refs.orderModal.openModal();
       }
      },
      deleteOrder(id){
          const  apiUrl =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      this.$http.delete(apiUrl).then(res=>{
         //錯誤通知
      if(!res.data.success){    
       alert(`${res.data.message}`);
      }else{
          //建立成功
       alert("訂單刪除成功!!");       
      }
    this.getOdersApi()     

      })

    }
  },
 mounted(){
   this.getAllProducts()    
    this.getOdersApi(); 
  },
 watch:{
   page(){
    this.getOdersApi();  
   }
 },
  components: {
    pagination,
    orderModal
    
  }
}
</script>
