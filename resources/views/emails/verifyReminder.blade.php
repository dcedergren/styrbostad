@component('mail::message')



<h1> Hej {{$user->first_name}} {{$user->last_name}} !</h1>
<h3> Vi märker att du inte verifierat ditt konto än.</h3>
<p> Verifiera ditt konto igenom att klicka på knappen nedan. Därefter får du full tillgänglighet för Styrbostads funktioner vad gäller letandet av bostäder. </p>
<p> Hoppas vi ses! </p>

@component('mail::button', ['url' => URL::to('/')."/user/verify/".$user->verify_code])
Verifiera mitt konto
@endcomponent

 Eller genom att kopiera in denna url i din webbläsare. <i>{{URL::to('/')}}/user/verify/{{$user->verify_code}}</i>
 
Tack,<br>
{{ config('app.name') }}
@endcomponent



    