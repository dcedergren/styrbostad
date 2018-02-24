<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Lang;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();
        $this->clearLoginAttempts($request);
        
        if ($request->ajax())
        {
            return response()->json($this->guard()->user(), 200);
        }
        
        return $this->authenticated($request, $this->guard()->user())
                ?: redirect('/');
    }

    public function authenticated(Request $request, $user)
    {
        if(!$user->verified) 
        {
            auth()->logout();
            return back()->with('fail', 'Du behöver verifiera ditt konto. Vi har skickat en aktiveringskod, kolla din mail.');
        }
        
        if(!Auth::user()->updated_search_profile)
        {
            return redirect('/profile/settings');
        }
        return redirect('/');
    }

    protected function sendFailedLoginResponse(Request $request)
    {
        if ($request->ajax()) 
        {
            return response()->json([
                'error' => Lang::get('auth.failed')
            ], 401);
        }
        
        return redirect('/login')
            ->withInput($request->only($this->username(), 'remember'))
            ->withErrors([
                $this->username() => Lang::get('auth.failed'),
            ]);
    }
}
