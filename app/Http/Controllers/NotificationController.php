<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use DB;
use App\Notification;
use App\UserPost;
use Mail;
use App\Mail\NewObject;
use App\User;
class NotificationController extends Controller
{
  	public function sendNotifications()
    {
        $post = Post::with('images','city')->get();
        $userArray = array();
        foreach($post as $postItem)
        {   
            $users = 
            User::where('min_rent','<=',$postItem->price)
            ->where('max_rent','>=',$postItem->price)
            ->where('min_size','<=',$postItem->square_feet)
            ->where('max_size','>=',$postItem->square_feet)
            ->whereHas('userCities',function($query) use($postItem)
            {
                $query->where('city_id',$postItem->city_id);
            })
            ->where('updated_search_profile','<=',$postItem->created_at)
            ->whereDoesntHave('posts',function($query) use($postItem)
            {
                $query->where('post_id',$postItem->id);
            })
            ->get();
            foreach($users as $user)
            {
                DB::beginTransaction();
                try
                {
                    $notification = new Notification();
                    $notification->user_id = $user->id;
                    $notification->url = $postItem->id;
                    $notification->content = $postItem->rooms.":a, ".$postItem->square_feet." kvm i ".$postItem->city->name;
                    $notification->save();

                    $userPost = new UserPost();
                    $userPost->user_id = $user->id;
                    $userPost->url = $postItem->id;
                    if($user->receive_email)
                    {
                        if(empty($userArray[$user->id]))
                        {
                            Mail::to($user)->send(new NewObject($postItem,$user));
                            $userArray[$user->id] = true;
                            $userPost->emailed = 1;
                        }
                        else
                        {
                            $userPost->emailed = 0;
                        }

                    }
                    else
                    {
                        $userPost->emailed = 0;
                    }

                    $userArray[$user->id] = true;
                    $userPost->save();
                    DB::commit();
                }
                catch(\Exception $e)
                {
                  DB::rollBack();
                }
            }
        }
    }
}
