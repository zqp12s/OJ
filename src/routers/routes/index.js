import rank from "./rank.js";

const modules = import.meta.glob("./modules/*.ts", { eager: true });

function formatModules(_modules, result) {
  Object.keys(_modules).forEach(key => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule];
    result.push(...moduleList);
  });
  const res = [];
  rank.forEach(r => {
    const temp = result.find(ele => ele.name === r);
    if (temp) res.push(temp);
  });
  console.log("res:", res);
  return res;
}

export const appRoutes = formatModules(modules, []);
