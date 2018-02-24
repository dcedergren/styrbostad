@component('mail::message')



<h1> Hej {{$user->first_name}} {{$user->last_name}} !</h1>
<h3> Och stort tack för din registrering! </h3>


@component('mail::button', ['url' => URL::to('/')."/user/verify/".$user->verify_code])
Verifiera mitt konto
@endcomponent

 Eller genom att kopiera in denna url i din webbläsare. <i>{{URL::to('/')}}/user/verify/{{$user->verify_code}}</i>
 
Tack,<br>
{{ config('app.name') }}
@endcomponent



    