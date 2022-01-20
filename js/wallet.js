let web3;
let accounts = []; 
let mode = "main";
let bsc_chain_id = "0x38";
let testnet_chain_id = "0x61";
let markup_fee_decimal = 8;
//https://f3oall.github.io/awesome-notifications/docs/
let notifier;
let tokens_testnet = {
    "WJXN": {
        address: "0x9b3315A74F4E5e8eEf50253198967668f640aF88",
        decimal: 0,
        approval: true,
        code: 'wjxn'
    },
    "WJAX": {
        address: "0xBc2bE0D73890Ca329c236a1eC9f491353AeA5Ddd",
        decimal: 8,
        approval: true,
        code: 'wjax'
    },
    "VRP": {
        address: "0xC0769bE3AE254FF4B36dC8f4998F02F12633f39f",
        decimal: 18,
        approval: true,
        code: 'vrp'
    },
    "  JAXUD": {
        address: "0xE16101B5142FD28Df3AD8494a18Ee17109D84860",
        decimal: 18,
        approval: true,
        code: 'jusd'
    },
    "J-INR": {
        address: "0xF1Cb1c815c0de474aF9E0C46a2FFa8224d23f451",
        decimal: 18,
        approval: true,
        code: 'jinr'
    },
    

}

let tokens = {
    "WJXN": {
        address: "0x17Bbd2bF2D910c8a9c4f2EB6c60885D9e0c69FA7",
        decimal: 0,
        approval: true,
        code: 'wjxn',
        exchanges: ["VRP"]
    },
    "WJAX": {
        address: "0x93179e8F03573860B7f16632Db3c9775d1435659",
        decimal: 4,
        approval: true,
        code: 'wjax',
        exchanges: ["  JAXUD"]
    },
    "VRP": {
        address: "0x670D5143e95553E1c386770D1dE6Ad3E3834af99",
        decimal: 18,
        approval: true,
        code: 'vrp',
        exchanges: ["WJXN"]
    },
    "  JAXUD": {
        address: "0x2Db1b17494bff5b590973D62c16A87EDAF8D36CC",
        decimal: 18,
        approval: true,
        code: 'jusd',
        exchanges: ["WJAX", "J-INR"]
    },
    "J-INR": {
        address: "0x93c1c84095564179F7064C82689a13466B840cF3",
        decimal: 18,
        approval: true,
        code: 'jinr',
        exchanges: ["  JAXUD"]
    },

}

let test_contract_address = "0xA4e8f2F28611429f5F5258453aa9AD745a35c080";

// let contract_address = "0x703D8499a9eB7C23b4538C122991BEd3C50928a1";
// let contract_address = "0xe8376315BBc353aBDB713705CcbFDe2a195E15D9";
let contract_address = "0x0F1f1d70DBEf14dd0D7747974149c31E0C45CE1E";

if(mode == "test"){
    tokens = tokens_testnet;
    bsc_chain_id = testnet_chain_id;
    contract_address = test_contract_address;
}

let exchange_rate = 0;


let minABI = [{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tx_fee","type":"uint256"}],"name":"setTransactionFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"setTransactionFeeWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transaction_fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transaction_fee_decimal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tx_fee_wallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

let mainABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"jinr_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"jusd_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee_jusd_amount","type":"uint256"}],"name":"Convert_JINR_JUSD","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"jusd_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"jinr_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee_jinr_amount","type":"uint256"}],"name":"Convert_JUSD_JINR","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"jusd_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"wjax_amount","type":"uint256"}],"name":"Exchange_JUSD_WJAX","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"vrp_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"wjxn_amount","type":"uint256"}],"name":"Exchange_VRP_WJXN","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"wjax_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"jusd_amount","type":"uint256"}],"name":"Exchange_WJAX_JUSD","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"wjxn_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"vrp_amount","type":"uint256"}],"name":"Exchange_WJXN_VRP","type":"event"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"add_to_blacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"convert_jinr_jusd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"convert_jusd_jinr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"current_system_state","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit_wjax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit_wjxn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"jusd_amount","type":"uint256"}],"name":"exchange_jusd_wjax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"vrp_amount","type":"uint256"}],"name":"exchange_vrp_wjxn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wjax_amount","type":"uint256"}],"name":"exchange_wjax_jusd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wjxn_amount","type":"uint256"}],"name":"exchange_wjxn_vrp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fee_decimal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_governor_public_key_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_jinr_jusd_ratio","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_jusd_jinr_ratio","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_jusd_wjax_ratio","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_vrp_wjxn_ratio","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_wjax_jusd_ratio","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_wjxn_vrp_ratio","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor_policy_hash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor_policy_link","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"jusd_jinr_markup_fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"jusd_jinr_markup_fee_wallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ratio_decimal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"readme_hash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"readme_link","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"remove_from_blacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_wjxn","type":"address"},{"internalType":"address","name":"_wjax","type":"address"},{"internalType":"address","name":"_vrp","type":"address"},{"internalType":"address","name":"_jusd","type":"address"},{"internalType":"address","name":"_jinr","type":"address"}],"name":"setTokenAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_hash","type":"string"},{"internalType":"string","name":"_link","type":"string"}],"name":"set_governor_policy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"}],"name":"set_governor_public_key_address","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tx_fee","type":"uint256"}],"name":"set_jinr_transaction_fee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"set_jinr_transaction_fee_wallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_markup_fee","type":"uint256"}],"name":"set_jusd_jinr_markup_fee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"set_jusd_jinr_markup_fee_wallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tx_fee","type":"uint256"}],"name":"set_jusd_transaction_fee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"set_jusd_transaction_fee_wallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_readme_hash","type":"string"},{"internalType":"string","name":"_readme_link","type":"string"}],"name":"set_readme","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_policy_hash","type":"string"},{"internalType":"string","name":"_policy_link","type":"string"}],"name":"set_system_policy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"flag","type":"uint256"}],"name":"set_system_status","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_ratio","type":"uint256"}],"name":"set_usd_inr_ratio","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_wjax_jusd_markup_fee","type":"uint256"}],"name":"set_wjax_jusd_markup_fee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"set_wjax_jusd_markup_fee_wallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"set_wjax_usd_pair_address","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"show_reserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"system_policy_hash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"system_policy_link","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"system_status","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnershipOfTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usd_inr_ratio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_ratio","type":"uint256"}],"name":"validate_conversion_ratio","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"validate_wjax_withdrawal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"validate_wjxn_withdrawal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw_wjax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw_wjxn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wjax_jusd_markup_fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wjax_jusd_markup_fee_wallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

void function main(){
    web3 = new Web3(Web3.givenProvider);  
    window.ethereum.on("accountsChanged", _accounts => {
        accounts = _accounts
        if (accounts.length == 0) {
            reset_connect_button();
        }else{
            set_connected_address();
        }
      });  
    
    window.ethereum.on("networkChanged", () => {
        if(web3.currentProvider.chainId != bsc_chain_id) {
            $("#btn_connect").html("Wrong Network");
            $("#btn_connect").removeClass("btn-info");
            $("#btn_connect").removeClass("btn-success");
            $("#btn_connect").addClass("btn-danger");
            accounts = [];
        }
        else {
            connect_wallet();
        }
    })
    var hover = false;
    $(".dropdown").hover(
        function() {
            if(accounts.length == 0) return;
            hover = true;
            $(this).children("ul").slideDown('medium');
        },
        function() {
            hover = false;
            setTimeout(() => {
                if(hover) return;
                $(this).children("ul").slideUp('medium');
            }, 500);
        }
    )

    setInterval(real_time_update, 2000) 
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

function connect_wallet() {
    web3.eth.requestAccounts()
        .then(_accounts => {
            accounts =  _accounts;
            console.log(accounts);
            
            if(web3.currentProvider.chainId != bsc_chain_id) {
                $("#btn_connect").html("Switch Network");
                switch_network();
            }
            else {
                set_connected_address();
                get_balance_token("WJAX");
            }
        })
        .catch(error => {
            console.error(error);
        })

}

function disconnect_wallet(){
    accounts = [];
    reset_connect_button();
}

function switch_network() {
    web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: bsc_chain_id }]
    })
    .then( () => {
        console.log("switched");
        set_connected_address();
    })
    .catch( (error) => {
        console.error(error);
        $("#btn_connect").html("Wrong Network");
        $("#btn_connect").removeClass("btn-info");
        $("#btn_connect").removeClass("btn-success");
        $("#btn_connect").addClass("btn-danger");
    })
}

function reset_connect_button() {
    $("#btn_connect").html("Connect a wallet");
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
    $(".token_select")
        .off("change")
        .on("change", on_token_changed);
    $(".token_select").each( function() {
        $(this).trigger("change");
    })
    $(".money")
        .off("input")
        .on("input", on_money_changed);
}

async function get_balance_token(token, id) {
    if( accounts.length == 0 ) return;
    let contract = new web3.eth.Contract(minABI,tokens[token].address);
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

function rebuild_token_select_2(token_names){
    $("#token_2").html(
        token_names.map(token_name => `<option>${token_name}</option>`).join("")
    )
}

function on_token_changed(e, token_name_2) {
    const token = e.target.value;
    const id = e.target.id;
    const balance_display_id = id.replace("token_", "balance_");
    get_balance_token(token, balance_display_id);
    const token_name_1 = $("#token_1").val();
    if(!token_name_2) 
        token_name_2 = $("#token_2").val();

    // when token_1 ischanged
    if(token_name_1 == token){
        rebuild_token_select_2(tokens[token].exchanges);
        if(token_name_2){
            $("#token_2").val(token_name_2);
        } else {
            $("#token_2")[0]["selectedIndex"] = 0;
        }
    }
    get_exchange_rate();
    check_allowance();
    $("#money_1").trigger("input");
}

function check_allowance() {
    const token = tokens[$("#token_1").val()]
    let token_contract = new web3.eth.Contract(minABI,token.address);
    token_contract.methods.allowance(accounts[0], contract_address).call()
        .then( allowance_uint => {
            let allowance = fromUint(allowance_uint, token.decimal)
            if(allowance == 0 && token.approval) {
                $("#btn_approve").show();
                $("#btn_swap").attr("disabled", true);
            } else {
                $("#btn_approve").hide();
                $("#btn_swap").attr("disabled", false);
            }
        })
        .catch( error => {
            console.error(error);
        })
}

function disableButton(flag) {
    $("#btn_approve").attr("disabled", flag);
    $("#btn_swap").attr("disabled", flag);
}

function approve() {
    const token_address = tokens[$("#token_1").val()].address;    
    let token_contract = new web3.eth.Contract(minABI,token_address);
    disableButton(true);
    notifier.async(
        token_contract.methods.approve(contract_address, web3.utils.toWei(10 ** 15 + "")).send({from: accounts[0]})
        .then( (flag) => {
            disableButton(false);
            check_allowance();
            notifier.success("Approved");
        })
        .catch( error => {
            disableButton(false);
            if( error.code != 4001 ){
                notifier.alert(error.message);
            }
            console.error(error);
        })
        ,null,null, "Please, wait...", {
            labels : {
                async: "Approving..."
            }
        }
      )
    
}

function on_money_changed(e) {
    const value = e.target.value;
    const id = e.target.id;
    let money_1 = 0;
    let money_2 = 0;
    if(value == "") {}
    else if( id.endsWith("1") ) {
        money_1 = parseFloat(value);
        money_2 = exchange_rate * value;
    } else{
        money_2 = parseFloat(value);
        money_1 = value / exchange_rate;
    }
    $("#money_1").val(floor(money_1, 10));
    $("#money_2").val(floor(money_2, 10));
    get_exchange_rate();

}

function floor(n, digit) {
    str = n.toFixed(17)
    a = str.split(".")
    if( Number(a[1]) == 0 )
        return a[0]
    return a[0] + "." + a[1].replace(/0+$/, "").substr(0, digit)
}


function upside_down() {
    const token_name_1 = $("#token_1").val();
    const token_name_2 = $("#token_2").val();
    $("#token_2").val(token_name_1);
    $("#token_1").val(token_name_2);
    on_token_changed({target: {value: token_name_2, id: "token_1"}}, token_name_1);
}


async function swap() {
    const token_name_1 = $("#token_1").val();
    const token_name_2 = $("#token_2").val();
    let contract = new web3.eth.Contract(mainABI,contract_address);
    const token_1 = tokens[token_name_1];
    let amount = toUint($("#money_1").val(), token_1.decimal);
    const balance = await get_balance_token(token_name_1, 1);

    if( amount == 0 ){
        return;
    }

    if( amount / (10 ** token_1.decimal)> balance / (10 ** token_1.decimal)) {
        notifier.alert(`Insufficient fund. Check your balance of ${token_name_1}`);
        return;
    }
    switch (token_name_1){
        case "WJXN":
            if(token_name_2 == "VRP"){
                call_swap_contract(contract, "exchange_wjxn_vrp", amount);
            }
            break;
        case "VRP":
            if(token_name_2 == "WJXN"){
                call_swap_contract(contract, "exchange_vrp_wjxn", amount);
            }
            break;
        case "WJAX":
            if(token_name_2 == "  JAXUD"){
                call_swap_contract(contract, "exchange_wjax_jusd", amount);
            }
            break;
        case "  JAXUD":
            if(token_name_2 == "WJAX"){
                call_swap_contract(contract, "exchange_jusd_wjax", amount);
            }
            else if(token_name_2 == "J-INR"){
                call_swap_contract(contract, "convert_jusd_jinr", amount);
            }
            break;
        case "J-INR":
        case "J-GBP":
        case "J-EUR":
            if(token_name_2 == "  JAXUD"){
                call_swap_contract(contract, `convert_${tokens[token_name_1].code}_jusd`, amount);
            }
            break;
    }
}

function call_swap_contract(contract, method, amount) {
    notifier.async(
        contract.methods[method](amount).send({from: accounts[0]})
            .then( () => {
                $(".token_select").each( function() {
                    $(this).trigger("change");
                })
                notifier.success("Transaction Completed");
            })
            .catch( error => {
                if(error.code != 4001) {
                    notifier.alert(error.message);
                }
                console.error(error);
            })
        , null, null, "Please, wait...", {
            labels : {
                async: "Exchanging..."
            }
        }
    )
}

function toUint(amount, decimal) {
    const splits = amount.split(".")
    if(splits.length == 1) splits[1] = "";
    splits[1] = splits[1].substr(0, decimal);
    return  splits[0] + splits[1] + "0".repeat(decimal - splits[1].length)
}

function fromUint(amount, decimal) {
    return parseFloat(amount) / (10 ** decimal)
}

async function get_exchange_rate(token_name_1, token_name_2, show = true) {
    if(!token_name_1) {
        token_name_1 = $("#token_1").val();
        token_name_2 = $("#token_2").val();
        if(accounts.length == 0) return;
    }
    const token_1 = tokens[token_name_1];
    const token_2 = tokens[token_name_2];
    let contract = new web3.eth.Contract(mainABI,contract_address);
    const {0: price, 1: decimal} = await contract.methods[`get_${token_1.code}_${token_2.code}_ratio`]().call();
    let _exchange_rate = parseInt(price) / (10 ** decimal);
    if(token_name_1 == "  JAXUD" || token_name_2 == "  JAXUD") {
        const other_token_name = token_name_1 == "  JAXUD" ? token_name_2 : token_name_1;
        const other_token = tokens[other_token_name];
        let method = `jusd_${other_token.code}_markup_fee`
        if(other_token_name == "WJAX") {
            method = `wjax_jusd_markup_fee`;
        }
        const price = await contract.methods[method]().call()
        const markup_fee = parseInt(price) / (10 ** 8);
        _exchange_rate = (1-markup_fee) * _exchange_rate;
    }
    if (show) {
        exchange_rate = _exchange_rate;
        $("#exchange_rate").html(`1 ${token_name_1} = ${floor(_exchange_rate, decimal)} ${token_name_2}`);
        on_money_changed({
            target: {
                id: "money_1",
                value: $("#money_1").val()
            }
        })
    }
    return _exchange_rate;
}

function real_time_update() {
    if($("#token_1").length == 0 || accounts.length == 0) 
        return;
    get_exchange_rate();
    const token_name_1 = $("#token_1").val();
    const token_name_2 = $("#token_2").val();
    get_balance_token(token_name_1, "balance_1");
    get_balance_token(token_name_2, "balance_2");
}

async function show_reserves() {
    
    let [
        {
            0: wjax_pancake_reserves,
            1: wjax_usd_value, 
            2: lsc_usd_value, 
            3: wjax_lsc_ratio, 
        },
        wjxn_reserves, 
        wjax_reserves, 
        vrp_total_supply, 
        jusd_total_supply, 
        jinr_total_supply, 
    ] = 
        await Promise.all(
        [
            get_reserves(),
            get_balance_of("WJXN", contract_address),
            get_balance_of("WJAX", contract_address),
            get_total_supply("VRP"),
            get_total_supply("  JAXUD"),
            get_total_supply("J-INR"),
        ]
    )
    wjax_reserves = wjax_reserves / ( 10 ** 4);
    wjax_pancake_reserves = wjax_pancake_reserves / (10 ** 18);
    wjax_usd_value = wjax_usd_value / (10 ** 18);
    lsc_usd_value = lsc_usd_value / (10 ** 18 );
    wjax_lsc_ratio = wjax_lsc_ratio / (10 ** 8);
    const datas = {
        wjxn_reserves, 
        wjax_reserves, 
        wjax_pancake_reserves,
        wjax_usd_value, 
        lsc_usd_value, 
        wjax_lsc_ratio, 
        vrp_total_supply, 
        jusd_total_supply,
        jinr_total_supply,
    };
    console.log(datas);
    Object.keys(datas).map(key => {
        $(`#${key}`).html(datas[key])
    });
}

async function get_balance_of(token, address) {
    let contract = new web3.eth.Contract(minABI,tokens[token].address);
    const balance = await contract.methods.balanceOf(address).call();
    return balance;
}

async function get_total_supply(token) {
    let contract = new web3.eth.Contract(minABI,tokens[token].address);
    const [total_supply, decimals] = await Promise.all([
        contract.methods.totalSupply().call(),
        contract.methods.decimals().call()
    ])
    return total_supply / (10 ** decimals);
}

async function get_reserves() {
    let contract = new web3.eth.Contract(mainABI,contract_address);   
    return (await contract.methods.show_reserves().call())
}

async function get_fees() {
    get_exchange_rates();
    let mainContract = new web3.eth.Contract(mainABI, contract_address);
    let [
        wjax_jusd_markup_fee,
        jusd_jinr_markup_fee,
        vrp_tx_fee,
        wjax_tx_fee,
        jusd_tx_fee,
        jinrx_tx_fee
    ] = await Promise.all([
        mainContract.methods.wjax_jusd_markup_fee().call(),
        mainContract.methods.jusd_jinr_markup_fee().call(),
        get_tx_fee("VRP"),
        get_tx_fee("WJAX"),
        get_tx_fee("  JAXUD"),
        get_tx_fee("J-INR"),
    ])

    const datas = {
        wjax_jusd_markup_fee,
        jusd_jinr_markup_fee,
        vrp_tx_fee,
        wjax_tx_fee,
        jusd_tx_fee,
        jinrx_tx_fee
    }

    Object.keys(datas).forEach(each => {
        const data = datas[each]
        $(`#${each}`).html(data / (10 ** 6) + "%")
    })

}

function get_tx_fee(token) {
    let contract = new web3.eth.Contract(minABI,tokens[token].address);
    return contract.methods.transaction_fee().call()   
}

async function get_exchange_rates() {
    const [
        wjax_jusd,
        jusd_wjax,
        jusd_jinr,
        jinr_jusd
    ] = await Promise.all([
        get_exchange_rate("WJAX", "  JAXUD", false),
        get_exchange_rate("  JAXUD", "WJAX", false),
        get_exchange_rate("  JAXUD", "J-INR", false),
        get_exchange_rate("J-INR", "  JAXUD", false),
    ])
    const datas = {
        wjax_buy: 1 / jusd_wjax,
        wjax_sell: wjax_jusd,
        jusd_buy: 1 / wjax_jusd,
        jusd_sell: jusd_wjax,
        jusd_buy_jinr: 1 / jinr_jusd,
        jusd_sell_jinr: jusd_jinr,
        jinr_buy: 1 / jusd_jinr,
        jinr_sell: jinr_jusd
    }
    Object.keys(datas).forEach(id => {
        $(`#${id}`).html(floor(datas[id], 8));
    })
}

// ?input=WJAX&output=  JAXUD
function pre_select_currency(){
    const query = window.location.search;
    if(query.length <= 1) return;
    const params = query.substr(1).split("&");
    const input = params[0].split('=')[1]
    const output = params[1]?.split('=')[1]
    if(Object.keys(tokens).indexOf(input) < 0) 
        return;
    if(tokens[input].exchanges.indexOf(output) < 0)
        return;
    $("#token_1").val(input);
    $("#token_2").val(output);
}