@component('mail::message')



<h1> Hej ! {{$user->first_name}} {{$user->last_name}}</h1>
<h3> Det har skickats en förfrågan till denna epost att återställa ditt lösenord hos Styrbostad.</h3>
<p> Ifall du inte har skickat denna förfrågan så kan du ignorera detta epost. </p>

@component('mail::button', ['url' => URL::to('/')."/password/reset/".$token])
Återställ mitt lösenord
@endcomponent

 Eller genom att kopiera in denna url i din webbläsare. <i>{{URL::to('/')}}/password/reset/{{$token}}</i>
 
Tack,<br>
{{ config('app.name') }}
@endcomponent



    