import "./load-production-env.mjs";
import { evaluateProductionEnvironment } from "../lib/production-preflight.mjs";

const result = evaluateProductionEnvironment(process.env);
console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exitCode = 1;
