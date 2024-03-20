import { ResultData } from "@/api/interface/index";
import http from "@/api";

/**
 * @description 获取机试题
 * @params 请求参数
 */
export const getMachineProblems = (params: FormData) => {
  return http.get<ResultData>(`/machine-problem`, params, { cancel: false });
};
/**
 * @description 创建机试题
 * @params 请求参数
 */
export const addMachineProblems = (params: FormData) => {
  return http.post<ResultData>(`/machine-problem`, params);
};
/**
 * @description 获取机试题详情
 * @number 题号
 */
export const getMachineDetail = number => {
  return http.get<ResultData>(`/machine-problem/${number}`);
};
/**
 * @description 删除机试题
 * @number 题号
 */
export const delMachineProblems = number => {
  return http.delete<ResultData>(`/machine-problem/${number}`);
};
/**
 * @description 获取标签
 * @params 请求参数
 */
export const getTags = (params: FormData) => {
  return http.get<ResultData>(`/problem/tags`, params, { cancel: false });
};

/**
 * @description 获取笔试题
 * @params 请求参数
 */
export const getWrittenProblems = (params: FormData) => {
  return http.get<ResultData>(`/pencil-problem`, params, { cancel: false });
};
/**
 * @description 创建笔试题
 * @params 请求参数
 */
export const addWrittenProblems = (params: FormData) => {
  return http.post<ResultData>(`/pencil-problem`, params);
};
/**
 * @description 获取笔试题详情
 * @number 题号
 */
export const getWrittenDetail = number => {
  return http.get<ResultData>(`/pencil-problem/${number}`);
};
/**
 * @description 删除笔试题
 * @number 题号
 */
export const delWrittenProblems = number => {
  return http.delete<ResultData>(`/pencil-problem/${number}`);
};
