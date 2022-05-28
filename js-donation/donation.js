void function main() {
    $("#amountIn").on('input', check_status);
}()

async function donate() {
    let amount = $("#amountIn").val();
    amount = parseUnit(amount, 4);
    if(amount == 0) return;
    let ubi_admin_id = $("#admin_id").val();
    const contract = new web3.eth.Contract(abis.ubiDonation, addresses.ubiDonation);
    runContract(contract, "donate", [amount, ubi_admin_id], {
        confirmationTitle: "Donate UBI",
        pendingTitle: "Donate UBI"
    });
}

async function check_status() {
    if(accounts.length == 0) {
        $("#btn_connect").show();
        $("#btn_approve").hide();
        $("#btn_donate").attr("disabled", false);
        $("#btn_donate").hide();
        return;
    }
    $("#btn_connect").hide();
    let wjax_contract = new web3.eth.Contract(abis.erc20, addresses.wjax);
    let allowance = await callSmartContract(
        wjax_contract,
        "allowance", 
        [accounts[0], addresses.ubiDonation  ]
    );
    allowance = formatUnit(allowance, 4, 4);
    let amountIn = $("#amountIn").val();
    if((amountIn && allowance < amountIn) || (allowance == 0)) {
        $("#btn_approve").show();
        $("#btn_donate").attr("disabled", true);
        $("#btn_donate").show();
        return;
    }
    else {
        $("#btn_approve").hide();
        $("#btn_donate").attr("disabled", false);
        $("#btn_donate").show();
    }

    let balance = await get_balance(wjax_contract, 4);
    $("#balance").html(balance);
}
    

function accountChanged() {
    check_status();
}

function approve() {
    let contract = new web3.eth.Contract(abis.erc20, addresses.wjax);
    approve_token("WJAX", contract, addresses.ubiDonation);
}

async function select_max_balance() {
    let wjax_contract = new web3.eth.Contract(abis.erc20, addresses.wjax);
    let balance = await get_balance(wjax_contract, 4);
    $("#amountIn").val(balance);
    check_status();
}