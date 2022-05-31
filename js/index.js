
async function get_statistics() {
    const web3 = new Web3(networks[active_network].url);
    const ubi = new web3.eth.Contract(abis.ubi, addresses.ubi);
    let [
      ubiBenefeciariesCount,
      totalUbiPerPerson
    ] = await Promise.all(
        [
          callSmartContract(ubi, "userCount"),
          callSmartContract(ubi, "totalRewardPerPerson")
        ]
      );
    $(".ubiBenefeciariesCount").html(ubiBenefeciariesCount);
    $(".totalUbiPerPerson").html(formatUnit(totalUbiPerPerson, 4, 0).toLocaleString());
  
  }
  async function check_status() {
    get_statistics();
    totalUbiPaid = 0;
  }
  
  check_status();