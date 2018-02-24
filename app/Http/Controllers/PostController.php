<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function ajaxLoad(Request $request) {
        $data = $request->all();

        $posts = Post::with('images','city.lan');

        foreach($data as $index=>$dataItem)
        {
            if(empty($dataItem))
            {
                continue;
            }
            switch ($index)
            {
                case "city":
                    $posts = $posts->whereHas('city',function($query) use($request)
                    {
                        $cityArray = $request->city;
                        $comp = preg_split('/\s+/', $cityArray);
                        $query->whereIn('name',$comp);
                    });
                    break;

                case "minKvm":
                    $minKvm = substr($data['minKvm'],0,-4);
                    $int = (int)$minKvm;
                    $posts = $posts->where('square_feet', '>=', $int);
                    break;

                case "maxKvm":
                    $maxKvm = substr($request->maxKvm,0,-4);
                    $int = (int)$maxKvm;
                    $posts = $posts->where('square_feet', '<=', $int);
                    break;

                case "minRoom":
                    $minRoom = $request->minRoom;
                    $int = (int)$minRoom;
                    $posts = $posts->where('rooms', '>=', $int);
                    break;
                case "maxRoom":
                    $maxRoom = $request->maxRoom;
                    $int = (int)$maxRoom;
                    $posts = $posts->where('rooms', '<=', $int);
                    break;
                case "maxPrice":

                    $maxPrice = substr($request->maxPrice,0,-8);
                    $posts = $posts->where('price', '<=', $maxPrice);
                    break;
            }
        }
        $count = $posts->count();
        $posts = $posts->latest()->orderBy('created_at', 'desc')->paginate(10);

        return \Response::json(array(
            'data' => $posts->toArray()["data"],
            'count' => $count,
            'pagination'=> (string) $posts->links('vuePaginator')
        ));
    }
}
