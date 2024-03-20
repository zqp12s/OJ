export const route = [
  {
    path: "/problem",
    name: "problem",
    component: () => import("@/layouts/index.vue"),
    redirect: "/problem/problemList",
    meta: {
      icon: "Tickets",
      title: "题目",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    },
    children: [
      {
        path: "/problem/problemList",
        name: "problemList",
        isShow: true,
        component: () => import("@/views/problem/problemList/index.vue"),
        meta: {
          icon: "",
          title: "题目列表",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/problem/addWrittenProblem",
        name: "addProblem",
        component: () => import("@/views/problem/addProblem/writtenQuestions/index.vue"),
        isShow: false,
        meta: {
          icon: "",
          title: "笔试题目录入",
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
