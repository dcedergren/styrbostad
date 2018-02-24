<?php

namespace App\Http\Controllers;

use App\Notification;
use Illuminate\Http\Request;
use App\City;
use App\User;
use App\UserCity;
use Auth;
use Carbon\Carbon;
use Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\MessageBag;

class ProfileController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
    }
    
    public function unSubscribe()
    {
        return view('unsubscribe');
    }
    
    public function unsubscribeAuth(Request $request)
    {
        $credentials = [
            'email' => $request->username ?? "",
            'password' => $request->password ?? "",
        ];
        $valid = Auth::validate($credentials);

        if ( ! $valid)
        {
            return Redirect::back()->with('fail','Dina uppgifter var fel. Försök igen');
        }
        $user = User::where('email',$request->username)->firstOrFail();
        $user->receive_email = 0;
        $user->save();  

        return Redirect::to('/user/unsubscribed');
    }

    public function unSubscribed()
    {
        return view('unsubscribed');
    }

    public function showProfile()
    {
        return view('profile');
    }

    public function showProfileSettings()
    {
        $user = Auth::user();
        $userCities = $user->userCities->pluck('city_id');
        $allCities = City::whereNotIn('id', $userCities)->get();
        $userCities = $user->userCities;
        $notifications = Auth::user()->notifications()->orderBy('created_at', 'desc')->paginate(5);
        return view('profile-settings', array('userCities' => $userCities,'allCities'=> $allCities, 'notifications' => $notifications));
    }

    public function storeProfileSettings(Request $request)
    {
        $this->validate($request, [
            'cities' => 'required',
        ]);

        $user = Auth::user();
        $user->min_rent = str_replace('kr', '', $request->min_rent);
        $user->max_rent = str_replace('kr', '', $request->max_rent);
        $user->min_size = str_replace('kvm', '', $request->min_size);
        $user->max_size = str_replace('kvm', '', $request->max_size);
        $user->min_rooms =str_replace('rok', '', $request->min_rooms);
        $user->max_rooms =str_replace('rok', '', $request->max_rooms);
        $user->updated_search_profile = Carbon::now();
        $user->save();

        Usercity::whereNotIn('city_id', $request->cities)->where('user_id', Auth::user()->id)->delete();

        foreach($request->cities as $city)
        {
            $userCity = UserCity::firstOrNew(['city_id' => $city, 'user_id' => Auth::user()->id]);
            $userCity->user_id = Auth::user()->id;
            $userCity->city_id = $city;
            $userCity->save();
        }
        
        return Redirect::back()->with('message', 'Sparad!');
    }

    public function updateUser(Request $request)
    {
        $user = Auth::user();

        $this->validate($request, [
            'email' => 'required|email|unique:users,email,' . $user->id,
            'confirmEmail' => 'required|same:email',
            'oldPassword' => 'required',
            'newPassword' => 'required',
            'confirmPassword' => 'required|same:newPassword',
        ]);

        $data = $request->all();

        if(!Hash::check($data['oldPassword'], $user->password))
        {
            $errors = new MessageBag();
            $errors->add('error', 'De gamla lösenordet stämmer inte!');
            return Redirect::back()->withErrors($errors);
        }
        else
        {
            if($request->has('receiveEmail'))
            {
                $user->receive_email = 1;
            }
            else
            {
                $user->receive_email = 0;
            }

            $user->email = $request->email;
            $user->password = Hash::make($request->newPassword);
            $user->save();
        }

        return Redirect::back()->with('message', 'Sparad!');
    }
}
