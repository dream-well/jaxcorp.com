<?php

  include "includes/config.php";

?>

<?php

  include "includes/head.php";

?>

<?php

  include "includes/sideBar_logOut.php";

?>


  <header class="bg-lighterblue pt-5 pb-5">
    <div class="container">
      <h1 class="text-blue text-center">JaxCorp DAO</h1>
      <div class="row h-100">

        <div class="col-12 col-md-6 my-auto">
          <div class="pb-3">
            <div class="ajax">
              <div class="box">
                <div class="img">
                  <img src="img/ajaxprime.jpg">
                </div>
                <h2 class="text-blue">Vinod Manoharan<br><span>Founder, JaxCorp D.A.O</span></h2>
                <p class="text-blue"> "UBI is necessary for a meritocracy and to enhance equality of opportunity."</p>
                <span>

                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 video">
          <!-- THE YOUTUBE PLAYER -->


          <div class="vid-container">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/5r3DS7oQoHY" title=""
              id="vid_frame" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>

        </div>
      </div>
      <div class="text-center"><a href="<?=$ubi_status_link?>" class="btn btn-lg btn-info mt-3">Get WJAX UBI</a></div>

    </div>
  </header>
<main role="main">
<!--How mush can I earn? start-->
<section class="bg-white pt-5 pb-5">
  <div class="container">
    
    <div class="row h-100">
      <div class="col-12 col-md-12 text-center">
		  <h2 class="text-blue text-center d-block">What is UBI?</h2>
       <p class="text-blue">The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.</p>
      </div>
   
    </div>
  </div>
</section>
<!--How mush can I earn? end--> 

<!--3boxes with icons start-->
    <section class="bg-lighterblue pt-5 pb-5">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-4">
            <div class="text-center">

              <div class="p-5 bg-lighterblue border-radius box-shadow bg-white mb-2">
                <img src="img/icon1.svg" class="pb-4" width="70px">
                <h4 class="text-blue font-weight-normal pb-4">Total UBI Paid</h4>
                <h2 class="text-blue text-center totalUbiPaid">0</h2>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <div class="text-center">
              <div class="p-5 bg-lighterblue border-radius box-shadow bg-white mb-2 h-100">
                <img src="img/icon2.svg" class="pb-4" width="60px">
                <h4 class="text-blue font-weight-normal pb-4">UBI Benefeciaries</h4>
                <h2 class="text-blue text-center ubiBenefeciariesCount">0</h2>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <div class="text-center">
              <div class="p-5 bg-lighterblue border-radius box-shadow bg-white mb-2 h-100">
                <img src="img/icon3.svg" class="pb-4" width="70px">
                <h4 class="text-blue font-weight-normal pb-4">Total UBI per person</h4>
                <h2 class="text-blue text-center totalUbiPerPerson">0</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--3boxes with icons end-->
<!--points starts--->
<section class="bg-white pt-5 pb-5">
  <div class="container">
    <h3 class="text-blue font-weight-bold pb-4 text-center">How to start?</h3>
    <div class="d-flex bridgetext mb-2 mb-md-4">
		<div class="col-12 col-md-4">
        <div class="p-5 bg-lighterblue border-radius box-shadow mb-2">
			<h2 class="text-blue text-center">1</h2>
          <h4 class="text-blue font-weight-normal text-center">Connect your Metamask wallet to register</h4>         
        </div>
      </div>
		<div class="col-12 col-md-4">
        <div class="p-5 bg-lighterblue border-radius box-shadow mb-2 h-100">
			<h2 class="text-blue text-center">2</h2>
          <h4 class="text-blue font-weight-normal text-center">Pass KYC verification</h4>         
        </div>
      </div>
		<div class="col-12 col-md-4">
        <div class="p-5 bg-lighterblue border-radius box-shadow mb-2 h-100">
			<h2 class="text-blue text-center">3</h2>
          <h4 class="text-blue font-weight-normal text-center">Claim your UBI</h4>         
        </div>
      </div>
    
    </div>
    <div class="row h-100 text-center d-block pt-3"> <a href="<?=$ubi_status_link?>" class="btn btn-success btn-lg">START</a> </div>
  </div>
</section>
<!--points ends---> 
<!---FAQ-->
	<section class="bg-lighterblue pt-5">
		<div class="container">
   <h3 class="text-blue font-weight-bold text-center">FAQ</h3>
    <div class="row my-5">
      <div class="col-lg-6"> 
        
        <!-- Accordion -->
        <div id="accordionExample" class="accordion"> 
          
          <!-- Accordion item 1 -->
          <div class="card">
            <div id="headingOne" class="card-header border-0">
              <h6 class="mb-0 font-weight-bold"><a href="file:///E:/jax%20video/Landing%20page/landing%201/landing-v3/html-V6/plain.html#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" class="d-block position-relative text-uppercase collapsible-link py-2 blueclr">What is UBI?</a></h6>
            </div>
            <div id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample" class="collapse">
              <div class="card-body p-5">
                <p class="font-weight-light m-0 blueclr">In simple words, universal basic income (UBI) is a minimum amount of money enough to cover all basic human needs.
Learn more about UBI: [video link].
 </p>
              </div>
            </div>
          </div>
          
          <!-- Accordion item 2 -->
          <div class="card">
            <div id="headingTwo" class="card-header border-0">
              <h6 class="mb-0 font-weight-bold"><a href="file:///E:/jax%20video/Landing%20page/landing%201/landing-v3/html-V6/plain.html#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" class="d-block position-relative collapsed text-uppercase collapsible-link py-2 blueclr">Who can receive UBI?</a></h6>
            </div>
            <div id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionExample" class="collapse">
              <div class="card-body p-5 blueclr">
                <p class="font-weight-light m-0">Anyone is allowed to participate in the UBI program.</p>
              </div>
            </div>
          </div>
          
          <!-- Accordion item 3 -->
          <div class="card">
            <div id="headingThree" class="card-header border-0">
              <h6 class="mb-0 font-weight-bold"><a href="file:///E:/jax%20video/Landing%20page/landing%201/landing-v3/html-V6/plain.html#" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" class="d-block position-relative collapsed text-uppercase collapsible-link py-2 blueclr">How to get UBI?</a></h6>
            </div>
            <div id="collapseThree" aria-labelledby="headingThree" data-parent="#accordionExample" class="collapse">
              <div class="card-body p-5 blueclr">
                <p class="font-weight-light m-0">Anyone can register for UBI by following these three simple steps:
</p>
                <p>Connect your Metamask wallet to register</p>
                <p>Pass KYC verification</p>
                <p>Claim your UBI.</p>

              </div>
            </div>
          </div>
          <!-- Accordion item 4 -->
          <div class="card">
            <div id="headingFour" class="card-header border-0">
              <h6 class="mb-0 font-weight-bold"><a href="file:///E:/jax%20video/Landing%20page/landing%201/landing-v3/html-V6/plain.html#" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" class="d-block position-relative collapsed text-uppercase collapsible-link py-2 blueclr">How can we be sure that the funds are distributed fairly?</a></h6>
            </div>
            <div id="collapseFour" aria-labelledby="headingFour" data-parent="#accordionExample" class="collapse">
              <div class="card-body p-5">
                <p class="font-weight-light m-0 blueclr">The UBI program is a part of the Jax.Money platform, which is fully automated by a smart contract. While people may be seduced by corruption, smart contracts are not. These algorithms automatically distribute all the funds collected for the UBI program fairly between all the participants. </p>
              </div>
            </div>
          </div>
          <!-- Accordion item 4 --> 
          <!-- Accordion item 5 -->
          <div class="card">
            <div id="headingFive" class="card-header border-0">
              <h6 class="mb-0 font-weight-bold"><a href="file:///E:/jax%20video/Landing%20page/landing%201/landing-v3/html-V6/plain.html#" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" class="d-block position-relative collapsed text-uppercase collapsible-link py-2 blueclr">Can I donate funds to the UBI program?</a></h6>
            </div>
            <div id="collapseFive" aria-labelledby="headingFive" data-parent="#accordionExample" class="collapse">
              <div class="card-body p-5">
                <p class="font-weight-light m-0 blueclr">Yes. You can donate funds to the UBI pool by sending money to the UBI donation address: 0xxx. </p>
              </div>
            </div>
          </div>
          <!-- Accordion item 5 --> 
          
        </div>
      </div>
      <div class="col-lg-6"> 
        
        <!-- Accordion -->
        <div id="accordionExample1" class="accordion"> 
          
          <!-- Accordion item 8 -->
          <div class="card">
            <div id="headingEight" class="card-header border-0">
              <h6 class="mb-0 font-weight-bold"><a href="file:///E:/jax%20video/Landing%20page/landing%201/landing-v3/html-V6/plain.html#" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight" class="d-block position-relative text-uppercase collapsible-link py-2 blueclr">What is JAX?</a></h6>
            </div>
            <div id="collapseEight" aria-labelledby="headingEight" data-parent="#accordionExample1" class="collapse">
              <div class="card-body p-5">
                <p class="font-weight-light m-0 blueclr">In Hebrew, JAX means “God is merciful.” However, human beings are not so merciful. Therefore, there is a need for a system that will create equality.</p>
              </div>
            </div>
          </div>
          
          <!-- Accordion item 9 -->
          <div class="card">
            <div id="headingNine" class="card-header border-0">
              <h6 class="mb-0 font-weight-bold"><a href="file:///E:/jax%20video/Landing%20page/landing%201/landing-v3/html-V6/plain.html#" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine" class="d-block position-relative collapsed text-uppercase collapsible-link py-2 blueclr">What is the purpose of UBI?</a></h6>
            </div>
            <div id="collapseNine" aria-labelledby="headingNine" data-parent="#accordionExample1" class="collapse">
              <div class="card-body p-5">
                <p class="font-weight-light m-0 blueclr">We value people of merit and are determined to do everything possible to make sure they always have time and resources to make this world a slightly better place than it was yesterday. 
<br>
With the increased adoption of our energy-standard monetary system, every user should be able to get UBI high enough for letting him do what he truly loves, whether it’s rocket science or gardening.
</p>
              </div>
            </div>
          </div>
          
          <!-- Accordion item 10 -->
          <div class="card">
            <div id="headingTen" class="card-header border-0">
              <h6 class="mb-0 font-weight-bold"><a href="file:///E:/jax%20video/Landing%20page/landing%201/landing-v3/html-V6/plain.html#" data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen" class="d-block position-relative collapsed text-uppercase collapsible-link py-2 blueclr">Where does UBI come from?</a></h6>
            </div>
            <div id="collapseTen" aria-labelledby="headingTen" data-parent="#accordionExample1" class="collapse">
              <div class="card-body p-5">
                <p class="font-weight-light m-0 blueclr">A UBI tax is deducted from every transaction carried out on Jax.Money and every user of this system is welcome to register and get this UBI.</p>
              </div>
            </div>
          </div>
          <!-- Accordion item 11 -->
          <div class="card">
            <div id="headingEleven" class="card-header border-0">
              <h6 class="mb-0 font-weight-bold"><a href="file:///E:/jax%20video/Landing%20page/landing%201/landing-v3/html-V6/plain.html#" data-toggle="collapse" data-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven" class="d-block position-relative collapsed text-uppercase collapsible-link py-2 blueclr">What currency is UBI distributed in?</a></h6>
            </div>
            <div id="collapseEleven" aria-labelledby="headingEleven" data-parent="#accordionExample1" class="collapse">
              <div class="card-body p-5">
                <p class="font-weight-light m-0 blueclr">UBI is distributed in WJAX on a daily basis.</p>
              </div>
            </div>
          </div>
          <!-- Accordion item 12 -->
          <div class="card">
            <div id="headingTwelve" class="card-header border-0">
              <h6 class="mb-0 font-weight-bold"><a href="file:///E:/jax%20video/Landing%20page/landing%201/landing-v3/html-V6/plain.html#" data-toggle="collapse" data-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve" class="d-block position-relative collapsed text-uppercase collapsible-link py-2 blueclr">Can I participate without passing KYC?</a></h6>
            </div>
            <div id="collapseTwelve" aria-labelledby="headingTwelve" data-parent="#accordionExample1" class="collapse">
              <div class="card-body p-5">
                <p class="font-weight-light m-0 blueclr">No. KYC is mandatory to participate. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
	</section>
	<!--FAQ-->

  <!-- modal -->
  <!-- Modal -->


</main>

<?php

  include "includes/modal.php";

?>

<?php

  include "includes/footer.php";

?>

<?php

  include "includes/footerJs.php";

?>

<script>


async function get_statistics() {
  if(!contracts) return;
  let [
    ubiBenefeciariesCount,
    totalUbiPerPerson
  ] = await Promise.all(
      [
        callSmartContract(contracts.ubi, "userCount"),
        callSmartContract(contracts.ubi, "totalRewardPerPerson")
      ]
    );
  $(".ubiBenefeciariesCount").html(ubiBenefeciariesCount);
  $(".totalUbiPerPerson").html(formatUnit(totalUbiPerPerson, 4, 4).toLocaleString());

}
var once = true;
async function check_status() {
  get_statistics();
  if(contracts_provider && once) {
    once = false;
    totalUbiPaid = 0;
    contracts_provider.ubi.events.Deposit_Reward({
      fromBlock: 0
    }, function(error, event) {

    }).on('data', function(event) {
      console.log("event", event.returnValues.amount);
      totalUbiPaid += Number(formatUnit(event.returnValues.amount, 4, 4));
      $(".totalUbiPaid").html(totalUbiPaid.toLocaleString());
    })
  }
}

check_status();
setInterval(check_status, 60000);
</script>
</body>
</html>
