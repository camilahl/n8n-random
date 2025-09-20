import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeOperationError, NodeConnectionType } from "n8n-workflow";


/**
 * Node: Random (True Random Number Generator)
 * Usa RANDOM.ORG (HTTP interface) para gerar 1 inteiro entre Min e Max (inclusivos)
 */
export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Random",
    name: "random",
    icon: "file:random.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{"True Random Number Generator"}}',
    description: "Gera número inteiro aleatório com RANDOM.ORG",
    defaults: { name: "Random" },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
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

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const out: IDataObject[] = [];

    for (let i = 0; i < Math.max(1, items.length); i++) {
      const min = Math.trunc(this.getNodeParameter("min", i) as number);
      const max = Math.trunc(this.getNodeParameter("max", i) as number);

      if (!Number.isFinite(min) || !Number.isFinite(max))
        throw new NodeOperationError(this.getNode(), "Min/Max devem ser números.");

      if (min > max)
        throw new NodeOperationError(this.getNode(), "Min não pode ser maior que Max.");

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
        throw new NodeOperationError(this.getNode(), "Resposta inesperada do RANDOM.ORG.");
      }
      out.push({ min, max, value, source: "random.org" });
    }

    return [this.helpers.returnJsonArray(out)];
  }
}
