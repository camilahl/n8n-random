"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const n8n_workflow_1 = require("n8n-workflow");
/**
 * Node: Random (True Random Number Generator)
 * Usa RANDOM.ORG (HTTP interface) para gerar 1 inteiro entre Min e Max (inclusivos)
 */
class Random {
    description = {
        displayName: "Random",
        name: "random",
        icon: "file:random.svg",
        group: ["transform"],
        version: 1,
        subtitle: '={{"True Random Number Generator"}}',
        description: "Gera número inteiro aleatório com RANDOM.ORG",
        defaults: { name: "Random" },
        inputs: ["main" /* NodeConnectionType.Main */],
        outputs: ["main" /* NodeConnectionType.Main */],
        properties: [
            {
                displayName: "Min",
                name: "min",
                type: "number",
                typeOptions: { step: 1 },
                default: 1,
                description: "Menor inteiro possível (inclusivo)",
                required: true,
            },
            {
                displayName: "Max",
                name: "max",
                type: "number",
                typeOptions: { step: 1 },
                default: 60,
                description: "Maior inteiro possível (inclusivo)",
                required: true,
            },
        ],
    };
    async execute() {
        const items = this.getInputData();
        const out = [];
        for (let i = 0; i < Math.max(1, items.length); i++) {
            const min = Math.trunc(this.getNodeParameter("min", i));
            const max = Math.trunc(this.getNodeParameter("max", i));
            if (!Number.isFinite(min) || !Number.isFinite(max))
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), "Min/Max devem ser números.");
            if (min > max)
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), "Min não pode ser maior que Max.");
            const res = await this.helpers.httpRequest({
                url: "https://www.random.org/integers/",
                method: "GET",
                qs: {
                    num: 1,
                    min,
                    max,
                    col: 1,
                    base: 10,
                    format: "plain",
                    rnd: "new",
                },
                encoding: "text",
                headers: { "User-Agent": "n8n-nodes-random/1.0" },
                timeout: 10000,
            });
            const value = parseInt(String(res).trim(), 10);
            if (!Number.isInteger(value)) {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), "Resposta inesperada do RANDOM.ORG.");
            }
            out.push({ min, max, value, source: "random.org" });
        }
        return [this.helpers.returnJsonArray(out)];
    }
}
exports.Random = Random;
