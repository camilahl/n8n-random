import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
/**
 * Node: Random (True Random Number Generator)
 * Usa RANDOM.ORG (HTTP interface) para gerar 1 inteiro entre Min e Max (inclusivos)
 */
export declare class Random implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
