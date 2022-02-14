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
      <!-- <div class="text-center"><a href="#" class="btn btn-lg btn-info mt-3">Get WJAX UBI</a></div> -->

    </div>
  </header>
<main role="main" class="bg-lighterblue">
    <div class="container pt-5 pb-5">
        <div class="row justify-content-center ubi">
            <div class="col-12 col-md-12 ubi_all_div" style="display:none">
                <!-- no connected UBI STATUS -->
                <div class="">
                    <div class="bg-white box-shadow border-radius p-4 mb-4 ubi_not_connect">
                        <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                                <p class="pb-0 mb-0 alert-danger border-radius p-2" style="font-size: 12px;">Not
                                    Connected</p>
                            </span></h3>
                        <p class="text-blue">Connect with your Metamask wallet to apply for the UBI program from
                            Jax.Network.</p>
                        <a href="#" class="btn_connect btn btn-info btn-lg mb-4" onclick="connect_wallet()">Connect
                            a wallet</a>
                        <p><a href="#" class="text-blue" style="text-decoration: underline">Read more about Jax.Network
                                UBI.</a></p>
                    </div>
                    <!-- no connected UBI STATUS -->
                    <!-- not registered SIGUP -->
                    <div class="bg-white box-shadow border-radius p-4 mb-4 ubi_signup">
                        <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                                <p class="pb-0 mb-0 alert-dark border-radius p-2" style="font-size: 12px;">Not
                                    Registered</p>
                            </span></h3>
                        <p class="text-blue">By signing up, you agree with our <a href="#" class="text-blue"
                                style="text-decoration: underline">Terms and Conditions</a> and <a href="#"
                                class="text-blue" style="text-decoration: underline">Privacy Policy</a>.</p>
                        <a href="#" class="btn btn-info btn-lg mb-4" onclick="signup();">Sign Up</a>
                        <p><a href="https://medium.com/jax-network/why-ubi-is-important-for-a-meritocracy-47042e0c4718" class="text-blue" style="text-decoration: underline">Read more about JaxCorp DAO
                            UBI.</a></p>
                    </div>
                </div>
                <!-- not registered SIGUP -->
                <!-- not registered  KYC verify-->
                <div class="bg-white box-shadow border-radius p-4 mb-4 ubi_not_kyc">
                    <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                            <p class="pb-0 mb-0 alert-warning border-radius p-2" style="font-size: 12px;">Not Registered
                            </p>
                        </span></h3>
                    <p class="text-blue">KYC Verification is required to continue your registration.</p>
                    <a href="#" class="btn btn-info btn-lg mb-4" onclick="verify()">Verify</a>
                    <p><a href="#" class="text-blue" style="text-decoration: underline">Read more about Jax.Network UBI.</a>
                </p>
                </div>
                 <!-- not registered KYC verify -->
                <!-- ALL CONNECTED -->
                <div class="ubi_connected">
                  <div class="bg-white box-shadow border-radius p-4 mb-4">
                      <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                              <p class="pb-0 mb-0 alert-success border-radius p-2" style="font-size: 12px;">Approved</p>
                          </span></h3>
                      <p class="text-blue">You’re successfully approved for the JAX UBI program!</p>
                      <p>Check your UBI payments below.</p>
                  </div>
                  <!--  -->
                  <div class="bg-white box-shadow border-radius p-4 mb-4 voting">
                      <div class="flex-fill d-flex">
                          <div class="col-10 justify-content-start align-items-center row">
                            <div class="col-6 justify-content-start align-items-center">
                                <p class="text-info font80 mb-0 d-block">Pending UBI</p>
                                <h3 class="d-block mb-0 pb-0 text-blue"><span class="pending_ubi"></span> <small>WJAX</small></h3>
                            </div>
                            <div class="col-6 justify-content-start align-items-center">
                                <p class="text-info font80 mb-0 d-block">Total UBI Paid </p>
                                <h3 class="d-block mb-0 pb-0 text-blue"><span class="paid_ubi"></span> <small>WJAX</small></h3>
                            </div>
                        </div>
                        <div class="col-2 d-flex justify-content-end align-items-center">
                          <button onclick="collect_ubi();" class="btn btn-info btn-lg font80">Collect</button>
                        </div>
                      </div>
                  </div>
                </div>
                <!--  -->
                <!-- <div class="bg-white box-shadow border-radius p-4 mb-4 voting">
                    <div class="flex-fill d-flex">
                        <div class="col-6 justify-content-start align-items-center">
                            <p class="text-info font80 mb-0 d-block">Pending UBI</p>
                            <h3 class="d-block mb-0 pb-0 text-blue">502,236.25 <small>WJXN</small></h3>
                        </div>
                        <div class="col-6 d-flex justify-content-end align-items-center"><a href="#"
                                class="btn btn-info btn-lg font80">Collect</a></div>
                    </div>
                </div>

                <div class="bg-white box-shadow border-radius p-4 mb-4 voting">
                    <div class="flex-fill d-flex">
                        <div class="col-6 justify-content-start align-items-center">
                            <p class="text-info font80 mb-0 d-block">Total UBI Paid</p>
                            <h3 class="d-block mb-0 pb-0 text-blue">502,236.25 <small>WJXN</small></h3>
                        </div>
                        <div class="col-6 d-flex justify-content-end align-items-center"><a href="#"
                                class="btn btn-info btn-lg font80">Collect</a></div>
                    </div>
                </div> -->
               
                <!-- ALL CONNECTED -->

                <!-- Declined UBI STATUS -->
                <div class="bg-white box-shadow border-radius p-4 mb-4 ubi_declined">
                    <h3 class="text-blue pb-3">My UBI status <span class="float-right">
                            <p class="pb-0 mb-0 alert-danger border-radius p-2" style="font-size: 12px;">Declined</p>
                        </span></h3>
                    <p class="text-blue">Your request to join UBI program was declined. </p>
                    <a href="#" class="btn btn-info btn-lg mb-4">Try again</a>
                    <p><a href="https://medium.com/jax-network/why-ubi-is-important-for-a-meritocracy-47042e0c4718" class="text-blue" style="text-decoration: underline">Read more about JaxCorp DAO UBI.</a></p>
                  </div>
                    
                </div>
                <!-- Declined UBI STATUS -->

        </div>
        </div>
    </div>
    <?php

include "includes/modal.php";

?>

</main>
<?php

  include "includes/footer.php";

?>

<?php

  include "includes/footerJs.php";

?>

<script src="js/main.js"></script>
</body>

</html>