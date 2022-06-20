<nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
  <div class="container-fluid"> <a class="navbar-brand" href="<?=$home_link?>"><img src="img/jax_corp.svg" width="150"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>  
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
  <!-- <div class="mobhide ml-auto" id=""> -->
  <a href="<?=$get_wjxn_p?>" target="_blank" class="btn btn-warning my-2 my-sm-0 mr-3 pt-2 pb-2 g_wjxn_h_btn mix_1" >Get WJXN
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 22 22" fill="none"> <path d="M12.0313 5.67188H10.1406V7.5625H12.0313V5.67188Z" fill="#fff"></path> <path d="M13.7472 7.5625C11.4619 7.5625 10.1497 8.73026 10.1497 10.9032V12.4553V13.697C10.1497 14.1552 9.78112 14.5395 9.30932 14.5395H8.49842C8.46893 14.5395 8.43945 14.5395 8.40996 14.5395C8.38047 14.5395 8.35098 14.5395 8.3215 14.5395H7.51059C7.05354 14.5395 6.6702 14.17 6.6702 13.697V12.7805H4.8125C4.90096 14.9534 6.08046 16.3281 8.40996 16.3281C10.6952 16.3281 12.0074 15.1604 12.0074 12.9874V11.9527V10.1937C12.0074 9.73543 12.376 9.3511 12.8478 9.3511H13.6587C13.6882 9.3511 13.7177 9.3511 13.7472 9.3511C13.7767 9.3511 13.8061 9.3511 13.8356 9.3511H14.6465C15.1036 9.3511 15.4869 9.72065 15.4869 10.1937V16.3281H17.3594V11.1101C17.2709 8.93721 16.0767 7.5625 13.7472 7.5625Z" fill="#fff"></path> <path d="M10.1406 7.5625H6.70312V9.45312H10.1406V7.5625Z" fill="#fff"></path> <circle cx="11" cy="11" r="10.25" stroke="#fff" stroke-width="1.5"></circle> </svg>
</a>
  <a href="https://stake.jaxcorp.com/" target="_blank" class="btn btn-warning my-2 my-sm-0 mr-3 pt-2 pb-2 text-white mix_2" >BUSD/USDT Staking</a>
    <a href="#" class="btn btn-info my-2 my-sm-0 mr-3 border-radius pt-2 pb-2 mix_3"  data-toggle="modal" data-target=".bd-example-modal-lg"  >Donate</a>
         <a href="<?=$ubi_status_link?>" class="btn my-2 my-sm-0 mr-3 border-radius pt-2 pb-2 btn-success mix_4" >Collect UBI</a>
      <form class="form-inline my-2 my-lg-0 homeselect mr-3">
          <div class="dropdown">
            <a id="btn_connect" href="#" class="btn_connect btn my-2 my-sm-0 mr-3 border-radius pt-2 pb-2 btn_connect btn-info" onclick="connect_wallet()">Connect a Wallet</a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="display: none;">
              <li><a class="dropdown-item" href="#" onclick="disconnect_wallet();">Disconnect wallet</a></li>
            </ul>
          </div>
        <!-------------------------------------------------------------->
        <div class="select selectwal" tabindex="1">
          <input class="selectopt" name="test" type="radio" id="opt1" checked>
          <label for="opt1" class="option">Polygon</label>
        </div>
        <!-------------------------------------------------------------->
      </form>
</div>
    </div>
  </div>
</nav>
