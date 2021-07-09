import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",    
    component: () =>
      import( "../views/Login.vue"),
  },  
   
  {
    path:"/",
    component:() =>
      import('../views/Admin.vue')
    ,
    redirect:"/products/1",
    children:[ {
    path: "products/:page",
    name: "products",
    props:(route)=>{
      return{
        page:route.params.page
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue"),
  },
  {
    path: "orders/:page",
    name: "Orders",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    props:(route)=>{
      return{
        page:route.params.page
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Orders.vue"),
  }]
  },  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass :"active"
});

export default router;
