<template>
       <div class="container">
        <div class="row justify-content-center">
          <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
          <div class="col-8">
            <form id="form" class="form-signin">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  v-model="username"
                  placeholder="name@example.com"
                  required
                  autofocus
                />
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Password"
                  required
                />
                <label for="password">Password</label>
              </div>
              <button
                class="btn btn-lg btn-primary w-100 mt-3"
                type="button"
                @click="login"
              >
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
</template>
<script>


export default {
    data(){
      return{
        username:"",
        password:""
      }
  },methods:{
    login(){
      let user ={
    username: this.username,
    password: this.password
    } ;
    this.$http.post(`${process.env.VUE_APP_API}admin/signin`,user).then((res)=>{
         if (res.data.success) {
           //把token存入cookie
            const { token, expired } = res.data;            
            document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
           //轉址到後台葉面
            this.$router.push('/products/1')
            
          }
          //帳號錯誤
          else{
            alert(res.data.message)
          }
    
      
    
   }) 
    }
  }
}
</script>

