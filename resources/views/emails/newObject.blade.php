@component('mail::message')



<h1> Hej {{$user->first_name}} {{$user->last_name}} !</h1>
<h3> Vi har hittat en lägenhet som matchar din sökprofil! </h3>


<h2> {{$post->adress}} </h2>

<p> {{strip_tags($post->rooms)}} rum, {{strip_tags($post->square_feet)}} m², {{strip_tags($post->price)}} kr/mån </p>

<h4> Logga in <i> <a href="https://styrbostad.se/login"> här </a> </i> för att se ifall du har fler objekt som passar dig! </h4>
<p> Ifall det finns fler än ett objekt som passar dig så skickas enbart ett mejl. För att se alla objekt, <a href="https://styrbostad.se/login"> logga in! </a> </p>
@component('mail::button', ['url' => "https://styrbostad.se/hyra-lagenhet/".$post->slug])
    Ta mig till lägenheten
@endcomponent


 
Tack,<br>
{{ config('app.name') }}
@endcomponent
