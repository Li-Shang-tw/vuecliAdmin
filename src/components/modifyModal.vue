<template>
   <div
        id="productModal"
        ref="modal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span v-if="pattern=='create'">新增產品 </span>
                <span v-else-if="pattern=='edit'">修改產品 </span>
                 <span v-else-if="pattern=='detail'">產品細節 </span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-1">
                    <div class="form-group">
                      <label for="imageUrl" v-if="!(pattern=='detail')">輸入圖片網址</label>
                      <input   
                        v-if="!(pattern=='detail')"                              
                        type="file"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        ref="fileInput"
                        @change="uploadImg"
                      />
                    </div>
                    <div>
                      <p v-if="tempImageUrl">新圖片</p>
                      <img v-if="!(pattern=='detail')"
                      class="img-fluid"
                      :src="tempImageUrl"
                      alt=""
                    />
                   </div>
                   <div>
                     <p v-if="pattern=='edit'">原始圖檔</p>
                     <img 
                      class="img-fluid"
                      :src="temporaryProuct.imageUrl"
                      alt=""
                    />
                   </div>
                    
                     
                  </div>                 
                  <div>
                    <button 
                    v-if="!(pattern=='detail')"
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="deleteTemporayImg">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input                      
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入標題"
                      v-model="temporaryProuct.title"
                    />
                  </div>

                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input
                        id="category"
                        type="text"
                        class="form-control"
                        placeholder="請輸入分類"
                        v-model="temporaryProuct.category"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input
                        id="unit"
                        type="text"
                        class="form-control"
                        placeholder="請輸入單位"
                        v-model="temporaryProuct.unit"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input
                        id="origin_price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入原價"
                        v-model.number="temporaryProuct.origin_price"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input
                        id="price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入售價"
                        v-model.number="temporaryProuct.price"
                      />
                    </div>
                  </div>
                  <hr />

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入產品描述"
                      v-model="temporaryProuct.description"
                    >
                    </textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea
                      id="content"
                      type="text"
                      class="form-control"
                      placeholder="請輸入說明內容"
                      v-model="temporaryProuct.content"
                    >
                    </textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        id="is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        v-model="temporaryProuct.is_enabled"
                      />
                      <label class="form-check-label" for="is_enabled"
                        >是否啟用</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              
              <button 
              v-if="pattern =='create'"               
                type="button"
                class="btn btn-primary"
                @click="postNewProduct"                
              >
                確認
              </button>
                <button 
               v-else-if="pattern=='edit'"               
                type="button"
                class="btn btn-primary"
                @click="editProduct(temporaryProuct.id)"                
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
//引入bootstrap的modal
import Modal from 'bootstrap/js/dist/modal';
export default {
 name:"modifyModal",
 data(){
   return{
     temporaryProuct:{

     },
     tempImageUrl:"",
      modal: '',
      pattern:""
     
      
   }
 },
   mounted() {
    this.modal = new Modal(this.$refs.modal)
  
}, methods: {
  //----modal-----
    openModal() {
      
      //清除暫存圖片
      if(this.pattern!=="detail"){
       this.$refs.fileInput.value="";
      }     
   
    this.tempImageUrl="";
      if(this.pattern=="create"){
   this.temporaryProuct ={};
   }        
   this.modal.show();
    },
    hideModal() {
      //清除tempory資料
      this.temporaryProuct={};
      this.tempImageUrl="";
      this.modal.hide();
    },
    //---新增 修改 刪除---
    postNewProduct(){
      this.temporaryProuct.imageUrl=this.tempImageUrl;
       const  apiUrl =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      this.$http.post(apiUrl, { data: this.temporaryProuct }).then(res=>{
        //錯誤通知
      if(!res.data.success){      
      //關閉modal
     
      alert(`${res.data.message}`);
        }else{
         //建立成功
      alert("產品建立成功!!");       
         }
      this.hideModal(); 
      
      //通知product.vue更新畫面
      this.$emit('proudctsChange')

     })
    },
    editProduct(id){  
      this.temporaryProuct.imageUrl=this.tempImageUrl;   
      const  apiUrl =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http.put(apiUrl, { data: this.temporaryProuct }).then(res=>{
         //錯誤通知
      if(!res.data.success){    
       alert(`${res.data.message}`);
      }else{
          //建立成功
       alert("產品修改成功!!");       
      }
      this.hideModal(); 
      //清除tempory資料
       this.temporaryProuct={};
       //通知product.vue更新畫面
       this.$emit('proudctsChange')
      })
    },    
    uploadImg(){
      //取得input內的file
    const file =this.$refs.fileInput.files[0];
    //建立formData物件來裝file，符合上傳的格式
    const formData =new FormData();
    formData.append("file-to-upload",file);
    //發送建立線上img url的請求
     const  apiUrl =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(apiUrl,formData ).then(res=>{
        //錯誤通知
      if(!res.data.success){      
      
     
      alert(`${res.data.message}`);
        }else{
         //建立成功
        this.tempImageUrl =res.data.imageUrl
         }   
     })
    },    
    deleteTemporayImg(){
      this.tempImageUrl="";
       this.$refs.fileInput.value="";
    }
    
  },
 
}
</script>

