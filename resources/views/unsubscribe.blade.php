@extends('layouts.app')

@section('content')

@if(session('fail'))
  <div class="alert alert-danger">
  <strong>Tyvärr!</strong> {{session('fail')}}
</div> 
@endif

<div class="container">
    <div class="row" style="margin-top:15px;">
    	<div class="header text-center">
    		<h1> Avanmälan epost </h1>
    	</div>
    		<form method="POST" action="/user/unsubscribe/auth">
				<div class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-xs-12">
					<label> Epost </label>
					<input name="username" class="form-control" type="text">
				</div>
				<div class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-xs-12">
					<label> Lösenord </label>
					<input name="password" class="form-control" type="password">
				</div>
				<div class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-xs-12 text-center" style="margin-top:15px; margin-bottom: 15px;">
					<input type="submit" class="btn btn-group btn-primary">
				</div>
				{{csrf_field()}}
			</form> <!-- form -->
    </div>	
</div>
@endsection
