
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
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
    <link rel="icon" type="image/png" href="/favicon-16x16.png">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
    <!-- Scripts -->
    <script src="https://use.fontawesome.com/b77e536316.js"></script>

    <title>Styrbostad - {{ $page->title ?? 'Sök enkelt din nya lägenhet hos oss' }}</title>
    <meta name="description" content="{{ $page->description ?? 'Hitta din nya lägenhet hos oss! Vi samlar alla lägenheter som finns i ditt område.'}}">


    <meta property="og:title" content="{{ $page->title ?? 'Sök enkelt lägenheter'}} "/>
    <meta property="og:description" content="{{$page->description ?? 'Hitta din nya lägenhet hos oss! Vi samlar alla lägenheter som finns i ditt område.'}}"/>

    @if(!empty($page) && count($page->getImages() ?? NULL > 0))
        @foreach($page->getImages() as $image)
            <meta property='og:image' content='{{$image}}' />
        @endforeach
    @else
        <meta property='og:image' content='{{asset('/default.jpg')}}' />
  
    @endif

    <!-- Hotjar Tracking Code for https://styrbostad.se/ -->
    <script>
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:523160,hjsv:5};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
    </script>

    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>
<meta name="google-site-verification" content="TVBy9BeRd5hX6_PB5R-qr5O1r9KccGP-BfKfurvQ8nc" />
</head>
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '123438738024352'); // Insert your pixel ID here.
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=123438738024352&ev=PageView&noscript=1"
/></noscript>
<!-- DO NOT MODIFY -->
<!-- End Facebook Pixel Code -->
<body class="{{$page->advanced_name ?? "404"}}">


       <div id="wrapper">
        <div class="overlay"></div>
    
        <!-- Sidebar -->
        <nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
            <ul class="nav sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">
                       Styrbostad
                    </a>
                </li>
                <li>
                    <a href="/"><i class="fa fa-fw fa-home"></i> Hem</a>
                </li>
                <li id="accordion">
                    <a href="#collapseOne" data-toggle="collapse" data-parent="#accordion"><i class="fa fa-map-marker" aria-hidden="true"></i>
                        Välj stad
                    </a>
                    <div id="collapseOne" class="panel-collapse collapse">
                        @foreach($lans as $chunckedLan)
                            @foreach($chunckedLan as $index=>$lan)
                                <a href="#collapse{{$index}}" data-toggle="collapse" data-parent="#accordion">
                                    {{$lan->name}}
                                </a>
                                <div id="collapse{{$index}}" class="panel-collapse collapse">
                                @foreach($lan->cities as $city)
                                        <a href="/hitta-lagenhet/{{$city->slug}}" class="cityCollapse"><i class="fa fa-bullseye" aria-hidden="true"></i> {{$city->name}}</a>
                                @endforeach
                                </div>
                            @endforeach
                        @endforeach
                    </div>
                </li>

                @if(!Auth::check())
                    <li>
                        <a href="/login"><i class="fa fa-sign-in"></i></i> Logga in</a>
                    </li>
                    <li>
                        <a href="/register"><i class="fa fa-user"></i></i> Registrera</a>
                    </li>
                @endif
            
           
                @if(Auth::check()) 

                 <li>
                    <a href="/logout" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <i class="fa fa-power-off"></i> Logga ut
                    </a>

                    <form id="logout-form" action="/logout" method="POST" style="display: none;">
                        {{ csrf_field() }}
                    </form>
                </li>

                <li>
                    <a href="/profile/settings"> <i class="fa fa-gear"></i> Inställningar</a>
                </li>
                @endif
            </ul>
        </nav>
        <!-- /#sidebar-wrapper -->

        <div id="wide-nav">
            <div class="col-lg-10 col-lg-offset-1">
                <ul class="col-lg-4 col-md-4 col-xs-4 hidden-xs left-nav nav-sections">
                    <li class="wide-home">
                        <a href="/hitta-lagenhet">Hitta lägenhet</a>
                    </li>
                </ul>   

                <ul class="col-lg-4 col-md-4 col-sm-4 col-xs-12 mid-nav nav-sections">
                    <a href="/"> <img src="/logo_small.png"> </a>
                </ul>

                <ul class="col-lg-4 col-md-4 col-xs-4 hidden-xs right-nav nav-sections">
                    @if(!Auth::check())
                         <a href="/login"> <li class="btn btn-primary btn-group"> Logga in </li> </a>
                         <a href="/register"> <li class="btn btn-primary btn-group"> Registrera </li> </a>
                    @else
                    <div class="nav-dropdown dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bell"></i>
                             @if(Auth::user()->unreadNotifications->count() > 0) <span class="label label-danger">{{Auth::user()->unreadNotifications->count()}} @endif</span></a>
                            <ul class="dropdown-menu notiNav">
                                <li class="dropdown-header total-noti"><i class="fa fa-bell"></i> Du har {{Auth::user()->unreadNotifications->count()}} notifikationer</li>
                                @foreach(Auth::user()->unreadNotifications as $index=>$notification)
                                    @if($index < 5)
                                        <li class="noti">
                                            <a href="/notification/{{$notification->id}}">
                                                <img src="/images/default.jpg"/>
                                                <p>{{$notification->content}}
                                                    <br>
                                                    {{$notification->created_at->diffForHumans()}}
                                                </p>
                                            </a>
                                        </li>
                                    @endif
                                @endforeach
                                <li class="dropdown-header see-all-noti"><a href="/profile/settings">Se alla <i class="fa fa-mail-forward"></i></a></li>
                            </ul>
                        </div>
                    @endif
                </ul>
            </div> <!-- nav-container -->
        </div> <!-- timsnav -->
        <!-- Page Content -->
        <div id="page-content-wrapper">
          <button type="button" class="hamburger is-closed animated fadeInLeft" data-toggle="offcanvas">
            <span class="hamb-top"></span>
            <span class="hamb-middle"></span>
            <span class="hamb-bottom"></span>
          </button>
            <div class="container">
                <div class="row">
                   <div id="app">

    @if(!empty(Session::get('fail')))
    <div class="alert alert-danger">
        <strong>Tyvärr!</strong>  {{ Session::get('fail') }}
    </div>
    @endif
        @yield('content')
    </div>

        <!-- footer -->
            <footer>
                <div class="container">
                    <div class="widget row">
                        <div class="col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-6 col-xs-12 padding">
                            <h4 class="title">Om Styrbostad</h4>
                            <p>Styrbostad är ett verktyg för dig som söker lägenhet. Vår ambition är att du så smidigt och enkelt som möjligt skall hitta en ny bostad. Detta genom att samla annonser ifrån olika företag som hyr ut bostäder. <br /> <br /> Upptäck hela tjänsten genom att registrera ett konto och skapa en sökprofil. Detta kommer underlätta ditt lägenhetssökande ännu mer! Ställ in notifikationer och få email när en ny bostad som passar din sökprofil dyker upp. </p>
                        </div>

                        {{--<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 padding">
                            <h4 class="title">Populära städer</h4>
                            <div class="row">
                                @foreach($cities as $chunckedCities)
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <ul class="nav">
                                            @foreach($chunckedCities as $city)
                                                 <li><a href="/city/{{$city->slug}}">{{$city->name}}</a></li>
                                            @endforeach
                                        </ul>
                                    </div>
                                @endforeach
                            </div>
                        </div>--}}

                        <div class="col-lg-4 col-lg-offset-2  col-md-4 col-md-offset-2 col-sm-6 col-xs-12 padding contactFooter">
                            <h4 class="title">Kontakta oss</h4>
                            <p>Behöver du kontakta Styrbostad.se gör du det på hello@styrbostad.se, observera att Styrbostad endast länka till lägenheterna och har inget med uthyrningen att göra.  </p>
                            <a href="mailto:hello@styrbostad.se?Subject=Hej styrbostad" target="_top"><i class="fa fa-envelope"></i></a>
                            {{--<p>Prenumerera på nyhetsbrevet för att upptäcka nya och häftiga funktioner som underlättar ditt mål, att söka lägenhet! </p>--}}
                            {{-- <form method="get" target="_blank|_self|_parent|_top|framename" action="https://eepurl.com/cOdSNH" class="btn-inline form-inverse"> --}}
                                {{--<input type="text" name="MERGE0" class="form-control" placeholder="epost..." />
                                <button type="submit" class="btn btn-link"><i class="fa fa-envelope"></i></button>--}}
        {{--                     </form>
     --}}                </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="container">
                        <ul class="list-inline">
                            <li><a target="_blank" href="https://www.facebook.com/Styrbostadse-1838296023157904/?fref=ts" class="btn btn-circle btn-social-icon" data-toggle="tooltip" title="Follow us on Facebook"><i class="fa fa-facebook"></i></a></li>
                        </ul>
                        &copy; 2017 Styrbostad. All rights reserved.
                    </div>
                </div>
            </footer>
            <!-- /.footer -->
        </div>
    </div>
</div>
<!-- /#page-content-wrapper -->

    </div>
    <!-- /#wrapper -->

   

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
