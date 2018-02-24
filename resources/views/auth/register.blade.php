@extends('layouts.app')

@section('content')
<!-- wrapper -->
    <div id="wrapper">  
        <section class="hero hero-panel" {{--style="background-image: url(/images/register.jpg);"--}}>
            <div class="hero-bg"></div>
            <div class="container relative">
                <div class="row">
                    <div class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-12 pull-none margin-auto">
                        <div class="panel panel-default panel-register">
                            <div class="panel-heading">
                                <h3 class="panel-title">Registrera dig hos Styrbostad.se</h3>
                            </div>
                            <div class="panel-body">
                                <form method="POST" action="/register">
        
                                    <div class="form-group input-icon-left {{ $errors->has('nickname') ? ' has-error' : '' }}">
                                        <i class="fa fa-user"></i>

                                            @if ($errors->has('first_name'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('first_name') }}</strong>
                                                </span>
                                            @endif

                                        <input type="text" class="form-control" value="{{ old('first_name') }}" name="first_name" placeholder="Förnamn">
                                    </div>

                                    <div class="form-group input-icon-left {{ $errors->has('last_name') ? ' has-error' : '' }}">
                                        <i class="fa fa-user"></i>

                                            @if ($errors->has('last_name'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('last_name') }}</strong>
                                                </span>
                                            @endif

                                        <input type="text" class="form-control" value="{{ old('last_name') }}" name="last_name" placeholder="Efternamn">
                                    </div>

                                    <div class="form-group input-icon-left {{ $errors->has('email') ? ' has-error' : '' }}">
                                        <i class="fa fa-envelope"></i>

                                            @if ($errors->has('email'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('email') }}</strong>
                                                </span>
                                            @endif

                                        <input type="email" class="form-control" value="{{ old('email') }}" name="email" placeholder="Epost">
                                    </div>
                                    <div class="form-group input-icon-left {{ $errors->has('password') ? ' has-error' : '' }}">
                                        <i class="fa fa-lock"></i>

                                            @if ($errors->has('password'))
                                                 <span class="help-block">
                                                    <strong>{{ $errors->first('password') }}</strong>
                                                </span>
                                            @endif

                                        <input type="password" class="form-control" name="password" placeholder="Lösenord">
                                    </div>
                                    <div class="form-group input-icon-left {{ $errors->has('password') ? ' has-error' : '' }}">
                                        <i class="fa fa-check"></i>
                                        <input type="password" class="form-control" name="password_confirmation" placeholder="Repetera lösenord">
                                    </div>
                                
                                    {{ csrf_field() }}

                                    <input type="submit" value="Registrera" class="btn btn-primary btn-block">
                                

                                </form>
                            </div>
                            <div class="panel-footer">
                                Har du redan ett konto? <a href="/login">Logga in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- /#wrapper -->
@endsection