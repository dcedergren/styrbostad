@extends('layouts.app')

@section('content')


<!-- wrapper -->
	<div id="wrapper">	
		<section class="bg-grey-50 border-bottom-1 border-grey-300 padding-top-10 padding-bottom-10">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<div class="post post-fl">
							<div class="post-header">

								<div class="post-title">
									<h1 style="width:100%; margin-top:100px; text-align:center;"> Tack för din registrering! </h1>
								</div> <!-- post-title -->

								<p style="width:100%; margin-top:20px; text-align:center;"> Tack för din registrering hos Styrbostad.se. Det glädjer oss att du vill bli medlem hos oss. Kolla nedan för att slutföra din registrering </p>

							</div> <!-- post-header -->

									<blockquote style="text-align:center;">
										<h4> Ett mail har skickats till dig.</h4>
										<p><em> Så snart du har verifierat din epost-adress så har du full tillgång till Styrbostad. Grattis och lycka till i ditt lägenhetssökande!</em></p>
									</blockquote>

						</div> <!-- post post-fl -->
					</div> <!-- col-->
				</div> <!-- row -->
			</div><!-- container -->
		</section> <!-- section -->
	</div>
	<!-- /#wrapper -->


<script>
fbq('track', 'CompleteRegistration', {
value: 0,
currency: 'USD'
});
</script>


@endsection