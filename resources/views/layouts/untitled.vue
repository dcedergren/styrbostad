<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Styles -->
    <link href="/css/app.css" rel="stylesheet">

    <!-- Scripts -->
    <script src="https://use.fontawesome.com/b77e536316.js"></script>
    {{--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8q5vdMJm3VPTCk0k6oTYalRvtURgQPqQ&callback=initMap"
            async defer></script>--}}
    <title>Styrbostad - {{ $page->title ?? 'Sök enkelt din nya lägenhet hos oss' }}</title>
    <meta name="description" content="{{ $page->description ?? 'Hitta din nya lägenhet hos oss! Vi samlar alla lägenheter som finns i ditt område.'}}">


    <meta property="og:title" content="{{ $page->title ?? 'Sök enkelt lägenheter'}} "/>
    <meta property="og:description" content="{{$page->description ?? 'Hitta din nya lägenhet hos oss! Vi samlar alla lägenheter som finns i ditt område.'}}"/>

    @if(!empty($page) && count($page->getImages() ?? NULL > 0))
        @foreach($page->getImages() as $image)
            <meta property='og:image' content='{{$image}}' />
        @endforeach
    @else
        <meta property='og:image' content='{{asset('/main_logo.png')}}' />
  
    @endif

    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>
<meta name="google-site-verification" content="TVBy9BeRd5hX6_PB5R-qr5O1r9KccGP-BfKfurvQ8nc" />
</head>
<body class="{{$page->advanced_name ?? "404"}}">


    <!-- /header -->

    <div id="app">
        {{-- <nav class="navbar navbar-default navbar-static-top">
         {{--<nav class="navbar navbar-default navbar-static-top">
>>>>>>> 42832d4ae9a57fe569c5d75d4597ed8f0e643bc7
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        Styrbostad
                        --}}{{--{{ config('app.name', 'Laravel') }}--}}{{--
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        @if (Auth::guest())
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </nav>--}}
        @yield('content')
    </div>

<!-- footer -->
    <footer>
        <div class="container">
            <div class="widget row">
                <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                    <h4 class="title">Om Styrbostad</h4>
                    <p>Styrbostad är ett verktyg för dig som söker lägenhet. Vår ambition är att du så smidigt och enkelt som möjligt skall hitta en ny bostad. Detta igenom att samla annonser ifrån olika företag som hyr ut bostäder. <br /> <br /> Upptäck hela tjänsten genom att registrera ett konto och sökprofil. Detta kommer underlätta ditt lägenhetssökande ännu mer! Ställ in notifikationer och få email när en ny bostad som passar din sökprofil dyker upp. </p>
                </div>

                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <h4 class="title">Populära städer</h4>
                    <div class="row">
                        @foreach($cities as $chunckedCities)
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <ul class="nav">
                                    @foreach($chunckedCities as $city)
                                         <li><a href="/{{$city->slug}}">{{$city->name}}</a></li>
                                    @endforeach
                                </ul>
                            </div>
                        @endforeach
                    </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <h4 class="title">Nyhetsbrev</h4>
                    <p>Prenumerera på nyhetsbrevet för att upptäcka nya och häftiga funktioner som underlättar ditt mål, att söka lägenhet! </p>
                    {{-- <form method="get" target="_blank|_self|_parent|_top|framename" action="https://eepurl.com/cOdSNH" class="btn-inline form-inverse"> --}}
                        <input type="text" name="MERGE0" class="form-control" placeholder="epost..." />
                        <button type="submit" class="btn btn-link"><i class="fa fa-envelope"></i></button>
{{--                     </form>
 --}}                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="container">
                <ul class="list-inline">
                    <li><a href="#" class="btn btn-circle btn-social-icon" data-toggle="tooltip" title="Follow us on Twitter"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="#" class="btn btn-circle btn-social-icon" data-toggle="tooltip" title="Follow us on Facebook"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#" class="btn btn-circle btn-social-icon" data-toggle="tooltip" title="Follow us on Google"><i class="fa fa-google-plus"></i></a></li>
                    <li><a href="#" class="btn btn-circle btn-social-icon" data-toggle="tooltip" title="Follow us on Steam"><i class="fa fa-steam"></i></a></li>
                </ul>
                &copy; 2017 Styrbostad. All rights reserved.
            </div>
        </div>
    </footer>
    <!-- /.footer -->

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-58459850-5', 'auto');
      ga('send', 'pageview');

    </script>

    <!-- Scripts -->
    <script src="/js/app.js"></script>
</body>
</html>
