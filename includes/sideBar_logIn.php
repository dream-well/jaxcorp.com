<nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
  <div class="container-fluid"> <a class="navbar-brand" href="<?=$home_link?>"><img src="img/jax_corp.svg" width="150"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>  
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
  <!-- <div class="mobhide ml-auto" id=""> -->
  <a href="https://stake.jaxcorp.com/" target="_blank" class="btn btn-warning my-2 my-sm-0 mr-3 pt-2 pb-2 text-blue" >BUSD/USDT Staking</a>
    <a href="#" class="btn btn-info my-2 my-sm-0 mr-3 border-radius pt-2 pb-2"  data-toggle="modal" data-target=".bd-example-modal-lg"  >Donate</a>
         <a href="<?=$ubi_status_link?>" class="btn my-2 my-sm-0 mr-3 border-radius pt-2 pb-2 btn-success" >Collect UBI</a>
      <form class="form-inline my-2 my-lg-0 homeselect mr-3">
        <div class="dropdown">
          <a id="btn_connect" href="#" class="btn_connect btn btn-info my-2 my-sm-0 mr-3 border-radius pt-2 pb-2"    onclick="connect_wallet()">Connect a wallet</a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#" onclick="disconnect_wallet();">Disconnect wallet</a></li>
          </ul>
        </div>
        <!-------------------------------------------------------------->
        <div class="select selectwal" tabindex="1">
          <input class="selectopt" name="test" type="radio" id="opt1" checked>
          <label for="opt1" class="option">Binance Smart Chain</label>
        </div>
        <!-------------------------------------------------------------->
      </form>
</div>
    </div>
  </div>
</nav>
