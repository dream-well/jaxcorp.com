let web3;
let accounts = [];
let mode = "test";
// let active_network = "polygonmainnet";
let testnet_chain_id = "0x61";
let markup_fee_decimal = 8;
//https://f3oall.github.io/awesome-notifications/docs/
let notifier;
let BN;

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const EvmChains = window.EvmChains;
const Fortmatic = window.Fortmatic;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;

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
        image: 'https://www.jax.money/img/busd_logo.png'
    },
    "WJXN": {
        decimals: 0,
        approval: true,
        code: 'wjxn',
        exchanges: ["VRP"],
        image: 'https://www.jax.money/img/wjxn.png'
    },
    "WJAX": {
        decimals: 4,
        approval: true,
        code: 'wjax',
        exchanges: ["JAXUD", "BUSD"],
        image: 'https://www.jax.money/img/jax.png',
        address: '0x1d60AA1D6137Dcb1306C8A901EBd215Ca661d0cb'
    },
    "VRP": {
        decimals: 18,
        approval: true,
        code: 'vrp',
        exchanges: ["WJXN"],
        image: 'https://www.jax.money/img/j-usd.png'
    },
    "JAXUD": {
        decimals: 18,
        approval: true,
        code: 'jusd',
        exchanges: ["WJAX", "JAXRE", "BUSD"],
        image: 'https://www.jax.money/img/j-usd.png'
    },
    "JAXRE": {
        decimals: 18,
        approval: true,
        code: 'jinr',
        exchanges: ["JAXUD", "BUSD"],
        image: 'https://www.jax.money/img/j-inr.png'
    },

}

let contracts;
let contracts_provider;
let web3_provider;

function init_web3() {

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          // Mikko's test key - don't copy as your mileage may vary
          rpc: {
            1: "https://mainnet.infura.io/v3/6797126c4f0942d99b649046e1ade16d",
            97: "https://speedy-nodes-nyc.moralis.io/cb02b6b8ff2cdd26f1db08a4/bsc/testnet",
            56: `https://bsc-dataseed1.binance.org/`,
            137: `https://speedy-nodes-nyc.moralis.io/cb02b6b8ff2cdd26f1db08a4/polygon/mainnet`,
            80001: `https://speedy-nodes-nyc.moralis.io/cb02b6b8ff2cdd26f1db08a4/polygon/mumbai`,
            43113: `https://speedy-nodes-nyc.moralis.io/cb02b6b8ff2cdd26f1db08a4/avalanche/testnet`,
          }
        }
      },
  
      fortmatic: {
        package: Fortmatic,
        options: {
          // Mikko's TESTNET api key
          key: "pk_test_391E26A3B43A3350"
        }
      }
    };
  
    web3Modal = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions, // required
    });
  
}

async function onConnect() {

    // console.log("Opening a dialog", web3Modal);
    try {
        if(Web3.givenProvider){
            provider = Web3.givenProvider;
        }
        else{
            provider = await web3Modal.connect();
        }
    } catch(e) {
      console.log("Could not get a wallet connection", e);
    //   onConnect();
      return;
    }

    web3 = new Web3(provider);

    web3.currentProvider.on("accountsChanged", _accounts => {
        accounts = _accounts
        if(is_wrong_network()) {
            accounts = [];
            on_wrong_network();
        }
        if (accounts.length == 0) {
            reset_connect_button();
        } else {
            set_connected_address();
        }
    });

    web3.currentProvider.on("chainChanged", () => {
        if (parseInt(web3.currentProvider.chainId) != networks[active_network()].chainId) {
            on_wrong_network();
            accounts = [];
        } else {
            connect_wallet();
        }
    })

    connect_wallet();

    
}


async function getContractAddresses() {
    web3_provider = new Web3(networks[active_network()].url);
    const contractsInfo = {
        "wjax":{"address":"0x1d60AA1D6137Dcb1306C8A901EBd215Ca661d0cb"},
        "ubi":{"address":"0x9a7B81542e9EBb9Be499660D1599b6ba60e7a4e2",
            "abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"idHash","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonus","type":"uint256"},{"indexed":false,"internalType":"string","name":"remarks","type":"string"}],"name":"Accept_User","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"jaxCorp_governor","type":"address"}],"name":"Change_My_JaxCorp_Governor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"collect_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Collect_UBI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit_Reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Register","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"remarks","type":"string"}],"name":"Reject_User","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"collect_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Release_Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"Request_Update","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"jaxCorp_governors","type":"address[]"}],"name":"Set_AjaxPrime_Delegates","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newUbiAjaxPrime","type":"address"},{"indexed":false,"internalType":"uint256","name":"newUbiAjaxPrimeLocktime","type":"uint256"}],"name":"Set_Ajax_Prime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"jaxCorp_governor","type":"address"},{"indexed":false,"internalType":"uint256","name":"limit","type":"uint256"}],"name":"Set_JaxCorp_Governor_Limit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"jaxCorp_governors","type":"address[]"}],"name":"Set_JaxCorp_Governors","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"locktime","type":"uint256"}],"name":"Set_Locktime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"ubi_ajaxPrimeNominee","type":"address"}],"name":"Set_Major_Ajax_Prime_Nominee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Set_Minimum_Reward_Per_Person","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardToken","type":"address"}],"name":"Set_Reward_Token","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"collect_id","type":"uint256"},{"indexed":false,"internalType":"address","name":"jaxCorp_governor","type":"address"}],"name":"Unlock_Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newUbiAjaxPrime","type":"address"}],"name":"Update_Ajax_Prime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw_By_Admin","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ajaxPrime_delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"idHash","type":"uint256"},{"internalType":"uint256","name":"advance","type":"uint256"},{"internalType":"string","name":"remarks","type":"string"}],"name":"approveUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"jaxCorp_governor","type":"address"}],"name":"changeMyJaxCorpGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"ubi_ajaxPrimeNominee","type":"address"}],"name":"check_major_ubi_ajax_prime_nominee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collect_ubi","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit_reward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"get_collect_info","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint64","name":"collect_timestamp","type":"uint64"},{"internalType":"uint64","name":"unlock_timestamp","type":"uint64"},{"internalType":"uint64","name":"release_timestamp","type":"uint64"}],"internalType":"struct Ubi.CollectInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"get_user_info","outputs":[{"internalType":"enum Ubi.Status","name":"status","type":"uint8"},{"internalType":"uint256","name":"idHash","type":"uint256"},{"internalType":"uint256","name":"harvestedReward","type":"uint256"},{"internalType":"uint256","name":"collectedReward","type":"uint256"},{"internalType":"uint256","name":"releasedReward","type":"uint256"},{"internalType":"uint256","name":"entryReward","type":"uint256"},{"internalType":"uint256","name":"collect_count","type":"uint256"},{"internalType":"uint256","name":"release_count","type":"uint256"},{"internalType":"address","name":"jaxCorp_governor","type":"address"},{"internalType":"string","name":"remarks","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idHashInfo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_ubi_ajaxPrime","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_locktime","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"}],"name":"isAjaxPrimeDelegate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"jaxCorp_governor","type":"address"}],"name":"isJaxCorpGovernor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"jaxCorpGovernorAdvanceLimitInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"jaxCorpGovernorLimitInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"jaxCorp_governors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"locktime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"majorUbiAjaxPrimeNominee","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minimumRewardPerPerson","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"new_ubi_ajaxPrime","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"new_ubi_ajaxPrime_locktime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"string","name":"remarks","type":"string"}],"name":"rejectUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"collect_id","type":"uint256"}],"name":"release_collect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_delegates","type":"address[]"}],"name":"setAjaxPrimeDelegates","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"jaxCorp_governor","type":"address"},{"internalType":"uint256","name":"limit","type":"uint256"},{"internalType":"uint256","name":"advance_limit","type":"uint256"}],"name":"setJaxCorpGovernorLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_jaxCorp_governors","type":"address[]"}],"name":"setJaxCorpGovernors","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_locktime","type":"uint256"}],"name":"set_locktime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"set_minimum_reward_per_person","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardToken","type":"address"}],"name":"set_reward_token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newUbiAjaxPrime","type":"address"}],"name":"set_ubi_ajax_prime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"ubi_ajaxPrimeNominee","type":"address"}],"name":"set_ubi_ajax_prime_nominee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalRewardPerPerson","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_ubi_paid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ubi_ajaxPrime","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ubi_ajaxPrimeNomineeInfo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"collect_id","type":"uint256"}],"name":"unlock_collect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"update_ubi_ajax_prime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"userCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voteCountInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawByAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"}]
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


function on_wrong_network() {
    $(".btn_connect").html("Switch Network");
    $(".btn_connect").removeClass("btn-info");
    $(".btn_connect").removeClass("btn-success");
    $(".btn_connect").addClass("btn-danger");
}

void function main() {

    init_web3();

    const web3 = get_web3();
    BN = (str) => (new web3.utils.BN(str));

    getContractAddresses();
    // setTimeout(real_time_update, 500);
    // setInterval(real_time_update, 3000)

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

    if(localStorage.getItem("walletconnected") == "true")
        connect_wallet();
}()

async function onConnect() {

    // console.log("Opening a dialog", web3Modal);
    try {
        if(Web3.givenProvider){
            provider = Web3.givenProvider;
        }
        else{
            provider = await web3Modal.connect();
        }
    } catch(e) {
      console.log("Could not get a wallet connection", e);
    //   onConnect();
      return;
    }

    web3 = new Web3(provider);
    web3.currentProvider.on("accountsChanged", _accounts => {
        accounts = _accounts
        if (accounts.length == 0) {
            reset_connect_button();
        } else {            
            set_connected_address();
            check_status();
        }
    });

    web3.currentProvider.on("chainChanged", () => {
        if (web3.currentProvider.chainId != networks[active_network()].chainId) {
            on_wrong_network();
            accounts = [];
        } else {
            connect_wallet();
        }
    })

    connect_wallet();

    
}

function connect_wallet() {
    if(!web3){
        onConnect();
        return;
    }
    if(is_wrong_network()) {
        switch_network();
    }
    if(web3.currentProvider.selectedAddress){
        accounts = [web3.currentProvider.selectedAddress];
        if(is_wrong_network()){
            on_wrong_network();

        }
        else{
            on_wallet_connected();
            set_connected_address();    
        }
        return;
    }
    else if(web3.currentProvider.accounts && web3.currentProvider.accounts.length > 0) {
        accounts = web3.currentProvider.accounts;
        if(is_wrong_network()){
            on_wrong_network();

        }
        else{
            on_wallet_connected();
            set_connected_address();    
        }
        return;
    }

    return web3.eth.requestAccounts()
        .then(_accounts => {
            accounts = _accounts;
            // console.log(accounts);
            if (parseInt(web3.currentProvider.chainId) != networks[active_network()].chainId) {
                $(".btn_connect").html("Switch Network");
                switch_network();
            } else {
                on_wallet_connected();
                set_connected_address();
            }
        })
        .catch(error => {
            console.error(error);
        })

}       

function disconnect_wallet() {
    accounts = [];
    reset_connect_button();
    if(typeof check_status != "undefined") check_status();
}

function switch_network() {
    web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x" + networks[active_network()].chainId.toString(16) }]
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
    const network = networks[active_network()];
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
    $(".btn_connect").html("Connect a Wallet");
    localStorage.setItem("walletconnected", false);

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
    localStorage.setItem("walletconnected", true);
}


async function add_to_wallet(token) {
    let {address, decimals, image} = tokens[token];
    await add_token_to_metamask(address, token, decimals, image);
}

function is_wrong_network() {
    if(!web3 || accounts.length == 0) return false;
    if(!active_network()) return false;
    return parseInt(web3.currentProvider.chainId) != networks[active_network()].chainId;
}

function active_network() {
    return "polygonmainnet";
}

function get_web3() {
    if(web3 && !is_wrong_network())
        return web3;
    return new Web3(networks[active_network()].url);
}