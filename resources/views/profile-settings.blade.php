@extends('layouts.app')

@section('content')

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" />

	<div id="wrapper">
		
		<div class="container">

			<h1>Inställningar</h1>
			<br>

			<div class="tabs">

				<button class="tabLinks active" id="searchProfileWrapper">Sökprofil</button>
				<button class="tabLinks" id="settings">E-mail och lösenord</button>

			</div>

			<div id="searchProfileWrapper" class="tabContent" style="display: block;">
				<div id="searchProfile">
					<h3>Anpassa din sökprofil</h3>
					<p>Få mejl när det dyker upp lägenheter som matchar dina inställningar</p>
					<br>

					@if(count($errors) > 0)

						<ul id="errors">

							@foreach($errors->all() as $error)

								<li style="color: red;">{{ $error }}</li>

							@endforeach

						</ul>

					@endif

					@if(session('message'))

						<p id="message" style="color: green;"><strong>{{ session('message') }}</strong></p>

					@endif

					<form method="post" action="/profile/settings">

						<div class="select-container">

							<label for="city-label">Välj städer:</label>
							<br>
							<select name="cities[]" class="city-select2" id="city-label" multiple="multiple" style="width: 100%;">

								@foreach($userCities as $userCity)
									<option selected value="{{$userCity->city_id}}">{{ $userCity->city->name }}</option>
								@endforeach

								@foreach($allCities as $city)
									<option value="{{$city->id}}">{{ $city->name }}</option>
								@endforeach


							</select>
							<br>
							<br>

						</div>

						<div class="sliders-container">

							<label>Ställ in hyra:</label>
							<br>
							<input type="hidden" id="rentMin" value="{{ Auth::user()->min_rent }}">
							<input type="hidden" id="rentMax" value="{{ Auth::user()->max_rent }}">
							<input class="handleValue" type="text" readonly="readonly" id="lower-value-rent" name="min_rent">
							<input class="handleValue" type="text" readonly="readonly" id="upper-value-rent" name="max_rent">
							<div id="slider-rent"></div>
							<br>

							<label>Ställ in storlek:</label>
							<br>
							<input type="hidden" id="sizeMin" value="{{ Auth::user()->min_size }}">
							<input type="hidden" id="sizeMax" value="{{ Auth::user()->max_size }}">
							<input class="handleValue" type="text" readonly="readonly" id="lower-value-size" name="min_size">
							<input class="handleValue" type="text" readonly="readonly" id="upper-value-size" name="max_size">
							<div id="slider-size"></div>
							<br>

							<label>Ställ in antal rum:</label>
							<br>
							<input type="hidden" id="roomsMin" value="{{ Auth::user()->min_rooms}}">
							<input type="hidden" id="roomsMax" value="{{ Auth::user()->max_rooms }}">
							<input class="handleValue" type="text" readonly="readonly" id="lower-value-rooms" name="min_rooms">
							<input class="handleValue" type="text" readonly="readonly" id="upper-value-rooms" name="max_rooms">
							<div id="slider-rooms"></div>
							<br>

						</div>
						<br>
						<br>

						<input type="submit" role="button" class="btn btn-info" value="Spara">

						<input name="_token" type="hidden" value="{{ csrf_token() }}"/>

					</form>
				</div>
				<div id="notification-wrapper">
					<div id="notification-container">
						<h3>Notifikationer</h3>
						<ul class="notiNav">
							@foreach($notifications as $notification)
								<li class="noti">
									<a href="/notification/{{$notification->id}}">
										<img src="/images/default.jpg"/>
										<p>{{$notification->content}}
											<br>
											{{$notification->created_at->diffForHumans()}}
										</p>
									</a>
								</li>
							@endforeach
							{{ $notifications->links() }}
						</ul>
					</div>
				</div>
			</div>

			<div id="settings" class="tabContent settings">

				<h3>Ändra din e-mail och lösenord</h3>

				@if(count($errors) > 0)

					<ul id="errors">

						@foreach($errors->all() as $error)

							<li style="color: red;">{{ $error }}</li>

						@endforeach

					</ul>

				@endif

				@if(session('message'))

					<p id="message" style="color: green;"><strong>{{ session('message') }}</strong></p>

				@endif

				<form method="post" action="/profile/user/update">

					<div class="inputs">

						<label>E-mail:</label>
						<input type="text" name="email" class="form-control" value="{{ Auth::user()->email }}">
						<br>

						<label>Bekräfta e-mail:</label>
						<input type="text" name="confirmEmail" class="form-control" value="">
						<br>

						<label>Gammalt lösenord:</label>
						<input type="password" name="oldPassword" class="form-control">
						<br>

						<label>Nytt lösenord:</label>
						<input type="password" name="newPassword" class="form-control">
						<br>

						<label>Bekräfta lösenord:</label>
						<input type="password" name="confirmPassword" class="form-control">
						<br>

						<div class="checkbox">

							@if(Auth::user()->receive_email == 1)

								<label><input type="checkbox" name="receiveEmail" checked>Jag vill få mejl från Styrbostad.se</label>

							@else

								<label><input type="checkbox" name="receiveEmail">Jag vill få mejl från Styrbostad.se</label>

							@endif

						</div>
						<br>
						<br>

						<input type="submit" role="button" class="btn btn-info" value="Spara">

						<input name="_token" type="hidden" value="{{ csrf_token() }}"/>

					</div>

				</form>

			</div>

		</div>

	</div>

@endsection