const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
let contract;

const contractAddress = "0x342DD548A716E1202ad3158F5b6E21f35c129Fe4"; // Asegúrate de que esta sea la dirección correcta del contrato
const abi = [
    {
        "inputs": [
            { "internalType": "address", "name": "_defaultAdmin", "type": "address" },
            { "internalType": "string", "name": "_name", "type": "string" },
            { "internalType": "string", "name": "_symbol", "type": "string" },
            { "internalType": "address", "name": "_royaltyRecipient", "type": "address" },
            { "internalType": "uint128", "name": "_royaltyBps", "type": "uint128" },
            { "internalType": "address", "name": "_primarySaleRecipient", "type": "address" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_to", "type": "address" },
            { "internalType": "uint256", "name": "_quantity", "type": "uint256" },
            { "internalType": "string", "name": "_baseURI", "type": "string" },
            { "internalType": "bytes", "name": "_data", "type": "bytes" }
        ],
        "name": "batchMintTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "string", "name": "password", "type": "string" }
        ],
        "name": "mintWithPassword",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "baseURI", "type": "string" }
        ],
        "name": "setBaseURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "_uri", "type": "string" }
        ],
        "name": "setContractURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_saleRecipient", "type": "address" }
        ],
        "name": "setPrimarySaleRecipient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "string", "name": "password", "type": "string" }
        ],
        "name": "setPassword",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_to", "type": "address" },
            { "internalType": "string", "name": "_tokenURI", "type": "string" }
        ],
        "name": "mintTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_operator", "type": "address" },
            { "internalType": "bool", "name": "approved", "type": "bool" }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
        "name": "ownerOf",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
        "name": "getApproved",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
        "name": "tokensOfOwner",
        "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
        "name": "tokenURI",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    }
];

async function connectWallet() {
    try {
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
        document.querySelector('.wallet-button').innerText = 'Billetera Conectada';
    } catch (error) {
        alert("Error al conectar la billetera: " + error.message);
    }
}

async function mintNFT() {
    const password = document.getElementById('password').value;

    if (!password) {
        alert("Por favor ingrese una contraseña.");
        return;
    }

    try {
        const tx = await contract.mintWithPassword(signer.getAddress(), ethers.utils.formatBytes32String(password));
        await tx.wait();
        alert("¡Minting completado con éxito!");
        // Añadir la animación de confeti
        confetti();
    } catch (error) {
        alert("Error al mintear el NFT: " + error.message);
    }
}

function confetti() {
    // Lógica para mostrar la animación de confeti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

document.querySelector('.wallet-button').addEventListener('click', connectWallet);
document.querySelector('.mint-button').addEventListener('click', mintNFT);
