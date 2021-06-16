export type ContractJson = {
   _format: string;
   contractName: string;
   abi: Record<string, object>[];
   bytecode: string;
   deployedBytecode: string;
   linkReferences: Record<string, object>;
   deployedLinkReferences: Record<string, object>;
};
