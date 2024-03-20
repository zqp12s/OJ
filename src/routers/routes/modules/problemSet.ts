export const route = [
  {
    path: "/problemSet",
    name: "problemSet",
    component: () => import("@/layouts/index.vue"),
    redirect: "/problemSet/problemSetList",
    meta: {
      icon: "Trophy",
      title: "题组",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    },
    children: [
      {
        path: "/problemSet/problemSetList",
        name: "problemSetList",
        isShow: true,
        component: () => import("@/views/problemSet/problemSetList/index.vue"),
        meta: {
          icon: "",
          title: "题组列表",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/problemSet/problemSetDetail",
        name: "problemSetDetail",
        component: () => import("@/views/problemSet/problemSetDetail/index.vue"),
        isShow: false,
        meta: {
          icon: "",
          title: "题组详情",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false
        }
      }
    ]
  }
];

export default route;
