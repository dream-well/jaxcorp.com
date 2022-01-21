let step = 0;

void function main() {
    setInterval(check_status, 10000);
    ethereum.on("accountsChanged", _.debounce(check_status));
    ethereum.on("connect", _.debounce(check_status));
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
    const {status} = await callSmartContract(contracts.ubi, "userInfo", accounts[0]);
    hide_all_steps();
    if(status == 0){
        $(".ubi_signup").show();
    }
    if(status == 1){
        $(".ubi_not_kyc").show();
    }
    if(status == 2) {
        $(".ubi_connected").show();
        get_pending_ubi();
        get_history();
    }
    if(status == 3) {
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

function verify() {
    // const veriff =
    //     // window.open("https://magic.veriff.me/v/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiZDM3ODViYTQtZTExNy00Y2M2LWJmYWQtMGU3ZDI0NGQwY2RiIiwiaWF0IjoxNjQxNTcwMjM0fQ.u2r6-W4xoBv7X-WDhWRUQbIFilXM5rGTUJYWStM1lXk?", "_blank");
    //     window.open("http://localhost", "_blank");
    step = 2;
    check_status();
}

async function get_pending_ubi() {
    let totalRewardPerPerson = await callSmartContract(contracts.ubi, "totalRewardPerPerson");
    let {harvestedReward} = await callSmartContract(contracts.ubi, "userInfo", accounts[0]);
    let reward = formatUnit(BN(totalRewardPerPerson).sub(BN(harvestedReward)).toString(), 4, 4);
    $(".pending_ubi").html(reward);
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
    let allowance = await contracts[state.token1].methods.allowance(accounts[0], contracts.jaxSwap._address).call();
    allowance = formatUnit(allowance);
    if(allowance < 100000){
        $("#btn_donate").html("Approve");
        return
    }
    $("#btn_donate").html("Donate");
}

async function donate() {
    let allowance = await contracts[state.token1].methods.allowance(accounts[0], contracts.jaxSwap._address).call();
    allowance = formatUnit(allowance);
    if(allowance < 100000){
        await approve_token("WJAX", contracts.wjax, contracts.ubi._address, "1" + "0".repeat(77));
        return;
    }
    let amount = $("#donate_amount").val();
    const promise = runSmartContract(contracts.ubi, "deposit_reward", parseUnit(amount, 4));
    notifier.async(promise, null, null, `Donating ${amount} ${token_name}`, {labels: {
        async: "Please wait..."
    }});
}