

<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link to="/products/1" class="navbar-brand">電商後台</router-link>  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <router-link to="/products/1" class="nav-item nav-link">products</router-link> |
     <router-link to="/orders/1" class="nav-item nav-link">orders</router-link> 
     <router-link to="/coupons" class="nav-item nav-link">coupons</router-link>      |
     <router-link to="/posts" class="nav-item nav-link">posts</router-link> 
       
    </div>
  </div>
</nav>
  <div class="nav">
   
  </div>
  <div class="container d-flex justify-content-center">
    <router-view />
  </div>  
</template>

<style lang="scss">
@import './assets/all.scss';
</style>

