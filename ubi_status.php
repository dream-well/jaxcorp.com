<?php

  include "includes/config.php";

?>

<?php

  include "includes/head.php";

?>

<?php

  include "includes/sideBar_logIn.php";

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
                <h2 class="text-blue">Vinod Manoharan<br><span>Founder, JaxCorp DAO</span></h2>
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
      <!-- <div class="text-center"><a href="#" class="btn btn-lg btn-info mt-3">Get WJAX UBI</a></div> -->

    </div>
  </header>
<main role="main" class="bg-lighterblue">
    <div class="container pt-5 pb-5">
        <div class="row justify-content-center ubi">
            <div class="col-12 col-md-12 ubi_all_div" style="display:none">
                <!-- no connected UBI STATUS -->
                <div class="">
                    <div class="bg-white box-shadow border-radius p-4 mb-4 ubi_not_connect" style="display:none">
                        <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                                <p class="pb-0 mb-0 alert-danger border-radius p-2" style="font-size: 12px;">Not
                                    Connected</p>
                            </span></h3>
                        <p class="text-blue">Connect with your Metamask wallet to apply for the UBI program from
                            JaxCorp DAO.</p>
                        <a href="#" class="btn btn-info btn-lg mb-4" onclick="connect_wallet()">CONNECT A WALLET</a>
                        <p><a target='_blank' href="https://medium.com/jax-network/why-ubi-is-important-for-a-meritocracy-47042e0c4718" class="text-blue" style="text-decoration: underline">Read more about JaxCorp DAO
                                UBI.</a></p>
                    </div>
                    <!-- no connected UBI STATUS -->
                    <!-- not registered SIGUP -->
                    <div class="bg-white box-shadow border-radius p-4 mb-4 ubi_signup" style="display:none">
                        <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                                <p class="pb-0 mb-0 alert-dark border-radius p-2" style="font-size: 12px;">Not
                                    Registered</p>
                            </span></h3>
                        <p class="text-blue">By signing up, you agree with our <a target="_blank" href="<?=$terms_link?>" class="text-blue"
                                style="text-decoration: underline">Terms and Conditions</a> and <a target="_blank" href="<?=$privacy_link?>"
                                class="text-blue" style="text-decoration: underline">Privacy Policy</a>.</p>
                        <a href="#" class="btn btn-info btn-lg mb-4" onclick="signup();">Sign Up</a>
                        <p><a target='_blank' href="https://medium.com/jax-network/why-ubi-is-important-for-a-meritocracy-47042e0c4718" class="text-blue" style="text-decoration: underline">Read more about JaxCorp DAO
                            UBI.</a></p>
                    </div>
                </div>
                <!-- not registered SIGUP -->
                <!-- not registered  KYC verify-->
                <div class="bg-white box-shadow border-radius p-4 mb-4 ubi_not_kyc" style="display:none">
                    <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                            <p class="pb-0 mb-0 alert-warning border-radius p-2" style="font-size: 12px;">Not Registered
                            </p>
                        </span></h3>
                    <p class="text-blue">Please verify your account by completing KYC.</p>
                    <button class="btn btn-info btn-lg mb-4 btn_verify" onclick="verify()">GET VERIFIED</button>
                    
                    <a href="https://t.me/jax_chat" class="btn btn-info btn-lg font80 mb-3 btn_telegram" style="display:none"><img src="img/telegram.svg" class="img_telegram" style="vertical-align: text-bottom"> Open Telegram Chat</a>
                    <!-- <a href="#" class="btn btn-info btn-lg mb-4 btn_verify" onclick="verify()">GET VERIFIED</a> -->
                    <p><a target='_blank' href="https://medium.com/jax-network/why-ubi-is-important-for-a-meritocracy-47042e0c4718" class="text-blue" style="text-decoration: underline">Read more about JaxCorp DAO UBI.</a>
                </p>
                <div id='veriff-root'></div>
                </div>
                <div class="bg-white box-shadow border-radius p-4 mb-4 ubi_id_submitted" style="display:none">
                    <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                            <p class="pb-0 mb-0 alert-warning border-radius p-2" style="font-size: 12px;">ID proof Submitted</p>
                        </span></h3>
                    <p class="text-blue">Please contact a UBI Governor (or) UBI Ambassador in order to complete your enrollment.</p>
                    
                    <a href="https://t.me/jax_chat" class="btn btn-info btn-lg font80 mb-3 btn_telegram"><img src="img/telegram.svg" class="img_telegram" style="vertical-align: text-bottom"> Open Telegram Chat</a>
                    <!-- <a href="#" class="btn btn-info btn-lg mb-4 btn_verify" onclick="verify()">GET VERIFIED</a> -->
                    <p><a target='_blank' href="https://medium.com/jax-network/why-ubi-is-important-for-a-meritocracy-47042e0c4718" class="text-blue" style="text-decoration: underline">Read more about JaxCorp DAO UBI.</a>
                </p>
                </div>
                 <!-- not registered KYC verify -->
                <!-- ALL CONNECTED -->
                <div class="ubi_connected" style="display:none">
                  <div class="bg-white box-shadow border-radius p-4 mb-4">
                      <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                              <p class="pb-0 mb-0 alert-success border-radius p-2" style="font-size: 12px;">Approved</p>
                          </span></h3>
                      <p class="text-blue">You’re successfully approved for the JAX UBI program.</p>
                  </div>
                  <!--  -->
                  <div class="bg-white box-shadow border-radius p-4 mb-4 voting">
          <div class="flex-fill d-flex">
            <div class="col-6 justify-content-start align-items-center">
              <p class="text-info font80 mb-0 d-block">Accumulated UBI</p>
              <h3 class="d-block mb-0 pb-0 text-blue"><span class="pending_ubi">&nbsp;</span> <small>WJAX</small></h3>
            </div>
            <div class="col-6 d-flex justify-content-end align-items-center"><a href="#" class="btn btn-info btn-lg font80" onclick="collect_ubi()">Process UBI</a></div>
          </div>
        </div>
	
	<div class="bg-white box-shadow border-radius p-4 mb-4 voting">
          <div class="flex-fill d-flex">
            <div class="col-4 justify-content-start align-items-center my-auto">
              <p class="text-info font80 mb-0 d-block">UBI under-process</p>
              <h3 class="d-block mb-0 pb-0 text-blue"><span class="under_process">&nbsp;</span> <small>WJAX</small></h3>
            </div>
            <div class="col-4 justify-content-start align-items-center">
            <h6 class="pb-0 mb-0 text-blue pb-2">Please contact your UBI governor</h6>
                <p class="text-yellow pb-0 mb-0" style="line-height: 15px"><small>to collect your UBI payment. You can reach out through our telegram chat</small></p>
  
              
            </div>
            <div class="col-4 d-flex justify-content-end align-items-center"><a href="https://t.me/jax_chat" class="btn btn-info btn-lg font80"><img src="img/telegram.svg" width="25px" style="vertical-align: text-bottom" /> Open Telegram</a></div>
          </div>
        </div>
                  <!-- <div class="bg-white box-shadow border-radius p-4 mb-4 voting">
                    <div class="row d-flex">
                      <div class="col-12 col-md-4 mb-3 mb-md-0 justify-content-start align-items-center">
                        <p class="text-info font80 mb-0 d-block">Total UBI Fund Amount</p>
                        <h4 class="d-block mb-0 pb-0 text-blue"><span id="total_fund">&nbsp;</span> <small>WJAX</small></h4>
                    </div>
                    <div class="col-12 col-md-4 mb-3 mb-md-0 justify-content-start align-items-center">
                        <p class="text-info font80 mb-0 d-block">Total UBI Collected</p>
                        <h4 class="d-block mb-0 pb-0 text-blue"><span id="total_collected">&nbsp;</span> <small>WJAX</small></h4>
                      </div>
                      <div class="col-12 col-md-4 mb-3 mb-md-0 justify-content-start align-items-center">
                        <p class="text-info font80 mb-0 d-block">Participants</p>
                        <h4 class="d-block mb-0 pb-0 text-blue"><span id="userCount">&nbsp;</span></h4>
                      </div>
                    </div>
                  </div> -->
                  <!-- <div class="bg-white box-shadow border-radius p-4 mb-4 voting">
                    <h3 class="text-blue">My UBI</h3>
                  
                    <!-- table start
                    <div class="restable myyield " id="results">
                      <div class="theader">
                        <div class="table_header pt-md-3 pb-md-3 pt-1 pb-1 pl-3">Date</div>           
                        <div class="table_header pt-md-3 pb-md-3 pt-1 pb-1 pl-2">UBI Payment</div>
                      </div>
                      <div class="table_row">
                        <div class="table_small">
                          <div class="table_cell">Date</div>
                          <div class="table_cell">19.08.2019 at 19:43</div>
                        </div>
                        
                        <div class="table_small">
                          <div class="table_cell">VRP Staking <span>Restake</span></div>
                          <div class="table_cell"><span class="text-success">+ 63</span> WJAX</div>
                        </div>
                      </div>
                      <div class="table_row">
                        <div class="table_small">
                          <div class="table_cell">Date</div>
                          <div class="table_cell">19.08.2019 at 19:43</div>
                        </div>
                      
                        <div class="table_small">
                          <div class="table_cell">VRP Staking <span>Restake</span></div>
                          <div class="table_cell"><span class="text-success">+ 63</span> WJAX</div>
                        </div>
                      </div>
                  
                    <!-- table end
                  </div> -->
                  </div>
                </div>
                <!--  -->
                <!-- <div class="bg-white box-shadow border-radius p-4 mb-4 voting">
                    <div class="flex-fill d-flex">
                        <div class="col-6 justify-content-start align-items-center">
                            <p class="text-info font80 mb-0 d-block">Pending UBI</p>
                            <h3 class="d-block mb-0 pb-0 text-blue">502,236.25 <small>WJAX</small></h3>
                        </div>
                        <div class="col-6 d-flex justify-content-end align-items-center"><a href="#"
                                class="btn btn-info btn-lg font80">Collect</a></div>
                    </div>
                </div>

                <div class="bg-white box-shadow border-radius p-4 mb-4 voting">
                    <div class="flex-fill d-flex">
                        <div class="col-6 justify-content-start align-items-center">
                            <p class="text-info font80 mb-0 d-block">Total UBI Paid</p>
                            <h3 class="d-block mb-0 pb-0 text-blue">502,236.25 <small>WJAX</small></h3>
                        </div>
                        <div class="col-6 d-flex justify-content-end align-items-center"><a href="#"
                                class="btn btn-info btn-lg font80">Collect</a></div>
                    </div>
                </div> -->
               
                <!-- ALL CONNECTED -->

                <!-- Declined UBI STATUS -->
                <div class="bg-white box-shadow border-radius p-4 mb-4 ubi_declined" style="display:none">
                    <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                            <p class="pb-0 mb-0 alert-danger border-radius p-2" style="font-size: 12px;">Declined</p>
                        </span></h3>
                    <p class="text-blue">Your request to join UBI program was declined. </p>
                    <!-- <a href="#" class="btn btn-info btn-lg mb-4">Try again</a> -->
                    <a href="https://t.me/jax_chat" class="btn btn-info btn-lg font80 mb-3 btn_telegram"><img src="img/telegram.svg" class="img_telegram" style="vertical-align: text-bottom"> Open Telegram Chat</a>
                    <p><a target='_blank' href="https://medium.com/jax-network/why-ubi-is-important-for-a-meritocracy-47042e0c4718" class="text-blue" style="text-decoration: underline">Read more about JaxCorp DAO UBI.</a></p>
                  </div>
                    
                </div>
                <!-- Declined UBI STATUS -->

        </div>
        </div>
    </div>
    <?php

include "includes/modal.php";

?>

<script src='https://cdn.veriff.me/sdk/js/1.1/veriff.min.js'></script>
<script src='https://cdn.veriff.me/incontext/js/v1/veriff.js'></script>

 

</main>
<?php

  include "includes/footer.php";

?>

<?php

  include "includes/footerJs.php";

?>

<script src="js/main.js?v3"></script>
</body>

</html>