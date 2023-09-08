
const { ethers } = require("hardhat");
// const { ethers } = require("ethers");
const privateKey = "66f91320f941a98680912904e748b3b5ba3b587954b9a49213dc26ca8143d15b";
const wallet = new ethers.Wallet(privateKey);
async function main() {
  // Conectar al contrato desplegado en la red
  const contractAddress = "0x9172aC56B173dCA48F5e4C9b94320DFcb8642a8C"; // Reemplaza con la dirección real del contrato
 
  const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/8b54FOgQ8ZVF-dP6CAY8uopbGwt9nEHl");
  const contract = new ethers.Contract(contractAddress, [
    "function registerUser(string user, uint256 accountNumber, uint256 balance, string transactionType, uint256 amount, uint256 timestamp) public",
    "function getUserRecordsCount() public view returns (uint256)",
    "function getUserRecord(uint256 index) public view returns (string, uint256, uint256, string, uint256, uint256)",
  ], provider);

  // Ejemplo: Registrar un usuario
  const user = "Alice";
  const accountNumber = 1234567890;
  const balance = 5000;
  const transactionType = "credit";
  const amount = 1000;
  const timestamp = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

  const tx = await contract.registerUser(user, accountNumber, balance, transactionType, amount, timestamp);
  await tx.wait();

  // Ejemplo: Obtener el número de registros de usuarios
  const count = await contract.getUserRecordsCount();
  console.log(`Número de registros de usuarios: ${count}`);

  // Ejemplo: Obtener un registro de usuario específico
  const indexToRetrieve = 0; // Reemplaza con el índice que desees recuperar
  const userRecord = await contract.getUserRecord(indexToRetrieve);
  console.log("Registro de usuario recuperado:", userRecord);
}


async function sendFormDataToPolygon(formData) {
    // ... (código anterior)
  
    // Realizar la transacción al contrato en Polygon
    const transaction = await contract.registerUser(
      formData.user,
      formData.accountNumber,
      formData.balance,
      formData.transactionType,
      formData.amount,
      formData.timestamp
    );
  
    // Firmar y enviar la transacción usando la billetera
    const txResponse = await wallet.sendTransaction(transaction);
    await txResponse.wait();
  
    console.log("Transacción exitosa. Hash de la transacción:", txResponse.hash);
  }


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
