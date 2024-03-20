import { ResultData, TagData } from "@/api/interface/index";
import http from "@/api";

/**
 * @description 获取机试题
 * @params 请求参数
 */
export const getMachineProblems = (params: FormData) => {
  return http.get<ResultData>(`/sys/machine-problem`, params, { cancel: false });
};
/**
 * @description 创建机试题
 * @params 请求参数
 */
export const addMachineProblems = (params: FormData) => {
  return http.post<ResultData>(`/sys/machine-problem`, params);
};
/**
 * @description 获取机试题详情
 * @number 题号
 */
export const getMachineDetail = number => {
  return http.get<ResultData>(`/sys/machine-problem/${number}`);
};
/**
 * @description 删除机试题
 * @number 题号
 */
export const delMachineProblems = number => {
  return http.delete<ResultData>(`/sys/machine-problem/${number}`);
};
/**
 * @description 获取标签
 * @params 请求参数
 */
export const getTags = () => {
  return http.get<TagData>(`/sys/problem-tag`, { cancel: false });
};

/**
 * @description 添加子标签
 * @params 请求参数
 */
export const addTags = (params: { parentId: number; name: string }) => {
  return http.post<ResultData>(`/sys/problem-tag`, params, { cancel: false });
};
/**
 * @description 添加根标签
 * @params 请求参数
 */
export const addRootTags = (params: { name: string; category: string }) => {
  return http.post<ResultData>(`/sys/problem-tag`, params, { cancel: false });
};
/**
 * @description 删除标签
 * @id 标签id
 */
export const deleteTags = id => {
  return http.delete<ResultData>(`/sys/problem-tag/${id}`, { cancel: false });
};
/**
 * @description 获取笔试题
 * @params 请求参数
 */
export const getWrittenProblems = (params: FormData) => {
  return http.get<ResultData>(`/sys/pencil-problem`, params, { cancel: false });
};
/**
 * @description 创建笔试题
 * @params 请求参数
 */
export const addWrittenProblems = (params: any) => {
  return http.post<ResultData>(`/sys/pencil-problem`, params);
};
/**
 * @description 获取笔试题详情
 * @number 题号
 */
export const getWrittenDetail = number => {
  return http.get<ResultData>(`/sys/pencil-problem/${number}`);
};
/**
 * @description 删除笔试题
 * @number 题号
 */
export const delWrittenProblems = number => {
  return http.delete<ResultData>(`/sys/pencil-problem/${number}`);
};
