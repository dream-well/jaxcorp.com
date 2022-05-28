<!doctype html>
<html lang="en">
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/fontawesome.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
    rel="stylesheet">
<link rel="icon" href="img-donation/Group-752-150x150.png" sizes="32x32" />
<link rel="icon" href="img-donation/Group-752-150x150.png" sizes="192x192" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600&display=swap" rel="stylesheet">

<!-- Font Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<link href="css/custom.css" rel="stylesheet">
<link href="css/awn.min.css" rel="stylesheet">
<title>JAXUBI | You help the world by donating in JaxCorp DAO!</title>
</head>

<body>
<nav class="navbar navbar-expand-lg navbar-light fixed-top">
  <div class="container-fluid"><a class="navbar-brand" href="#"><img src="img-donation/logo.png" /></a>
    <div class="ml-md-auto">
      <form class="form-inline homeselect">
        <a href="#" class="btn btn-success border-radius mr-2 btn_connect" onclick="connect_wallet()">Connect a wallet</a>
        <label class="custom-select my-select chainSelector"> Polygon </label>
      </form>
    </div>
  </div>
</nav>
<div class="container"> 
  <!-- <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"></a>
        <div class="ml-md-auto">
          <form class="form-inline homeselect">
            <a href="#" class="btn btn-success border-radius mr-2">0x54sa..235 <i class="fa fa-arrow-right ml-2"></i></a>
            <select class="custom-select my-select chainSelector">
              <option value="bscmainnet" selected="">Binance Smart Chain</option>
              <option value="ethmainnet">Ethereum Chain</option>
            </select>
          </form>
        </div>
      </div>
    </nav> -->
  
  <div class="row ubiprog d-flex  pb-5">
    <div class="col-12 col-md-6 order-2 order-md-1 text-center text-md-left my-auto">
      <h1 class="text-white mb-3 mb-md-5"><span class="text-yellow">You help the world by</span> donating in <br />
        JaxCorp DAO!</h1>
      <!-- <a href="https://jaxcorp.com#imprint" class="btn btn-lg btn-light font-weight-bold text-blue">Donate <img
            src="img-donation/right.png" class="ml-2" /></a> --> 
      <a href="https://t.me/jax_chat"
            class="btn btn-lg btn-light font-weight-bold text-blue">Join Telegram Chat <img src="img-donation/tele.png" /></a> </div>
    <div class="col-12 col-md-6 order-1 order-md-2"> <img src="img-donation/banner.png" class="img-fluid" /> </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="p-4 border-radius  bg-blue mb-4">
        <div class="row justify-content-around">
			<div class="col-12 col-md-4 d-none d-sm-block text-center">
				<div><img src="img-donation/donate.png" class="img-fluid" /></div>
			</div>
          <div class="col-12 col-md-6 my-auto">
            <h2 class="text-yellow text-center" style="font-size:40px;">Donate</h2>
            <div class=" justify-content-center">
              <div class="input-group mb-3">
                <input type="number" id="amountIn" class="form-control money" placeholder="0.00" aria-label="0.00" aria-describedby="basic-addon2">
                <input type="hidden" id="admin_id" value="0" class="form-control" placeholder="0.00" aria-label="0.00" aria-describedby="basic-addon2">
                <div class="input-group-append donate-bg"> <span class="input-group-text" id="token1"> <img src="img-donation/jxnLogo.svg" style="width: 25px;" class="pr-1 token_image"> <strong style="font-size: 22px;" class="token_name">WJAX</strong> </span> </div>
              </div>
              <div class="text-yellow" id="balance_1">Balance: <span id="balance">-</span> <span class="balance_max" onclick="select_max_balance();">MAX</span> </div>
              <div class="text-center">
                <button style="display: none;" class="btn btn-lg pt-3 pb-3 btn-warning" id="btn_approve" onclick="approve()">Approve</button>
                <button style="display: none;" class="btn btn-lg pt-3 pb-3 btn-warning" id="btn_donate" onclick="donate()">Donate</button>
                <button class="btn btn-lg btn-warning font-weight-bold btn_connect" id="btn_connect" onclick="connect_wallet()">Connect a wallet</button>
                <!-- data-toggle="modal" data-target="#exampleModalCenter" --> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12"> 
      <!-- donate form --> 
      
      <!-- donate form -->
      <div class="p-4 border-radius border text-center">
        <h2 class="text-yellow" style="font-size:40px;">What is UBI?</h2>
        <h4 class="text-yellow pb-4">"The goals of a basic income system are to alleviate poverty and
          replace other need-based social programs that potentially require greater bureaucratic involvement."</h4>
        <img src="img-donation/devider.png" class="img-fluid" />
        <h5 class="text-white pt-4">"By donating to our UBI program you help people to live their better lives.
          Who knows how the world can be chaged in the better way when a lot of people will be able to leave their
          boring jobs and start doing what they really love: chemistry, rocket science, coding, for example. So they
          eventually can do impressive innovations, which may change the world!"</h5>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="text-center pt-5">
        <h4 class="py-3 text-white">Also Join our communities in social media to get more info:</h4>
      </div>
      <div class="text-center">
        <p><a href="https://jax.network"><img src="img-donation/web.png" /></a> <a href="https://twitter.com/CommunityJax"><img
                src="img-donation/twitter.png" /></a> <a href="https://facebook.com/JAX-Corp-DAO-107689545149249"><img
                src="img-donation/fb.png" /></a> <a href="https://www.instagram.com/jaxcorp.dao/"><img src="img-donation/insta.png" /></a> <a
              href="https://www.linkedin.com/company/jax-network/"><img src="img-donation/lin.png" /></a></p>
      </div>
    </div>
  </div>
</div>
<!-- Optional JavaScript --> 
<!-- jQuery first, then Popper.js, then Bootstrap JS --> 
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
    integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
    crossorigin="anonymous"></script> 
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
    crossorigin="anonymous"></script> 
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
    crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.2-rc.0/web3.min.js" integrity="sha512-REWiGZVmhU2S5eIov/DuNrsq4djWnPaAHSvXrbLLLaI0r/gW+wh1utIzxt0iB4IQLgXhNDj5mR0YMBjrkKhVMA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="text/javascript" src="https://unpkg.com/web3modal"></script>
<script type="text/javascript" src="https://unpkg.com/@walletconnect/web3-provider"></script>
<script src="js/awn.min.js"></script>
<script src="js-donation/contracts.js?v2"></script>
<script src="js-donation/util.js"></script>
<script src="js-donation/donation.js"></script>
<script src="js-donation/wallet.js?v3"></script>
</body>
</html>