<?php

namespace App\Http\Controllers;

use App\Lan;
use App\Post;
use Illuminate\Http\Request;
use App\User;
use Cache;
use Cornford\Googlmapper\Facades\MapperFacade as Mapper;
use App\City;
use Redirect;
use App\Notification;
use Illuminate\Support\Facades\App;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function sitemap()
    {   
        $sitemapCities = City::get();
        $posts = Post::get();
        return response()->view('sitemap.index', [
            'sitemapCities' => $sitemapCities,
            'posts' => $posts,
        ])->header('Content-Type', 'text/xml');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */  

    public function index()
    {

        $returnArray = Cache::remember('HomeController:index', 5, function () {
            $returnArray['filterCities'] = City::orderBy('name', 'asc')->get();//->orderByRaw("name COLLATE utf8_swedish_ci ASC")->get();
            $returnArray["posts"] = Post::get();
            return $returnArray;
        });


        return view('home', $returnArray);
    }
    public function redirectCity($slug)
    {
        return Redirect::to('/hitta-lagenhet/'.$slug);
    }
    public function showDefault()
    {
        $returnArray = Cache::remember('HomeController:showDefault', 5, function () {

            $returnArray['posts'] = Post::with('images','city.lan')
            ->latest()->orderBy('created_at', 'asc')->limit(10)->get();
            $returnArray['filterCities'] = City::orderBy('name', 'asc')->get();
            return $returnArray;
        });

        return view('browse',$returnArray);
    }

    public function showCity($slug)
    {
        $returnArray = Cache::remember('HomeController:showCity'.$slug, 5, function () use($slug) {

            $returnArray['posts'] = Post::with('images','city.lan')
            ->whereHas('city',function($query) use($slug)
            {
                $query->where('slug', '=', $slug);
            })
            ->latest()->orderBy('created_at', 'asc')->limit(10)->get();
            $returnArray['city'] = City::where('slug', '=', $slug)->pluck('name');
            if($returnArray['city']->count() <=0)
            {
                abort(404);
            }
            $returnArray['filterCities'] = City::orderBy('name', 'asc')->get();
            return $returnArray;
        });

        return view('city', $returnArray);
    }

    public function showThanks()
    {
        return view('displayThanks');
    }
    
    public function verifyUser($verifyCode)
    {
        $user = User::where('verify_code','=',$verifyCode)->firstOrFail();

        $user->verified = 1;
        $user->save();
        return redirect('/login');
    }

    public function contactUs()
    {
        return view('contact');
    }
    public function HomeController($city)
    {   
        Post::whereHas('city',function($query) use($city)
        {
            $query->where('city',$city);
        });
    }
    public function notificationRedirect($id)
    {
        try
        {
            $notification = Notification::findOrFail($id);
            $notification->read = 1;
            $notification->save();

            $noti= Post::where('id', '=',$notification->url)->first();
            $returnArray['noti'] = Post::with('city.lan')->where('id', '=',$notification->url)->get();


            $returnArray['city'] = City::where('id', '=', $noti->city_id)->pluck('name');
            if($returnArray['city']->count() <=0)
            {
                abort(404);
            }
            $returnArray['filterCities'] = City::orderBy('name', 'asc')->get();
            return view('city', $returnArray);
        }
        catch(\Exception $e)
        {
            abort(404);
        }
    }
    public function redirectToPost($slug)
    {
        return Redirect::to('/hyra-lagenhet/'.$slug);
    }
    public function postClicked($slug)
    {
        try
        {
            $noti= Post::where('slug', $slug)->first();
            $returnArray['noti'] = Post::with('city.lan')->where('slug', '=',$slug)->get();
            $returnArray['city'] = City::where('id', '=', $noti->city_id)->pluck('name');
            if($returnArray['city']->count() <=0)
            {
                abort(404);
            }
            $returnArray['filterCities'] = City::orderBy('name', 'asc')->get();
            return view('city', $returnArray);
        }
        catch(\Exception $e)
        {
            abort(404);
        }
    }

    public function redirectToCity(Request $request)
    {
        $city = City::where('slug',$request->city)->first();

        if(!empty($city))
        {
            return Redirect::to('/hitta-lagenhet/'.$city->slug);
        }
        else
        {
            abort(404);

        }
    }
}
