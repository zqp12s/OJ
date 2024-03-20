export const route = [
  {
    path: "/assembly",
    name: "assembly",
    component: () => import("@/layouts/index.vue"),
    redirect: "/assembly/svgIcon",
    meta: {
      icon: "Briefcase",
      title: "常用组件",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    },
    children: [
      {
        path: "/assembly/svgIcon",
        name: "svgIcon",
        component: () => import("@/views/assembly/svgIcon/index.vue"),
        isShow: true,
        meta: {
          icon: "Menu",
          title: "SVG 图标",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/assembly/wangEditor",
        name: "wangEditor",
        component: () => import("@/views/assembly/wangEditor/index.vue"),
        isShow: true,
        meta: {
          icon: "Menu",
          title: "富文本编辑器",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      }
    ]
  }
];

export default route;
