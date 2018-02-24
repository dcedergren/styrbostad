@extends('layouts.app')

@section('content')

<div id="wrapper">  
    <section class="hero hero-panel" {{--style="background-image: url(/images/register.jpg);"--}}>
        <div class="hero-bg"></div>
        <div class="container relative">
            <div class="row">
                <div class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-12 pull-none margin-auto">
                    <div class="panel panel-default panel-login">
                        <div class="panel-heading">
                            <h3 class="panel-title"><i class="fa fa-user"></i> Logga in på Styrbostad</h3>
                        </div>
                        <div class="panel-body">
                            <form role="form" id="javascriptLogin" method="POST" action="/login">
                                <div class="form-group input-icon-left {{ $errors->has('email') ? ' has-error' : '' }}">

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif

                                    <i class="fa fa-user"></i>
                                    <input type="text" class="form-control" name="email" placeholder="Username">
                                </div>
                                <div class="form-group input-icon-left {{ $errors->has('password') ? ' has-error' : '' }}">
                                    <i class="fa fa-lock"></i>
                                    <input type="password" class="form-control" name="password" placeholder="Password">
                                </div>
                                <input type="submit" class="btn btn-primary btn-block">
                                {{ csrf_field() }}
                                <div class="form-actions">
                                    <div class="checkbox checkbox-primary">
                                        <input name="remember" type="checkbox" id="checkbox"> 
                                        <label for="checkbox">Kom ihåg mig</label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="panel-footer">

                            <a class="btn btn-link" href="{{ route('password.request') }}">
                                Glömt ditt lösenord?
                            </a>
                        </div>
                        <div class="panel-footer">
                            Har du inget konto än? <a href="/register">Registrera dig nu!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
    <!-- /#wrapper -->

{{-- <div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Adress</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">Lösenord</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Kom ihåg mig
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Logga in
                                </button>

                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    Glömt ditt lösenord?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div> --}}
@endsection
