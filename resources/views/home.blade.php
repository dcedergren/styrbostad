@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row" id="landing">
        <div class="top-header">
        <h1> Hyra lägenhet? </h1>
        <p> {{$posts->count()}} lediga lägenheter att hyra </p>
            <div class="city-group col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-xs-12">
                <form method="POST" action="/hitta/stad" id="city_search_form" >
                    <div class="select-container">
                        <select class="select" name="city">
                            <option selected value="default"> Välj stad </option>
                            @foreach($filterCities as $city)
                                <option value="{{$city->slug}}"> {{$city->name}} </option>
                            @endforeach 
                        </select>
                    </div> <!-- select-container -->
                    {{csrf_field()}}
                 <button class="btn btn-group btn-primary disabled" id="city_search_button"> <i class="fa fa-search"> </i> Sök </button>
                </form> <!-- hitta-stad -->
            </div>
        </div>


        {{--<div class="large-slide">

            <div class="image">
                <img src="/puffs/large_slider.jpg"> 
            </div>
            <div class="text">
                <h2> Behöver du lägenhet? </h2>
                <p> Vi hjälper dig att hyra lägenhet. Med detta verktyg kan du enkelt hitta hyresvärdar och lediga lägenheter att hyra</p>
                <p> Registrera en <a href="@if(Auth::user()) /profile/settings @else /register @endif"> Sökprofil </a> och få notifikationer när vi hittar  objekt som är intressanta för dig. </p>
            </div>
        </div>  


        <div class="puffs">
            <h2> Populära städer att hyra lägenhet i </h2>
            <div class="puff-item col-lg-4 col-md-4 col-xs-12">
                <div class="inner-wrapper">
                    <h4> <a href="/hitta-lagenhet/karlstad"> Karlstad </a> </h4>
                    <a href="/hitta-lagenhet/karlstad"> <img src="/puffs/6.jpg"> </a>
                </div>
            </div>

            <div class="puff-item col-lg-4 col-md-4 col-xs-12">
                <div class="inner-wrapper">
                    <h4><a href="/hitta-lagenhet/sundsvall">  Sundsvall </a> </h4>
                    <a href="/hitta-lagenhet/sundsvall"> <img src="/puffs/5.jpeg"> </a>
                </div>
            </div>

            <div class="puff-item col-lg-4 col-md-4 col-xs-12">
                <div class="inner-wrapper">
                    <h4> <a href="/hitta-lagenhet/boraas">  Borås </a> </h4>
                    <a href="/hitta-lagenhet/boraas"> <img src="/puffs/4.jpg"> </a>
                </div>
            </div>

            <div class="puff-item col-lg-4 col-md-4 col-xs-12">
                <div class="inner-wrapper">
                    <h4> <a href="/hitta-lagenhet/helsingborg">  Helsingborg </a> </h4>
                    <a href="/hitta-lagenhet/helsingborg"> <img src="/puffs/3.jpeg"> </a>
                </div>
            </div>

            <div class="puff-item col-lg-4 col-md-4 col-xs-12">
                <div class="inner-wrapper">
                    <h4> <a href="/hitta-lagenhet/oerebro">  Örebro </a> </h4>
                    <a href="/hitta-lagenhet/oerebro"> <img src="/puffs/2.jpeg"> </a>
                </div>
            </div>

            <div class="puff-item col-lg-4 col-md-4 col-xs-12">
                <div class="inner-wrapper">
                    <h4> <a href="/hitta-lagenhet/eskilstuna"> Eskilstuna </a> </h4>
                    <a href="/hitta-lagenhet/eskilstuna"> <img src="/puffs/1.jpeg"> </a>
                </div>
            </div>
        </div>--}}



{{--         @if(isset($city))
            <posts v-bind:filter_cities='{!! $filterCities !!}' v-bind:city='{!! $city !!}'></posts>
        @else
            <div class="col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1 col-xs-12 header-wrapper">
                <div class="header">
                    <h1 class="full-width text-align-center">Vi hjälper dig att hyra lägenhet. </h1>
                    <p> Vi samlar annonser från olika hyresvärdar i områden! Vi hjälper dig att hyra lägenhet. Har du specifika krav ? Registrera då en <a href="@if(Auth::check())/profile/settings @else /register  @endif"> <i><b> Sökprofil. </b></i> </a> </p>
                </div>
            </div>
            <posts v-bind:filter_cities='{!! $filterCities !!}'></posts>
        @endif --}}
    </div>
</div>


{{-- 
<div id="pagination-container" class=" text-center">

</div> <!-- pagination-container --> --}}


@endsection
