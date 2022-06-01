<!-- Bootstrap core JavaScript
    ================================================== --> 
<!-- Placed at the end of the document so the pages load faster --> 
<!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> -->
<!-- <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"><\/script>')</script>  -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>-->

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.0/axios.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/holder/2.9.8/holder.min.js"></script>
<script src="js/popper.min.js"></script> 
<script src="js/bootstrap.min.js"></script> 
<!-- <script src="js/vendor/holder.min.js"></script>  -->
<script src="js/offcanvas.js"></script> 
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.0/axios.min.js"></script>
<script src="js/lodash.min.js"></script>
<script src="js/awn.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.2-rc.0/web3.min.js" integrity="sha512-REWiGZVmhU2S5eIov/DuNrsq4djWnPaAHSvXrbLLLaI0r/gW+wh1utIzxt0iB4IQLgXhNDj5mR0YMBjrkKhVMA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="text/javascript" src="https://unpkg.com/web3modal"></script>
<script type="text/javascript" src="https://unpkg.com/@walletconnect/web3-provider"></script>
<script src="js/contracts.js"></script>
<script src="js/wallet.js"></script>
<script src="js/util.js"></script>
<script>
	jQuery(document).ready(function($){
	
	$('.text_copy_link').click(function() {
			var $text_copy = $(this);
			var $temp = $("<input>");
			$("body").append($temp);
			$temp.val($text_copy.text()).select();
			document.execCommand("copy");
			$temp.remove();
			$('.copy_link_mess').fadeIn(400);
			setTimeout(function(){$('.copy_link_mess').fadeOut(400);},5000);
	
	});
	});
</script>

<!--- FOR VIDEO---> 
<script type="text/javascript">
  		$(document).ready(function () {
		    $(".arrow-right").bind("click", function (event) {
		        event.preventDefault();
		        $(".vid-list-container").stop().animate({
		            scrollLeft: "+=336"
		        }, 750);
		    });
		    $(".arrow-left").bind("click", function (event) {
		        event.preventDefault();
		        $(".vid-list-container").stop().animate({
		            scrollLeft: "-=336"
		        }, 750);
		    });
		});
  	</script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script> 
<script type="text/javascript">
        $(document).ready(function () {
            $("#sidebar").mCustomScrollbar({
                theme: "minimal"
            });

            $('#dismiss, .overlay').on('click', function () {
                $('#sidebar').removeClass('active');
                $('.overlay').removeClass('active');
            });

            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').addClass('active');
                $('.overlay').addClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
        });
    </script>
 
 <script>
	 if (window.location.hash == "#imprint") {
     $('#exampleModalCenter').modal('show');
}
 </script>