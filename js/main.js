
const donate_wallet = '';

let step = 0;
let initialized = false;


void function main() {
    setInterval(check_status, 10000);
    // connect_wallet();
    check_status();
    $(".ubi_all_div").show();
}();

function hide_all_steps() {
    $(".ubi_not_connect").hide();
    $(".ubi_signup").hide();
    $(".ubi_not_kyc").hide();
    $(".ubi_finish_kyc").hide();
    $(".ubi_connected").hide();
    $(".ubi_declined").hide();
    $(".ubi_id_submitted").hide();
}


async function check_status() {
    if(!initialized && web3 && web3.currentProvider) {
        web3.currentProvider.on("accountsChanged", _.debounce(check_status));
        web3.currentProvider.on("connect", _.debounce(check_status));
        initialized = true;
    }
    // check_donate_button();
    if(accounts.length == 0) {
        hide_all_steps();
        $(".ubi_not_connect").show();
        return;
    }
    let publicKey = accounts[0];
    const _web3 = new Web3(networks[active_network()].url);
    const ubi = new _web3.eth.Contract(abis.ubi, addresses.ubi);
    const userInfo = await ubi.methods.get_user_info(publicKey).call();
    const is_id_proof = $(".ubi_id_submitted").is(":visible");
    hide_all_steps();
    if(userInfo.status == 0){
        $(".ubi_signup").show();
    }
    if(userInfo.status == 1){
        if(is_id_proof) 
            $(".ubi_id_submitted").show();
        else
            $(".ubi_not_kyc").show();
        const {data} = await axios.get(`https://www.jax.money:8443/veriff/user/${publicKey}`);
    
        if(data.type == 'success') {
            if(data.user.publicKey != publicKey.toLowerCase()){
                $(".btn_verify").html("&nbsp");
                return;
            }
            if(data.status == "") { return; }
            switch(data.status) {
                case 'approved':
                case 'submitted':
                    $(".ubi_not_kyc").hide();
                    $(".ubi_id_submitted").show();
                    return;
            }
            if(data.status == 'continue'){
                $(".btn_verify").html("CONTINUE VERIFICATION");
            }
            if(data.status == 'expired' || data.status == 'abandoned') {
                $(".btn_verify").html("EXPIRED, TRY AGIAN?")
            }
            if(data.status == 'declined') {
                $(".btn_verify").html("YOUR KYC GOT REJECT, PLEASE TRY AGIAN")
            }
            if(data.status == 'resubmission_requested') {
                $(".btn_verify").html("RESUBMISSION REQUESTED, TRY AGAIN")
            }
            if(data.status == 'approved') {
                $(".btn_verify").hide();
                $(".btn_telegram").show();
            } else {
                $(".btn_verify").attr("disabled", false)
            }
        } else {
            // $(".btn_verify").html("CHECKING STATUS ...");
        }
        $(".ubi_id_submitted").hide();
        $(".ubi_not_kyc").show();
    }
    if(userInfo.status == 2) {
        $(".ubi_connected").show();
        get_pending_ubi();
        // get_total_ubi();
        // get_user_count();
        // get_history();
    }
    if(userInfo.status == 3) {
        $(".ubi_declined").show();
        
    }
}

async function signup() {
    const {success, gas, message}  = await estimateGas(get_contract(abis.ubi, addresses.ubi), "register");
    if(!success) {
        notifier.warning(message);
        return;
    }
    await notifier.async(runSmartContract(get_contract(abis.ubi, addresses.ubi), "register")
        , null, null, `Sign up UBI`);
    $(".btn_verify").html("GET VERIFIED");
    check_status();
}

async function verify() {
    $(".btn_verify").prop('disabled', true);
    try{
        await _verify();
    } catch(e){

    }
    $(".btn_verify").prop('disabled', false);
}

async function _verify() {
    if(accounts.length == 0) return;

    let publicKey = accounts[0];
    const waiting_notifier = notifier.info(
        `Waiting for server response`,
        {durations: {info: 0}, labels: {info: "Fetching session status"}, icons: {info: "spinner fa-spin"}})
    
    const {data} = await axios.get(`https://www.jax.money:8443/veriff/user/${publicKey}`).catch(waiting_notifier.remove);
    waiting_notifier.remove();

    const user = data.user;
    let sessionToken;
    switch(data.status) {
        case "approved":
            return;
        case "submitted":
            return;
        case "declined":
        case "expired":
        case "abandoned":
            const waiting_notifier = notifier.info(
                `Waiting for server response`,
                {durations: {info: 0}, labels: {info: "Creating new session"}, icons: {info: "spinner fa-spin"}})
            
            const {data: newdata} = await axios.put(`https://www.jax.money:8443/veriff/user`, {publicKey: publicKey})
                .catch(waiting_notifier.remove);
            waiting_notifier.remove();
            if(newdata.type == "success") {
                sessionToken = newdata.user.sessionToken;
            }
            break;
        default:
            if(data.type == 'failed') {
                const waiting_notifier = notifier.info(
                    `Creating new veriff session`,
                    {durations: {info: 0}, labels: {info: "Waiting for server response"}, icons: {info: "spinner fa-spin"}})
               
                const {data: newdata} = await axios.post(`https://www.jax.money:8443/veriff/user`, {publicKey: publicKey}).catch(waiting_notifier.remove);
                waiting_notifier.remove();
                if(newdata.type == "success") {
                    sessionToken = newdata.user.sessionToken;
                }
                else return;
            }
            else
                sessionToken = user.sessionToken;
    }
    window.veriffSDK.createVeriffFrame({ url: `https://alchemy.veriff.com/v/${sessionToken}`,
        onEvent: async function(msg) {
            switch(msg) {
                case 'STARTED':
                    break;
                case 'CANCELED':
                    break;
                case 'FINISHED':
                    // const waiting_notifier = notifier.info(
                    //     `Waiting for server response`,
                    //     {durations: {info: 0}, labels: {info: "Updating session status"}, icons: {info: "spinner fa-spin"}})                
                    // await axios.patch("https://www.jax.money:8443/veriff/user/" + publicKey, {status: 'submitted', sessionToken}).catch(waiting_notifier.remove);
                    // waiting_notifier.remove();
                    
                    break;
            }
            check_status();
            }
        })
    
}

async function get_pending_ubi() {
    const ubi = get_contract(abis.ubi, addresses.ubi);
    let [
        totalRewardPerPerson, 
        {harvestedReward, collectedReward, releasedReward, entryReward}
    ] = await batchCall(web3, [
        ubi.methods.totalRewardPerPerson().call,
        ubi.methods.get_user_info(accounts[0]).call
    ])
    // let totalRewardPerPerson = await callSmartContract(get_contract(abis.ubi, addresses.ubi), "totalRewardPerPerson");
    // let {harvestedReward, collectedReward, releasedReward, entryReward} = await callSmartContract(get_contract(abis.ubi, addresses.ubi), "get_user_info", accounts[0]);
    let reward = formatUnit(BN(totalRewardPerPerson).sub(BN(harvestedReward)).toString(), 4, 2);
    let total_ubi = formatUnit(BN(totalRewardPerPerson).sub(BN(entryReward)).toString(), 4, 2);
    let under_process = formatUnit(BN(collectedReward).sub(BN(releasedReward)).toString(), 4, 2);
    $(".pending_ubi").html(Number(reward).toLocaleString());
    $(".under_process").html(Number(under_process).toLocaleString());
    $(".total_ubi_paid").html(Number(total_ubi).toLocaleString());
}

async function get_user_count() {
    let userCount = await callSmartContract(get_contract(abis.ubi, addresses.ubi), "userCount");
    $("#userCount").html(userCount);
}

async function get_total_ubi() {
    const events = await get_contract(abis.ubi, addresses.ubi).getPastEvents("Deposit_Reward", {
        filter: {
            user: accounts[0]
        },
        fromBlock: 'earliest',
        toBlock: 'latest'

    });
    let total_ubi = events.map(each => formatUnit(each.returnValues.amount, 4, 4)).reduce((a,b) => a + parseInt(b), 0);
    $("#total_fund").html(total_ubi);
    $("#total_collected").html(0);
}

async function collect_ubi() {
    const {success, gas, message}  = await estimateGas(get_contract(abis.ubi, addresses.ubi), "collect_ubi");
    if(!success) {
        notifier.warning(message);
        return;
    }
    await notifier.async(runSmartContract(get_contract(abis.ubi, addresses.ubi), "collect_ubi")
        , null, null, `Getting UBI`, {
            labels: {
                async: "Please wait..."
            }
        });
}

async function get_history() {
    const events = await get_contract(abis.ubi, addresses.ubi).getPastEvents("Collect_UBI", {
        filter: {
            user: accounts[0]
        },
        fromBlock: 'earliest',
        toBlock: 'latest'

    });
    let html = "";
    for(let event of events) {
        let block = await web3.eth.getBlock(event.blockNumber);
        let amount = formatUnit(event.returnValues.amount, 4);
        let date = new Date(block.timestamp * 1000);
        let dateString = date.toLocaleString();
        html = `
        <div class="table_row">
            <div class="table_small">
                <div class="table_cell">Date</div>
                <div class="table_cell">${dateString}</div>
            </div>

            <div class="table_small">
                <div class="table_cell">VRP Staking <span>Restake</span></div>
                <div class="table_cell"><span class="text-success">+ ${amount}</span> WJXN</div>
            </div>
        </div>
        ` + html;
    }
    $("#results .table_row").remove();
    $("#results").append(html);
}

async function check_donate_button() {
    if(accounts.length == 0) {
        $("#btn_donate").html("Connect wallet");
        return;
    }
    let allowance = await get_contract(abis.erc20, addresses.ubi).methods.allowance(accounts[0], get_contract(abis.ubi, addresses.ubi)._address).call();
    allowance = formatUnit(allowance);
    if(allowance < 100000){
        $("#btn_donate").html("Approve");
        return
    }
    $("#btn_donate").html("Donate");
}

async function donate() {
    let allowance = await get_contract(abis.erc20, addresses.ubi).methods.allowance(accounts[0], get_contract(abis.ubi, addresses.ubi)._address).call();
    allowance = formatUnit(allowance);
    if(allowance < 100000){
        await approve_token("WJAX", get_contract(abis.erc20, addresses.ubi), get_contract(abis.ubi, addresses.ubi)._address, "1" + "0".repeat(77));
        return;
    }
    let amount = $("#donate_amount").val();
    if(!amount){
        return;
    }
    const promise = runSmartContract(get_contract(abis.ubi, addresses.ubi), "deposit_reward", parseUnit(amount, 4));
    notifier.async(promise, null, null, `Donating ${amount} ${token_name}`, {labels: {
        async: "Please wait..."
    }});
}   

async function donate_to_wallet() {
    let amount = $("#donate_amount").val();
    const {success, gas, message}  = await estimateGas(get_contract(abis.erc20, addresses.ubi), "transfer", donate_wallet);   
    if(!success) {
        notifier.warning(message);
        return;
    }
    notifier.async(runSmartContract(get_contract(abis.erc20, addresses.ubi), "transfer", parseUnit(amount, 4)), 
        null, null, `Donating ${amount} ${token_name}`, {labels: {
        async: "Please wait..."
    }});
}