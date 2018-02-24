
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1 col-xs-12 header-wrapper">
            <div class="header">
                <h1> Hyra lägenhet i {{$city[0]}}? Vi hjälper dig!</h1>
                <p> Här listas lägenheter i {{$city[0]}} upp. Har du specifika krav på din blivande lägenhet? Använd filtren nedan eller registrera en  <a href="@if(Auth::check())/profile/settings @else /register  @endif"> <i><b> Sökprofil. </b></i></a> Om du har en <a href="@if(Auth::check())/profile/settings @else /register  @endif"> <i><b> Sökprofil </b></i></a> kommer vi skicka ett mail när en matchande lägenhet blir ledig. </a> </p>
            </div>
        </div>
        @if(!empty($noti))
            <posts v-bind:filter_cities='{!! $filterCities !!}' v-bind:city='{!! $city !!}' v-bind:noti='{!! $noti !!}'></posts>
        @else
            <posts v-bind:filter_cities='{!! $filterCities !!}' v-bind:city='{!! $city !!}'></posts>
        @endif
    </div>
</div>

<div id="pagination-container" class=" text-center">

</div> <!-- pagination-container -->


@endsection

