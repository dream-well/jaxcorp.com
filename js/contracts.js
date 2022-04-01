const abis = {
    ubi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"idHash","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonus","type":"uint256"},{"indexed":false,"internalType":"string","name":"remarks","type":"string"}],"name":"Accept_User","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"jaxCorp_governor","type":"address"}],"name":"Change_My_JaxCorp_Governor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"collect_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Collect_UBI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit_Reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Register","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"remarks","type":"string"}],"name":"Reject_User","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"collect_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Release_Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"Request_Update","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"jaxCorp_governors","type":"address[]"}],"name":"Set_AjaxPrime_Delegates","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newUbiAjaxPrime","type":"address"},{"indexed":false,"internalType":"uint256","name":"newUbiAjaxPrimeLocktime","type":"uint256"}],"name":"Set_Ajax_Prime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"jaxCorp_governor","type":"address"},{"indexed":false,"internalType":"uint256","name":"limit","type":"uint256"}],"name":"Set_JaxCorp_Governor_Limit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"jaxCorp_governors","type":"address[]"}],"name":"Set_JaxCorp_Governors","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"locktime","type":"uint256"}],"name":"Set_Locktime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"ubi_ajaxPrimeNominee","type":"address"}],"name":"Set_Major_Ajax_Prime_Nominee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Set_Minimum_Reward_Per_Person","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardToken","type":"address"}],"name":"Set_Reward_Token","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"collect_id","type":"uint256"},{"indexed":false,"internalType":"address","name":"jaxCorp_governor","type":"address"}],"name":"Unlock_Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newUbiAjaxPrime","type":"address"}],"name":"Update_Ajax_Prime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw_By_Admin","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ajaxPrime_delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"idHash","type":"uint256"},{"internalType":"uint256","name":"advance","type":"uint256"},{"internalType":"string","name":"remarks","type":"string"}],"name":"approveUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"jaxCorp_governor","type":"address"}],"name":"changeMyJaxCorpGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"ubi_ajaxPrimeNominee","type":"address"}],"name":"check_major_ubi_ajax_prime_nominee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collect_ubi","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit_reward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"get_collect_info","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint64","name":"collect_timestamp","type":"uint64"},{"internalType":"uint64","name":"unlock_timestamp","type":"uint64"},{"internalType":"uint64","name":"release_timestamp","type":"uint64"}],"internalType":"struct Ubi.CollectInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"get_user_info","outputs":[{"internalType":"enum Ubi.Status","name":"status","type":"uint8"},{"internalType":"uint256","name":"idHash","type":"uint256"},{"internalType":"uint256","name":"collectedReward","type":"uint256"},{"internalType":"uint256","name":"releasedReward","type":"uint256"},{"internalType":"uint256","name":"collect_count","type":"uint256"},{"internalType":"uint256","name":"release_count","type":"uint256"},{"internalType":"address","name":"jaxCorp_governor","type":"address"},{"internalType":"string","name":"remarks","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idHashInfo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_ubi_ajaxPrime","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_locktime","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"}],"name":"isAjaxPrimeDelegate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"jaxCorp_governor","type":"address"}],"name":"isJaxCorpGovernor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"jaxCorpGovernorAdvanceLimitInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"jaxCorpGovernorLimitInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"jaxCorp_governors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"locktime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"majorUbiAjaxPrimeNominee","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minimumRewardPerPerson","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"new_ubi_ajaxPrime","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"new_ubi_ajaxPrime_locktime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"string","name":"remarks","type":"string"}],"name":"rejectUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"collect_id","type":"uint256"}],"name":"release_collect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_delegates","type":"address[]"}],"name":"setAjaxPrimeDelegates","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"jaxCorp_governor","type":"address"},{"internalType":"uint256","name":"limit","type":"uint256"},{"internalType":"uint256","name":"advance_limit","type":"uint256"}],"name":"setJaxCorpGovernorLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_jaxCorp_governors","type":"address[]"}],"name":"setJaxCorpGovernors","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_locktime","type":"uint256"}],"name":"set_locktime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"set_minimum_reward_per_person","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardToken","type":"address"}],"name":"set_reward_token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newUbiAjaxPrime","type":"address"}],"name":"set_ubi_ajax_prime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"ubi_ajaxPrimeNominee","type":"address"}],"name":"set_ubi_ajax_prime_nominee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalRewardPerPerson","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ubi_ajaxPrime","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ubi_ajaxPrimeNomineeInfo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"collect_id","type":"uint256"}],"name":"unlock_collect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"update_ubi_ajax_prime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"userCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voteCountInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawByAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    erc20: [{ "inputs": [], "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tx_fee", "type": "uint256" }], "name": "setTransactionFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_wallet", "type": "address" }], "name": "setTransactionFeeWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "transaction_fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "transaction_fee_decimal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "tx_fee_wallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]
}

const addresses = {
    ubi: '0x7ee1108Ff76b9aE2bC444dcCf3eaE92DcD60DF61',
    wjax: '0x783f4A2EfAB4f34D6a0D88b71cf1FAc6d9B46FF0'
}