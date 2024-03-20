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
        name: "addWrittenProblem",
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
      },
      {
        path: "/problem/addMachineProblem",
        name: "addMachineProblem",
        component: () => import("@/views/problem/addProblem/machineQuestion/index.vue"),
        isShow: false,
        meta: {
          icon: "",
          title: "机试题目录入",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false
        }
      },
      {
        path: "/problem/writtenDetail",
        name: "writtenDetail",
        component: () => import("@/views/problem/problemList/components/writtenDetail.vue"),
        isShow: false,
        meta: {
          icon: "",
          title: "笔试题详情",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false
        }
      },
      {
        path: "/problem/machineDetail",
        name: "machineDetail",
        component: () => import("@/views/problem/problemList/components/machineDetail.vue"),
        isShow: false,
        meta: {
          icon: "",
          title: "机试题详情",
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
