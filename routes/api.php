<?php

use Illuminate\Http\Request;
use App\Post;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function() {
    Route::get('/posts', function() {
        
        return Cache::remember('posts1', 5, function (){
            $returnArray = array();
            $returnArray['lan'] = $lan = App\Lan::has('cities')->get();

            $returnArray['posts'] = Post::with('images','city')->latest()->orderBy('created_at', 'asc')->limit(10)->get();
            return $returnArray;

        });
         
    });

    Route::post('/getPosts/', 'PostController@ajaxLoad');

    Route::get('/get/post/{slug}', function($slug) {
        return Cache::remember('/get/post/{slug}'.$slug, 5, function () use($slug) {

         return Post::with('images','city')->where('slug', '=', $slug)->first();
        });

    });

    Route::post('/get/lan/{lan}', function($lan) {
            $posts = App\Post::with('images', 'city', 'city.lan')
                ->whereHas('city.lan',function($query) use($lan)
                {
                    $query->where('name',$lan);
                })->get();
        return $posts;
    });

    Route::post('/posts/filter/', 'HomeController@filterPosts');

    Route::post('task/store', function(Request $request) {
        return App\Task::create(['body' => $request->input(['body'])]);
    });

    Route::patch('task/{id}', function(Request $request, $id) {
        App\Task::findOrFail($id)->update(['body' => $request->input(['body'])]);
    });
});
