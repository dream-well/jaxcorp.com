
const donate_wallet = '';

let step = 0;


void function main() {
    setInterval(check_status, 10000);
    web3.currentProvider.on("accountsChanged", _.debounce(check_status));
    web3.currentProvider.on("connect", _.debounce(check_status));
    connect_wallet();
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
}

async function check_status() {
    check_donate_button();
    if(accounts.length == 0) {
        hide_all_steps();
        $(".ubi_not_connect").show();
        return;
    }
    const count = await callSmartContract(contracts.ubi, "userCount");
    console.log("count", count);
    const userInfo = await callSmartContract(contracts.ubi, "userInfo", accounts[0]);
    hide_all_steps();
    if(userInfo.status == 0){
        $(".ubi_signup").show();
    }
    if(userInfo.status == 1){
        $(".ubi_not_kyc").show();
        const {data} = await axios.get(`https://beta.jax.money:8443/veriff/user/${accounts[0]}`);
        if(data.type == 'success') {
            if(data.status == "") { return; }
            if(data.status == 'continue'){
                $(".btn_verify").html("CONTINUE VERIFICATION");
            }
            if(data.status == 'finished') {
                $(".btn_verify").html("WAITING DECISION");
            }
            if(data.status == 'expired' || data.status == 'abandoned') {
                $(".btn_verify").html("EXPIRED, TRY AGIAN?")
            }
            if(data.status == 'declined') {
                $(".btn_verify").html("DECLINED, TRY AGIAN?")
            }
            if(data.status == 'approved') {
                $(".btn_verify").html("APPROVED");
                $(".btn_verify").attr("disabled", true)
            } else {
                $(".btn_verify").attr("disabled", false)
            }
        } else {
            $(".btn_verify").html("GET VERIFIED");
        }
    }
    if(userInfo.status == 2) {
        $(".ubi_connected").show();
        get_pending_ubi();
        get_total_ubi();
        get_user_count();
        get_history();
    }
    if(userInfo.status == 3) {
        $(".ubi_declined").show();
    }
}

async function signup() {
    const {success, gas, message}  = await runSmartContract(contracts.ubi, "register");
    if(!success) {
        notifier.warning(message);
        return;
    }
    await notifier.async(runSmartContract(contracts.ubi, "register")
        , null, null, `Getting UBI`);
    check_status();
}

async function verify() {
    if(accounts.length == 0) return;
    const {data} = await axios.get(`https://beta.jax.money:8443/veriff/user/${accounts[0]}`);
    
    const user = data.user;
    let veriffLink;
    switch(data.status) {
        case "approved":
            return;
        case "declined":
        case "expired":
        case "abandoned":
            const {data: newdata} = await axios.post(`https://beta.jax.money:8443/veriff/user`, {publicKey: accounts[0]});
            if(newdata.type == "success") {
                veriffLink = data.sessionToken;
            }
            break;
        default:
            if(data.type == 'failed') {
                const {data: newdata} = await axios.post(`https://beta.jax.money:8443/veriff/user`, {publicKey: accounts[0]});
                if(newdata.type == "success") {
                    veriffLink = data.sessionToken;
                }
                else return;
            }
            else
                veriffLink = `https://alchemy.veriff.com/v/${user.sessionToken}`;
    }
    window.veriffSDK.createVeriffFrame({ url: veriffLink,
        onEvent: async function(msg) {
            switch(msg) {
                case 'STARTED':
                    break;
                case 'CANCELED':
                    break;
                case 'FINISHED':
                    await axios.put("https://beta.jax.money:8443/veriff/user", {status: 'finished', ...response.verification});
                    check_status();
                    break;
            }
            }
        })
    
}

async function get_pending_ubi() {
    let totalRewardPerPerson = await callSmartContract(contracts.ubi, "totalRewardPerPerson");
    let {harvestedReward, collectedReward} = await callSmartContract(contracts.ubi, "userInfo", accounts[0]);
    let reward = formatUnit(BN(totalRewardPerPerson).sub(BN(harvestedReward)).toString(), 4, 4);
    let total_ubi = formatUnit(BN(totalRewardPerPerson).sub(BN(harvestedReward).add(BN(collectedReward))).toString(), 4, 4);
    $(".pending_ubi").html(Number(reward).toLocaleString());
    $(".total_ubi").html(Number(total_ubi).toLocaleString());
}

async function get_user_count() {
    let userCount = await callSmartContract(contracts.ubi, "userCount");
    $("#userCount").html(userCount);
}

async function get_total_ubi() {
    const events = await contracts.ubi.getPastEvents("Deposit_Reward", {
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
    const {success, gas, message}  = await estimateGas(contracts.ubi, "collect_ubi");
    if(!success) {
        notifier.warning(message);
        return;
    }
    await notifier.async(runSmartContract(contracts.ubi, "collect_ubi")
        , null, null, `Getting UBI`, {
            labels: {
                async: "Please wait..."
            }
        });
}

async function get_history() {
    const events = await contracts.ubi.getPastEvents("Collect_UBI", {
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
    let allowance = await contracts.wjax.methods.allowance(accounts[0], contracts.ubi._address).call();
    allowance = formatUnit(allowance);
    if(allowance < 100000){
        $("#btn_donate").html("Approve");
        return
    }
    $("#btn_donate").html("Donate");
}

async function donate() {
    let allowance = await contracts.wjax.methods.allowance(accounts[0], contracts.ubi._address).call();
    allowance = formatUnit(allowance);
    if(allowance < 100000){
        await approve_token("WJAX", contracts.wjax, contracts.ubi._address, "1" + "0".repeat(77));
        return;
    }
    let amount = $("#donate_amount").val();
    if(!amount){
        return;
    }
    const promise = runSmartContract(contracts.ubi, "deposit_reward", parseUnit(amount, 4));
    notifier.async(promise, null, null, `Donating ${amount} ${token_name}`, {labels: {
        async: "Please wait..."
    }});
}   

async function donate_to_wallet() {
    let amount = $("#donate_amount").val();
    const {success, gas, message}  = await estimateGas(contracts.wjax, "transfer", donate_wallet);   
    if(!success) {
        notifier.warning(message);
        return;
    }
    notifier.async(runSmartContract(contracts.wjax, "transfer", parseUnit(amount, 4)), 
        null, null, `Donating ${amount} ${token_name}`, {labels: {
        async: "Please wait..."
    }});
}