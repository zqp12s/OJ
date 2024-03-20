export const route = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/layouts/index.vue"),
    redirect: "/home/index",
    meta: {
      title: null
    },
    children: [
      {
        path: "/home/index",
        name: "homefill",
        component: () => import("@/views/home/index.vue"),
        isShow: true,
        meta: {
          icon: "HomeFilled",
          title: "首页",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: true,
          isKeepAlive: true
        }
      }
    ]
  }
];

export default route;
