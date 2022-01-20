let web3;
let accounts = [];
let mode = "test";
let active_network = "bsctestnet";
let testnet_chain_id = "0x61";
let markup_fee_decimal = 8;
//https://f3oall.github.io/awesome-notifications/docs/
let notifier;
let BN;

let networks = {
    ethmainnet: {
        url: "https://mainnet.infura.io/v3/6797126c4f0942d99b649046e1ade16d",
        chainId: "0x1"
    },
    bsctestnet: {
        url: "https://data-seed-prebsc-2-s3.binance.org:8545/",
        chainId: "0x61",
    },
    bscmainnet: {
        url: `https://bsc-dataseed1.binance.org/`,
        chainId: "0x38"
    },
    polygonmainnet: {
        url: `https://rpc-mainnet.maticvigil.com/`,
        chainId: "0x89"
    },
    polygontestnet: {
        url: `https://rpc-mumbai.maticvigil.com/`,
        chainId: "0x13881",
    },
    avatestnet: {
        url: `https://api.avax-test.network/ext/bc/C/rpc/`,
        chainId: "0xa869",
    },
}

let tokens = {
    "BUSD": {
        decimal: 18,
        approval: true,
        code: 'busd',
        approval: true,
        exchanges: ["J-USD", "J-INR"]
    },
    "WJXN": {
        address: "0x17Bbd2bF2D910c8a9c4f2EB6c60885D9e0c69FA7",
        decimal: 0,
        approval: true,
        code: 'wjxn',
        exchanges: ["VRP"]
    },
    "WJAX": {
        address: "0xea91b3f83F2cd7Fd9A7aDc7D2989FE29df336341",
        decimal: 4,
        approval: true,
        code: 'wjax',
        exchanges: ["J-USD"]
    },
    "VRP": {
        address: "0xa8E2BDCdDA5AAe549313554AD8f4f9041A3593d0",
        decimal: 18,
        approval: true,
        code: 'vrp',
        exchanges: ["WJXN"]
    },
    "J-USD": {
        address: "0x5507Ac594246eaAE9cd73d6690Cc9E6C3DdbCe55",
        decimal: 18,
        approval: true,
        code: 'jusd',
        exchanges: ["WJAX", "J-INR", "BUSD"]
    },
    "J-INR": {
        address: "0x56E87BA893824c57B262Ae63aa834BAd5FA84fbF",
        decimal: 18,
        approval: true,
        code: 'jinr',
        exchanges: ["J-USD", "BUSD"]
    },

}

let contract_address = "0x80D51f1e87b3Af1dcE55B231a7012871C5CB15e0";
let locked_token_sale_address = "0x65c612a00b18eECC957Bb55820b427D3bF030581";

const locked_abi = [{"inputs":[{"internalType":"address","name":"_pancakeRouter","type":"address"},{"internalType":"address","name":"_tokenVesting","type":"address"},{"internalType":"address","name":"_ref","type":"address"},{"internalType":"address","name":"_Token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceOfToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"plan","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"name":"buyLockedTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"plan","type":"uint256"}],"name":"getLockedTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnlockedTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"referral_ratio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const AggregatorInterface = [{"inputs":[],"name":"latestAnswer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

let contracts = {};

async function getContractAddresses() {
    // const { data: contractsInfo } = await axios.get("/api/contract_addresses");
    const contractsInfo = {"ubi":{"address":"0x8eC27414eBd0C64C8af22E7C810E95C3dec96481","abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Collect_UBI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit_Reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldAjaxPrime","type":"address"},{"indexed":false,"internalType":"address","name":"newAjaxPrime","type":"address"}],"name":"Set_Ajax_Prime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Set_Minimum_Reward_Per_Person","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardToken","type":"address"}],"name":"Set_Reward_Token","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"idHash","type":"string"},{"indexed":false,"internalType":"enum Ubi.Status","name":"newStatus","type":"uint8"}],"name":"Set_User_Info","type":"event"},{"inputs":[],"name":"ajaxPrime","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collect_ubi","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit_reward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ajaxPrime","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minimumRewardPerPerson","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"string","name":"idHash","type":"string"},{"internalType":"enum Ubi.Status","name":"newStatus","type":"uint8"}],"name":"setUserInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAjaxPrime","type":"address"}],"name":"set_ajax_prime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"set_minimum_reward_per_person","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardToken","type":"address"}],"name":"set_reward_token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalRewardPerPerson","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"userCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"harvestedReward","type":"uint256"},{"internalType":"string","name":"idHash","type":"string"},{"internalType":"enum Ubi.Status","name":"status","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawByAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"}]}}

    // contract_address = contractsInfo.admin.address;
    for(let key in contractsInfo) {
        const info = contractsInfo[key];
        if(!info.abi) {
            contracts[key] = new web3.eth.Contract(minABI, info.address)
            continue;
        }
        contracts[key] = new web3.eth.Contract(info.abi, info.address);
    }
}

let exchange_rate = 0;


let minABI = [{ "inputs": [], "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tx_fee", "type": "uint256" }], "name": "setTransactionFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_wallet", "type": "address" }], "name": "setTransactionFeeWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "transaction_fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "transaction_fee_decimal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "tx_fee_wallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]

let mainABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "jinr_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "jusd_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee_jusd_amount", "type": "uint256" }], "name": "swap_JINR_JUSD", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "jusd_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "jinr_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee_jinr_amount", "type": "uint256" }], "name": "swap_JUSD_JINR", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "jusd_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "wjax_amount", "type": "uint256" }], "name": "Exchange_JUSD_WJAX", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "vrp_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "wjxn_amount", "type": "uint256" }], "name": "Exchange_VRP_WJXN", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wjax_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "jusd_amount", "type": "uint256" }], "name": "Exchange_WJAX_JUSD", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wjxn_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "vrp_amount", "type": "uint256" }], "name": "Exchange_WJXN_VRP", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "add_to_blacklist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ajax_prime", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "swap_jinr_jusd", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "swap_jusd_jinr", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "current_system_state", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit_wjax", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit_wjxn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "jusd_amount", "type": "uint256" }], "name": "exchange_jusd_wjax", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "vrp_amount", "type": "uint256" }], "name": "exchange_vrp_wjxn", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "wjax_amount", "type": "uint256" }], "name": "exchange_wjax_jusd", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "wjxn_amount", "type": "uint256" }], "name": "exchange_wjxn_vrp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "fee_decimal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "get_governor_public_key_address", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "get_jinr_jusd_ratio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "get_jusd_jinr_ratio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "get_jusd_wjax_ratio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "get_vrp_wjxn_ratio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "get_wjax_jusd_ratio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "get_wjxn_vrp_ratio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "governor", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "governor_policy_hash", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "governor_policy_link", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "jinr", "outputs": [{ "internalType": "contract IXBEP20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "jusd", "outputs": [{ "internalType": "contract IXBEP20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "jusd_jinr_markup_fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "jusd_jinr_markup_fee_wallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ratio_decimal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "readme_hash", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "readme_link", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint128", "name": "tx_tax", "type": "uint128" }, { "internalType": "string", "name": "colony_policy_link", "type": "string" }, { "internalType": "bytes32", "name": "colony_policy_hash", "type": "bytes32" }, { "internalType": "address", "name": "mother_colony_public_key", "type": "address" }], "name": "register_colony", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "remove_from_blacklist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_wjxn", "type": "address" }, { "internalType": "address", "name": "_wjax", "type": "address" }, { "internalType": "address", "name": "_vrp", "type": "address" }, { "internalType": "address", "name": "_jusd", "type": "address" }, { "internalType": "address", "name": "_jinr", "type": "address" }], "name": "setTokenAddresses", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_cashback_percent", "type": "uint256" }], "name": "set_cashback_percent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "colony_address", "type": "address" }], "name": "set_colony_address", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_hash", "type": "string" }, { "internalType": "string", "name": "_link", "type": "string" }], "name": "set_governor_policy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_governor", "type": "address" }], "name": "set_governor_public_key_address", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_jax_corp_dao", "type": "address" }, { "internalType": "uint128", "name": "tx_tax", "type": "uint128" }, { "internalType": "string", "name": "policy_link", "type": "string" }, { "internalType": "bytes32", "name": "policy_hash", "type": "bytes32" }], "name": "set_jaxcorp_dao", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_referral_fee", "type": "uint256" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "set_jinr_referral_fee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tx_fee", "type": "uint256" }, { "internalType": "uint256", "name": "_tx_fee_cap", "type": "uint256" }, { "internalType": "address", "name": "_wallet", "type": "address" }], "name": "set_jinr_transaction_fee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_ubi_tax", "type": "uint256" }, { "internalType": "address", "name": "_wallet", "type": "address" }], "name": "set_jinr_ubi_tax", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_markup_fee", "type": "uint256" }, { "internalType": "address", "name": "_wallet", "type": "address" }], "name": "set_jusd_jinr_markup_fee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_ratio", "type": "uint256" }], "name": "set_jusd_jinr_ratio", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_referral_fee", "type": "uint256" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "set_jusd_referral_fee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tx_fee", "type": "uint256" }, { "internalType": "uint256", "name": "_tx_fee_cap", "type": "uint256" }, { "internalType": "address", "name": "_wallet", "type": "address" }], "name": "set_jusd_transaction_fee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_ubi_tax", "type": "uint256" }, { "internalType": "address", "name": "_wallet", "type": "address" }], "name": "set_jusd_ubi_tax", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_readme_hash", "type": "string" }, { "internalType": "string", "name": "_readme_link", "type": "string" }], "name": "set_readme", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_policy_hash", "type": "string" }, { "internalType": "string", "name": "_policy_link", "type": "string" }], "name": "set_system_policy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "flag", "type": "uint256" }], "name": "set_system_status", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_wjax_jusd_markup_fee", "type": "uint256" }, { "internalType": "address", "name": "_wallet", "type": "address" }], "name": "set_wjax_jusd_markup_fee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }], "name": "set_wjax_usd_pair_address", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "show_reserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "system_policy_hash", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "system_policy_link", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "system_status", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_new_ajax_prime", "type": "address" }], "name": "transferAjaxPrimeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newAdmin", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnershipOfTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "usd_inr_ratio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_pair", "type": "string" }, { "internalType": "uint256", "name": "_ratio", "type": "uint256" }], "name": "validate_conversion_ratio", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "validate_wjax_withdrawal", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "validate_wjxn_withdrawal", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "vrp", "outputs": [{ "internalType": "contract IXBEP20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw_wjax", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw_wjxn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "wjax", "outputs": [{ "internalType": "contract IXBEP20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "wjax_jusd_markup_fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "wjax_jusd_markup_fee_wallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "wjxn", "outputs": [{ "internalType": "contract WJXN", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]

let jaxAdminABI;
let jaxSwapABI;

function on_wallet_connected() {
    $(".btn_buy").html("Buy Locked Tokens");
    $("#btn_swap").html("Swap");

    // Colony page
    $("#set_colony_address").html("Save");
    $("#register_colony").html("Save");
}

function on_wallet_disconnected() {
    $(".btn_buy").html("Connect a wallet");
    $("#btn_swap").html("Connect a Wallet");
    $("#btn_swap").attr("disabled", false);
    $("#btn_approve").hide();
    $("#btn_connect").html("Connect a Wallet");

    // Colony page
    $("#set_colony_address").html("Connect a wallet");
    $("#register_colony").html("Connect a wallet");

}

function on_wrong_network() {
    $("#btn_connect").html("Switch Network");
    $("#btn_connect").removeClass("btn-info");
    $("#btn_connect").removeClass("btn-success");
    $("#btn_connect").addClass("btn-danger");
    $("#btn_swap").html("Switch Network");
}

void function main() {

    on_wallet_disconnected();

    var hover = false;
    $(".dropdown").hover(
        function() {
            if (accounts.length == 0) return;
            hover = true;
            $(this).children("ul").slideDown('medium');
        },
        function() {
            hover = false;
            setTimeout(() => {
                if (hover) return;
                $(this).children("ul").slideUp('medium');
            }, 500);
        }
    )

    init_listners();
    web3 = new Web3(Web3.givenProvider);
    getContractAddresses();
    BN = (str) => (new web3.utils.BN(str));

    // setTimeout(real_time_update, 500);
    // setInterval(real_time_update, 3000)

    ethereum.on("accountsChanged", _accounts => {
        accounts = _accounts
        if (accounts.length == 0) {
            reset_connect_button();
        } else {
            set_connected_address();
            check_allowance();
        }
    });

    ethereum.on("chainChanged", () => {
        if (web3.currentProvider.chainId != networks[active_network].chainId) {
            on_wrong_network();
            accounts = [];
        } else {
            connect_wallet();
        }
    })
    notifier = new AWN({
        position: "top-right",
        durations: {
            success: 1000,
            alert: 0
        },
        minDurations: {
            alert: 1000,
        }
    });

}()

function init_listners() {
    $(".token_select")
        .off("change")
        .on("change", on_token_changed);
    $(".money")
        .off("input")
        .on("input", on_money_changed);

    // $(".amount")
    //     .off("input")
    //     .on("input", real_time_update);
}

function connect_wallet() {
    return web3.eth.requestAccounts()
        .then(_accounts => {
            accounts = _accounts;
            console.log(accounts);

            if (web3.currentProvider.chainId != networks[active_network].chainId) {
                $("#btn_connect").html("Switch Network");
                switch_network();
            } else {
                check_status && check_status(); 
                on_wallet_connected();
                set_connected_address();
                get_balance_token("WJAX");
                check_allowance();
            }
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
            params: [{ chainId: networks[active_network].chainId }]
        })
        .then(() => {
            console.log("switched");
            set_connected_address();
        })
        .catch((error) => {
            console.error(error);
            on_wrong_network();
        })
}

function reset_connect_button() {
    // $("#btn_connect").html("Connect a wallet");
    $("#btn_connect").removeClass("btn-danger");
    $("#btn_connect").removeClass("btn-success");
    $("#btn_connect").addClass("btn-info");
    $("#balance_1").html("Balance:");
    $("#balance_2").html("Balance:");
}

function set_connected_address() {
    $("#btn_connect").html(accounts[0].substr(0, 9) + "...");

    $("#btn_connect").removeClass("btn-info");
    $("#btn_connect").removeClass("btn-danger");
    $("#btn_connect").addClass("btn-success");
}

async function get_balance_token(token, id) {
    if (accounts.length == 0) return;
    let contract = new web3.eth.Contract(minABI, tokens[token].address);
    const [balance, decimals] = await Promise.all([
            contract.methods.balanceOf(accounts[0]).call(),
            contract.methods.decimals().call()
        ])
        // .then( ([balance, decimals]) => {
        //     let real_balance = parseInt(balance) / (10 ** decimals);
        //     $(`#${id}`).html(`Balance: ${floor(real_balance, decimals)} ${token}`)
        // })
        // .catch( (error) => {
        //     console.error(error);
        // })
    let real_balance = parseInt(balance) / (10 ** decimals);
    $(`#${id}`).html(`Balance: ${floor(real_balance, 2)} ${token}`)
    return balance;
}

function rebuild_token_select_2(token_names) {
    $("#token_2").html(
        token_names.map(token_name => `<option>${token_name}</option>`).join("")
    )
}

function on_token_changed(e, token_name_2) {
    // const token = e.target.value;
    // const id = e.target.id;
    // const balance_display_id = id.replace("token_", "balance_");
    // get_balance_token(token, balance_display_id);
    // const token_name_1 = $("#token_1").val();
    // if (!token_name_2)
    //     token_name_2 = $("#token_2").val();

    // // when token_1 ischanged
    // if (token_name_1 == token) {
    //     rebuild_token_select_2(tokens[token].exchanges);
    //     if (tokens[token].exchanges.indexOf(token_name_2) >= 0) {
    //         $("#token_2").val(token_name_2);
    //     } else {
    //         $("#token_2")[0]["selectedIndex"] = 0;
    //     }
    // }
    // get_exchange_rate();
    // check_allowance();
    // $("#money_1").trigger("input");
}

function check_allowance() {
    // if ($("#token_1").length == 0) return;
    // const token = tokens[$("#token_1").val()]
    // let token_contract = new web3.eth.Contract(minABI, token.address);
    // token_contract.methods.allowance(accounts[0], contracts.jaxSwap._address).call()
    //     .then(allowance_uint => {
    //         let allowance = fromUint(allowance_uint, token.decimal)
    //         if (allowance == 0 && token.approval) {
    //             $("#btn_approve").show();
    //             $("#btn_swap").attr("disabled", true);
    //         } else {
    //             $("#btn_approve").hide();
    //             $("#btn_swap").attr("disabled", false);
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     })
}

function disableButton(flag) {
    $("#btn_approve").attr("disabled", flag);
    $("#btn_swap").attr("disabled", flag);
}

// function approve() {
//     const token_address = tokens[$("#token_1").val()].address;
//     let token_contract = new web3.eth.Contract(minABI, token_address);
//     disableButton(true);
//     notifier.async(
//         token_contract.methods.approve(contracts.jaxSwap._address, web3.utils.toWei(10 ** 15 + "")).send({ from: accounts[0] })
//         .then((flag) => {
//             disableButton(false);
//             check_allowance();
//             notifier.success("Approved");
//         })
//         .catch(error => {
//             disableButton(false);
//             if (error.code != 4001) {
//                 notifier.alert(error.message);
//             }
//             console.error(error);
//         }), null, null, "Please, wait...", {
//             labels: {
//                 async: "Approving..."
//             }
//         }
//     )

// }

function on_money_changed(e) {
    const value = e.target.value;
    const id = e.target.id;
    let money_1 = 0;
    let money_2 = 0;
    if (value == "") {} else if (id.endsWith("1")) {
        money_1 = parseFloat(value);
        money_2 = exchange_rate * value;
    } else {
        money_2 = parseFloat(value);
        money_1 = value / exchange_rate;
    }
    $("#money_1").val(floor(money_1, 10));
    $("#money_2").val(floor(money_2, 10));
    if (!e.no_rate_update)
        get_exchange_rate();
}

function floor(n, digit) {
    str = n.toFixed(17)
    a = str.split(".")
    if (Number(a[1]) == 0)
        return a[0]
    return a[0] + "." + a[1].replace(/0+$/, "").substr(0, digit)
}


function upside_down() {
    const token_name_1 = $("#token_1").val();
    const token_name_2 = $("#token_2").val();
    $("#token_2").val(token_name_1);
    $("#token_1").val(token_name_2);
    on_token_changed({ target: { value: token_name_2, id: "token_1" } }, token_name_1);
}


// async function swap() {
//     if (accounts.length == 0) {
//         connect_wallet();
//         return;
//     }
//     const token_name_1 = $("#token_1").val();
//     const token_name_2 = $("#token_2").val();
//     let contract = new web3.eth.Contract(mainABI, contract_address);
//     const token_1 = tokens[token_name_1];
//     let amount = toUint($("#money_1").val(), token_1.decimal);
//     const balance = await get_balance_token(token_name_1, 1);

//     if (amount == 0) {
//         return;
//     }

//     if (amount / (10 ** token_1.decimal) > balance / (10 ** token_1.decimal)) {
//         notifier.alert(`Insufficient fund. Check your balance of ${token_name_1}`);
//         return;
//     }
//     switch (token_name_1) {
//         case "WJXN":
//             if (token_name_2 == "VRP") {
//                 call_swap_contract(contract, "swap_wjxn_vrp", amount);
//             }
//             break;
//         case "VRP":
//             if (token_name_2 == "WJXN") {
//                 call_swap_contract(contract, "swap_vrp_wjxn", amount);
//             }
//             break;
//         case "WJAX":
//             if (token_name_2 == "J-USD") {
//                 call_swap_contract(contract, "swap_wjax_jusd", amount);
//             }
//             break;
//         case "J-USD":
//             if (token_name_2 == "WJAX") {
//                 call_swap_contract(contract, "swap_jusd_wjax", amount);
//             } else if (token_name_2 == "BUSD") {
//                 call_swap_contract(contract, "swap_jusd_busd", amount);
//             } else {
//                 call_swap_contract(contract, "swap_jusd_jtoken", tokens[token_name_2].address, amount);
//             } 
//             break;
//         case "BUSD":
//             if (token_name_2 == "J-USD") {
//                 call_swap_contract(contract, "swap_busd_jusd", amount);
//             } else {
//                 call_swap_contract(contract, "swap_jtoken_busd", tokens[token_name_2].address, amount);
//             } 
//             break;
//         case "J-INR":
//         case "J-GBP":
//         case "J-EUR":
//             if (token_name_2 == "J-USD") {
//                 call_swap_contract(contract, `swap_jtoken_jusd`, tokens[token_name_1].address, amount);
//             }
//             if (token_name_2 == "BUSD") {
//                 call_swap_contract(contract, `swap_jtoken_busd`, tokens[token_name_1].address, amount);
//             }
//             break;
//     }
// }

function call_swap_contract(contract, method, ...params) {
    notifier.async(
        contracts.jaxSwap.methods[method](...params).send({ from: accounts[0] })
        .then(() => {
            $(".token_select").each(function() {
                $(this).trigger("change");
            })
            notifier.success("Transaction Completed");
        })
        .catch(error => {
            if (error.code != 4001) {
                notifier.alert(error.message);
            }
            console.error(error);
        }), null, null, "Please, wait...", {
            labels: {
                async: "Exchanging..."
            }
        }
    )
}

function toUint(amount, decimal) {
    const splits = amount.split(".")
    if (splits.length == 1) splits[1] = "";
    splits[1] = splits[1].substr(0, decimal);
    return splits[0] + splits[1] + "0".repeat(decimal - splits[1].length)
}

function fromUint(amount, decimal) {
    return parseFloat(amount) / (10 ** decimal)
}

async function get_exchange_rate(token_name_1, token_name_2, show = true) {
    if (!token_name_1) {
        token_name_1 = $("#token_1").val();
        token_name_2 = $("#token_2").val();
        // if(accounts.length == 0) return;
    }
    const token_1 = tokens[token_name_1];
    const token_2 = tokens[token_name_2];
    let { data: { rate: _exchange_rate } } = await axios.get('/api/exchange_rate', {
        params: {
            token1: token_1.code,
            token2: token_2.code
        }
    })
    if (show) {
        exchange_rate = _exchange_rate;
        cur_token_name_1 = $("#token_1").val();
        cur_token_name_2 = $("#token_2").val();
        if (token_name_1 == cur_token_name_1 && token_name_2 == cur_token_name_2) {
            $("#exchange_rate").html(`1 ${token_name_1} = ${_exchange_rate} ${token_name_2}`);
            on_money_changed({
                target: {
                    id: "money_1",
                    value: $("#money_1").val()
                },
                no_rate_update: true
            })
        }
    }
    return _exchange_rate;
}

// async function real_time_update() {
//     if(!web3) return;
//     if(accounts.length == 0) return;
//     if($("#token_1").length == 0) return;
//     get_exchange_rate();
//     const token_name_1 = $("#token_1").val();
//     const token_name_2 = $("#token_2").val();
//     get_balance_token(token_name_1, "balance_1");
//     get_balance_token(token_name_2, "balance_2");

// }

async function show_reserves() {
    const { data } = await axios.get('/api/reserves')
    Object.keys(data).map(key => {
        $(`#${key}`).html(data[key])
    });
}

async function get_balance_of(token, address) {
    let contract = new web3.eth.Contract(minABI, tokens[token].address);
    const balance = await contract.methods.balanceOf(address).call();
    return balance;
}

async function get_total_supply(token) {
    let contract = new web3.eth.Contract(minABI, tokens[token].address);
    const [total_supply, decimals] = await Promise.all([
        contract.methods.totalSupply().call(),
        contract.methods.decimals().call()
    ])
    return total_supply / (10 ** decimals);
}

async function get_reserves() {
    let contract = new web3.eth.Contract(mainABI, contract_address);
    return (await contract.methods.show_reserves().call())
}

async function get_fees() {
    get_exchange_rates();

    const { data } = await axios.get('/api/fees');

    Object.keys(data).forEach(each => {
        $(`#${each}`).html(data[each] * 100 + "%")
    })

}

function get_tx_fee(token) {
    let contract = new web3.eth.Contract(minABI, tokens[token].address);
    return contract.methods.transaction_fee().call()
}

async function get_exchange_rates() {
    const { data } = await axios.get('/api/exchange_rates')

    Object.keys(data).forEach(id => {
        $(`#${id}`).html(floor(data[id], 8));
    })
}

// ?input=WJAX&output=J-USD
function pre_select_currency() {
    const query = window.location.search;
    if (query.length <= 1) return;
    const params = query.substr(1).split("&");
    const input = params[0].split('=')[1]
    const output = params[1]?.split('=')[1]
    if (Object.keys(tokens).indexOf(input) < 0)
        return;
    if (tokens[input].exchanges.indexOf(output) < 0)
        return;
    $("#token_1").val(input);
    on_token_changed({ target: $("#token_1")[0] }, output)
}

/// Colony.html

async function register_colony() {

    if (accounts.length == 0) {
        connect_wallet();
        return;
    }

    const keys = ["tx_tax", "policy_link", "policy_hash", "mother_colony_public_key"];
    const values = keys.map(key => $(`#${key}`).val());
    console.log("register_colony", keys, values);
    let contract = new web3.eth.Contract(mainABI, contract_address);
    try {
        (await contract.methods.register_colony(...values).send({ from: accounts[0] }))
    } catch (e) {
        console.log("failed");
        return;
    }

    notifier.async(
        contract.methods.register_colony(...values).send({ from: accounts[0] })
        .then(() => {
            notifier.success("Colony registered");
        })
        .catch(error => {
            if (error.code != 4001) {
                notifier.alert(error.message);
            }
            console.error(error);
        }), null, null, "Please, wait...", {
            labels: {
                async: "Registering your colony..."
            }
        }
    )

}

async function set_colony_address() {

    if (accounts.length == 0) {
        connect_wallet();
        return;
    }

    const colony_address = $("#colony_address").val();
    
    let contract = new web3.eth.Contract(mainABI, contract_address);
    
    notifier.async(
        contract.methods.set_colony_address(colony_address).send({ from: accounts[0] })
        .then(() => {
            notifier.success("Colony registered");
        })
        .catch(error => {
            if (error.code != 4001) {
                notifier.alert(error.message);
            }
            console.error(error);
        }), null, null, "Please, wait...", {
            labels: {
                async: "Registering your colony..."
            }
        }
    )
}

async function get_clony_info() {
    let contract = new web3.eth.Contract(mainABI, tokens['J-USD'].address);
    const {
        0: {
            _level: level,
            _transaction_tax: tx_tax,
            _policy_hash: polic_hash,
            _policy_link: policy_link
        },
        1: mother_colony_address
    } = await contract.methods.getColonyInfo.call();
    console.log({
        level,
        tx_tax,
        polic_hash,
        policy_link,
        mother_colony_address
    });
}

async function buylockedtokens(plan) {
    if( accounts.length == 0) {
        await connect_wallet();
        return;
    }
    let contract = new web3.eth.Contract(locked_abi, locked_token_sale_address);
    let amount = $("#amount" + plan).val();
    if(amount < 100){
        notifier.alert("Amount should not be less than 100");
    }
    let value = amount * (await contract.methods.getLockedTokenPrice(plan).call()) * 1.1;
    let referrer = $("#referral" + plan).val();
    if(referrer == "") referrer = "0x0000000000000000000000000000000000000000"
    notifier.async(
        contract.methods.buyLockedTokens(plan, amount, referrer).send({ from: accounts[0], value })
        .then(() => {
            // // real_time_update();
            // notifier.success("Transaction Completed");
        })
        .catch(error => {
            if (error.code != 4001) {
                notifier.alert(error.message);
            }
            console.error(error);
        }), null, null, "Please, wait...", {
            labels: {
                async: "Transaction is in progress..."
            }
        }
    )
}

async function get_bnb_price() {
    let contract = new web3.eth.Contract(AggregatorInterface, '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419');
    return await contract.methods.latestAnswer().call();
}

async function deposit_lpyield() {
    let amount = $("#amount").val();
    if(accounts.length == 0) {
        connect_wallet();
        return;
    }
    if(!amount) return;
    notifier.async(
        contracts.lpYield.methods.depositBUSD(web3.utils.toWei(amount)).send({from: accounts[0]})
        .then(() => {
            notifier.success("Transaction Completed");
        })
        .catch(error => {
            if (error.code != 4001) {
                notifier.alert(error.message);
            }
            console.error(error);
        }), null, null, "Please, wait...", {
            labels: {
                async: "Transaction is in progress..."
            }
        }
    );
}