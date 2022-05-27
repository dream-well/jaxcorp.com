let web3;
let accounts = [];
let mode = "test";
let active_network = "polygonmainnet";
let testnet_chain_id = "0x61";
let markup_fee_decimal = 8;
//https://f3oall.github.io/awesome-notifications/docs/
let notifier;
let BN;


let networks = {
    ethmainnet: {
        url: "https://mainnet.infura.io/v3/6797126c4f0942d99b649046e1ade16d",
        chainId: 0x1,
        symbol: 'ETH'
    },
    bsctestnet: {
        url: "https://speedy-nodes-nyc.moralis.io/63021305c6423bed5d079c57/bsc/testnet",
        ws: "wss://speedy-nodes-nyc.moralis.io/63021305c6423bed5d079c57/bsc/testnet/ws",
        chainId: 0x61,
        chainName: 'Binance Smart Chain Testnet',
        blockExplorer: 'https://testnet.bscscan.com',
        symbol: 'BNB'
    },
    bscmainnet: {
        url: `https://bscrpc.com`,
        chainId: 0x38,
        chainName: 'Binance Smart Chain Mainnet',
        blockExplorer: 'https://bscscan.com',
        symbol: 'BNB'
    },
    polygonmainnet: {
        url: `https://polygon-rpc.com`,
        chainId: 0x89,
        symbol: 'MATIC',
        blockExplorer: 'https://polygonscan.com',
        chainName: 'Polygon Mainnet'
    },
    polygontestnet: {
        url: `https://speedy-nodes-nyc.moralis.io/63021305c6423bed5d079c57/polygon/mumbai`,
        ws: `wss://speedy-nodes-nyc.moralis.io/63021305c6423bed5d079c57/polygon/mumbai/ws`,
        chainId: 0x13881,
        symbol: 'MATIC'
    },
    avatestnet: {
        url: `https://speedy-nodes-nyc.moralis.io/63021305c6423bed5d079c57/avalanche/testnet`,
        ws: `wss://speedy-nodes-nyc.moralis.io/63021305c6423bed5d079c57/avalanche/testnet/ws`,
        chainId: 0xa869,
        symbol: 'AVAX'
    },

}

let tokens = {
    "BUSD": {
        decimals: 18,
        approval: true,
        code: 'busd',
        approval: true,
        exchanges: ["JAXUD", "JAXRE", "WJAX"],
        image: 'https://beta.jax.money/img/busd_logo.png'
    },
    "WJXN": {
        decimals: 0,
        approval: true,
        code: 'wjxn',
        exchanges: ["VRP"],
        image: 'https://beta.jax.money/img/wjxn.png'
    },
    "WJAX": {
        decimals: 4,
        approval: true,
        code: 'wjax',
        exchanges: ["JAXUD", "BUSD"],
        image: 'https://beta.jax.money/img/jax.png'
    },
    "VRP": {
        decimals: 18,
        approval: true,
        code: 'vrp',
        exchanges: ["WJXN"],
        image: 'https://beta.jax.money/img/j-usd.png'
    },
    "JAXUD": {
        decimals: 18,
        approval: true,
        code: 'jusd',
        exchanges: ["WJAX", "JAXRE", "BUSD"],
        image: 'https://beta.jax.money/img/j-usd.png'
    },
    "JAXRE": {
        decimals: 18,
        approval: true,
        code: 'jinr',
        exchanges: ["JAXUD", "BUSD"],
        image: 'https://beta.jax.money/img/j-inr.png'
    },

}

let contracts;
let contracts_provider;
let web3_provider;
async function getContractAddresses() {
    web3_provider = new Web3(networks[active_network].url);
    const contractsInfo = {
        "wjax":{"address":"0xf07352E8e3b88e8500D24301f5FC05A916d708cc"},
        "ubi":{"address":"0x9a7B81542e9EBb9Be499660D1599b6ba60e7a4e2",
            "abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"idHash","type":"uint256"},{"indexed":false,"internalType":"string","name":"remarks","type":"string"}],"name":"Accept_User","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Collect_UBI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit_Reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Register","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"remarks","type":"string"}],"name":"Reject_User","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldAjaxPrime","type":"address"},{"indexed":false,"internalType":"address","name":"newAjaxPrime","type":"address"}],"name":"Set_Ajax_Prime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Set_Minimum_Reward_Per_Person","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardToken","type":"address"}],"name":"Set_Reward_Token","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"verifier","type":"address"},{"indexed":false,"internalType":"uint256","name":"limit","type":"uint256"}],"name":"Set_Verifier_Limit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"verifiers","type":"address[]"}],"name":"Set_Verifiers","type":"event"},{"inputs":[],"name":"ajaxPrime","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"idHash","type":"uint256"},{"internalType":"string","name":"remarks","type":"string"}],"name":"approveUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collect_ubi","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit_reward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idHashInfo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_ajaxPrime","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minimumRewardPerPerson","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"string","name":"remarks","type":"string"}],"name":"rejectUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"verifier","type":"address"},{"internalType":"uint256","name":"limit","type":"uint256"}],"name":"setVerifierLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_verifiers","type":"address[]"}],"name":"setVerifiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAjaxPrime","type":"address"}],"name":"set_ajax_prime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"set_minimum_reward_per_person","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardToken","type":"address"}],"name":"set_reward_token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalRewardPerPerson","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"userCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"harvestedReward","type":"uint256"},{"internalType":"uint256","name":"idHash","type":"uint256"},{"internalType":"enum Ubi.Status","name":"status","type":"uint8"},{"internalType":"string","name":"remarks","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"verifierLimitInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"verifiers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawByAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"}]
        }
    }
    // contract_address = contractsInfo.admin.address;
    contracts = {};
    contracts_provider = {};
    if(web3)
        init_contracts(web3, contracts, contractsInfo);

    init_contracts(web3_provider, contracts_provider, contractsInfo);
    if(typeof check_status != "undefined") check_status();
}

function init_contracts(web3, contracts, contractsInfo) {
    for(let key in contractsInfo) {
        const info = contractsInfo[key];
        if(!info.abi) {
            contracts[key] = new web3.eth.Contract(minABI, info.address)
            // contracts_provider[key] = new web3_provider.eth.Contract(minABI, info.address)
            continue;
        }
        contracts[key] = new web3.eth.Contract(info.abi, info.address);
        // contracts_provider[key] = new web3_provider.eth.Contract(info.abi, info.address);
    }
}

let minABI = [{ "inputs": [], "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tx_fee", "type": "uint256" }], "name": "setTransactionFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_wallet", "type": "address" }], "name": "setTransactionFeeWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "transaction_fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "transaction_fee_decimal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "tx_fee_wallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]

function on_wallet_connected() {
}

function on_wallet_disconnected() {
    $(".btn_connect").html("Connect a Wallet");
}

function on_wrong_network() {
    $(".btn_connect").html("Switch Network");
    $(".btn_connect").removeClass("btn-info");
    $(".btn_connect").removeClass("btn-success");
    $(".btn_connect").addClass("btn-danger");
}

void function main() {

    on_wallet_disconnected();
    if(window.ethereum) {
        web3 = new Web3(Web3.givenProvider);
    } else {
        // Create a connector
        const provider = new WalletConnectProvider({
            bridge: "https://bridge.walletconnect.org", // Required
        });
        alert(provider);
        web3 = new Web3(provider);
    }
    BN = (str) => (new web3.utils.BN(str));

    getContractAddresses();
    // setTimeout(real_time_update, 500);
    // setInterval(real_time_update, 3000)

    web3.currentProvider.on("accountsChanged", _accounts => {
        accounts = _accounts
        if (accounts.length == 0) {
            on_wallet_disconnected();
            reset_connect_button();
        } else {            
            set_connected_address();
            check_status();
        }
    });

    web3.currentProvider.on("chainChanged", () => {
        if (web3.currentProvider.chainId != networks[active_network].chainId) {
            on_wrong_network();
            accounts = [];
        } else {
            connect_wallet();
        }
    })
    notifier = new AWN({
        position: "bottom-right",
        durations: {
            success: 1000,
            alert: 0
        },
        minDurations: {
            alert: 1000,
        }
    });

    if(ethereum.selectedAddress)
        connect_wallet();
}()

function connect_wallet() {
    return web3.eth.requestAccounts()
        .then(_accounts => {
            accounts = _accounts;
            console.log(accounts);

            if (web3.currentProvider.chainId != networks[active_network].chainId) {
                $(".btn_connect").html("Switch Network");
                switch_network();
            } else {
                set_connected_address();
            }
            typeof check_status != 'undefined' && check_status();
        })
        .catch(error => {
            console.error(error);
        })

}

function disconnect_wallet() {
    accounts = [];
    reset_connect_button();
    on_wallet_disconnected();
}

function switch_network() {
    web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x" + networks[active_network].chainId.toString(16) }]
        })
        .then(() => {
            set_connected_address();
        })
        .catch((error) => {
            add_network();
            console.error(error);
            on_wrong_network();
        })
}

function add_network() {
    const network = networks[active_network];
    web3.currentProvider.request({
        method: 'wallet_addEthereumChain',
        params: [{
        chainId: "0x" + network.chainId.toString(16),
        chainName: network.chainName,
        nativeCurrency: {
            name: 'Coin',
            symbol: network.symbol,
            decimals: 18
        },
        rpcUrls: [network.url],
        blockExplorerUrls: [network.blockExplorer]
        }]
    })
    .catch((error) => {
        console.log(error)
    }) 
}

function reset_connect_button() {
    // $(".btn_connect").html("Connect a wallet");
    $(".btn_connect").removeClass("btn-danger");
    $(".btn_connect").removeClass("btn-success");
    $(".btn_connect").addClass("btn-info");

}

function on_wrong_network() {
    $(".btn_connect").html("Switch Network");
    $(".btn_connect").removeClass("btn-info");
    $(".btn_connect").removeClass("btn-success");
    $(".btn_connect").addClass("btn-danger");
}

function set_connected_address() {
    $(".btn_connect").html(accounts[0].substr(0, 9) + "...");

    $(".btn_connect").removeClass("btn-info");
    $(".btn_connect").removeClass("btn-danger");
    $(".btn_connect").addClass("btn-success");
}


async function add_to_wallet(token) {
    let {address, decimals, image} = tokens[token];
    await add_token_to_metamask(address, token, decimals, image);
}