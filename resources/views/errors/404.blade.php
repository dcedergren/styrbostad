@extends('layouts.app')

@section('content')
<div class="container error-site">
    <div class="row">
        <h1> 404 - Vi kunde inte hitta det du söker efter </h1>
        <h4>Här är några länkar istället:</h4>
        <p><a href="/"><i class="fa fa-home" aria-hidden="true"></i> Hem </a></p>
        <p><a href="/login"><i class="fa fa-sign-in"></i> Logga in </a></p>
        <p><a href="/register"><i class="fa fa-user"></i> Register </a></p>
        @if(Auth::user())
        	<p><a href="/profile/settings"><i class="fa fa-gear"></i> Inställningar </a></p>
        @endif
    </div>
</div>
@endsection
