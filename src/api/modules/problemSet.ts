import { ResultData } from "@/api/interface/index";
import http from "@/api";
/**
 * @description 获取题组
 * @params 请求参数
 */
export const getProblemSets = (params: FormData) => {
  return http.get<ResultData>(`/sys/problem-set`, params);
};
/**
 * @description 创建题组
 * @params 请求参数
 */
export const createProblemSet = params => {
  return http.post<ResultData>(`/sys/problem-set`, params);
};
/**
 * @description 机试题组详情
 * @params 请求参数
 */
export const getMachineSetDetail = id => {
  return http.get<ResultData>(`/sys/problem-set/${id}/machine/problem`);
};
/**
 * @description 重排题组题目
 * @params 请求参数
 */
export const rearrangeProblem = (id, params) => {
  return http.put<ResultData>(`/sys/problem-set/${id}/problem/rearrange`, params);
};
/**
 * @description 笔试题组详情
 * @params 请求参数
 */
export const getPencilSetDetail = id => {
  return http.get<ResultData>(`/sys/problem-set/${id}/pencil/problem`);
};
/**
 * @description 笔试题组添加题目
 * @params 请求参数
 */
export const addMachineProblem = (id, numbers, type) => {
  return http.put<ResultData>(`/sys/problem-set/${id}/${type}/problem?numbers=${numbers}`);
};
/**
 * @description 删除题组中的题目
 * @params 请求参数
 */
export const deleteProblems = (id, numbers) => {
  return http.deletes<ResultData>(`/sys/problem-set/${id}/problem`, numbers);
};
/**
 * @description 获取机试题或笔试题列表
 * @params 请求参数
 */
export const getProblems = (type, params) => {
  return http.get<ResultData>(`/sys/${type}-problem`, params, { cancel: false });
};
/**
 * @description 编辑题组信息
 * @params 请求参数
 */
export const editProblemSetInfo = (id, info) => {
  return http.put<ResultData>(`/sys/problem-set/${id}`, info);
};
/**
 * @description 删除某个题组
 * @params 请求参数
 */
export const deleteProblemSet = id => {
  return http.delete<ResultData>(`/sys/problem-set/${id}`);
};
