@component('mail::message')



<h1> Hej {{$user->first_name}} {{$user->last_name}} !</h1>
<h3> Vi ser att du inte har ställt in någon sökprofil än.</h3>
<p> Vi kan ju inte meddela dig angående lägenheter om vi inte vet vad du söker efter! </p>
<p> Ställ in din sökprofil via länken eller knappen nedan. Vi kommer då skicka epost till dig när vi hittar ett nytt objekt som matchar din sökprofil. </p>

@component('mail::button', ['url' => URL::to('/')."/profile/settings"])
Ta mig till sökprofilen!
@endcomponent

 Eller genom att kopiera in denna url i din webbläsare. <i>{{URL::to('/')}}/profile/settings</i>
 
Tack,<br>
{{ config('app.name') }}
@endcomponent



    