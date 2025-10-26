import { config } from "dotenv";
import { ethers } from "ethers";
import fs from "fs";
config();

async function deployContract() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const source = fs.readFileSync("./contracts/GoldBarTether.sol", "utf8");
  const solc = await import("solc");

  const input = {
    language: "Solidity",
    sources: { "GoldBarTether.sol": { content: source } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } }
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contractFile = output.contracts["GoldBarTether.sol"]["GoldBarTether"];
  const abi = contractFile.abi;
  const bytecode = contractFile.evm.bytecode.object;

  console.log("🚀 Deploying GoldBarTether...");
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  console.log("✅ Deployed at:", contract.target);
  return { address: contract.target, abi };
}

if (process.argv[2] === "run") {
  deployContract().then(console.log).catch(console.error);
}

export default deployContract;
