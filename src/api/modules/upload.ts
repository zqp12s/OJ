// import { Upload } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 获取预签名
 * @fileName 文件名
 */
// 图片上传
// export const getUploadURL = (fileName: string) => {
//   return http.post(`/sys/problem-tool/pre-signed-upload-url`, fileName, { cancel: false });
// };

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = (params: File) => {
  return http.post(`/sys/problem-tool/media/upload`, params, { cancel: false });
};

// 视频上传
// export const uploadVideo = (params: FormData) => {
//   return http.post<Upload.ResFileUrl>(PORT1 + `/file/upload/video`, params, { cancel: false });
// };
/**
 * @description 上传机试题测试案例
 * @params 请求参数为zip文件
 */
export const uploadTestCase = (params: File) => {
  return http.post(`/sys/problem-tool/testcase/upload`, params, { cancel: false });
};
