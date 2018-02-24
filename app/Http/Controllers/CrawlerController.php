<?php

namespace App\Http\Controllers;

use Goutte\Client;
use App\Post;
use App\PostImage;
use DB;
use App\City;
use Validator;
use App\Helpers\CdnHelper;

class CrawlerController extends Controller
{
    public $object = array();

    public function init()
    {
        $path = app_path('Helpers/crawlers/');
        $content = array();
        $linksArray = array();
        $site = 'main.js';
        //$node = 'node';
        $node = 'xvfb-run --server-args="-screen 0 1024x768x24" node';
        $command = "$node $path$site";
        $array_here = shell_exec($command);
        $content[]= json_decode($array_here, true);
        var_dump($content[0][1]);
        //foreach($content[0][0] ?? array() as $apartments) {
            foreach ($content[0][0] ?? array() as $apartment) {
                $object = $this->getObject();
                if(!empty($apartment['source'])) {
                    $object["source"] = $apartment['source'];
                }
                if(!empty($apartment['price'])) {
                    $object["price"] = $apartment['price'];
                }
                if(!empty($apartment['url'])) {
                    $object["url"] = $apartment['url'];
                    $linksArray[] = $object["url"];
                }
                if(!empty($apartment['city'])) {
                    $object["city"] = $apartment['city'];
                }
                if(!empty($apartment['adress'])) {
                    $object["adress"] = $apartment['adress'];
                }
                if(!empty($apartment['rooms'])) {
                    $object["rooms"] = $apartment['rooms'];
                }
                if(!empty($apartment['square_feet'])) {
                    $object["square_feet"] = $apartment['square_feet'];
                }

                $object = $this->cleanObject($object);

                $this->object[] = $object;
            }
        //}
        if (!empty($linksArray)) {
            $this->removeUnactive($linksArray);
        }
        foreach($this->object as $object)
        {
            $status = $this->storePost($object);
        }
    }

    public function getObject()
    {
        return array(
            'rooms' =>0,
            'price' => 0,
            'square_feet' => 0,
            'city' => "",
            'url' => "",
            'adress' => "",
        );
    }
    public function removeUnactive($array)
    {
        Post::whereNotIn('url',$array)->delete();
    }
    public function cleanObject($object)
    {
        foreach($object as $index=>$objectItem)
        {
            if(!is_array($objectItem))
            {

                $object[$index] = strip_tags($objectItem);

                $object[$index] =  str_replace("\n",'',$object[$index]);
                $object[$index] =  str_replace("\t",'',$object[$index]);
                $object[$index] = preg_replace('!\s+!', ' ', $object[$index]);
                $object[$index] = trim($object[$index], " ");

                if($index == "price")
                {
                    $object[$index] = preg_replace("/[^0-9]/","",$objectItem);
                }
                if($index == "square_feet")
                {
                    $object[$index] = str_replace("m2", "", $objectItem );
                    if(strpos($objectItem,'.'))
                    {
                        $object[$index] = substr($objectItem,0,strpos($objectItem,'.'));
                    }
                    if(strpos($objectItem,','))
                    {
                        $object[$index] = substr($objectItem,0,strpos($objectItem,','));
                    }
                    $object[$index] = preg_replace("/[^0-9]/","",$object[$index]);
                }
                if($index === "rooms")
                {
                    if(strpos($objectItem,'.'))
                    {
                        $object[$index] = substr($objectItem,0,strpos($objectItem,'.'));
                    }
                    if(strpos($objectItem,','))
                    {
                        $object[$index] = substr($objectItem,0,strpos($objectItem,','));
                    }
                    $object[$index] = preg_replace("/[^0-9]/","",$object[$index]);
                }
            }
        }
        return $object;
    }

    public function storePost($object)
    {
        $validator = Validator::make($object, [
            'square_feet' => 'required|integer',
            'price' => 'required|integer',
            'url' => 'required',
            'city' => 'required',
            'adress' => 'required',
            'source' => 'required',

        ]);
        if ($validator->fails()) {
            return null;
        }

        try
        {
            DB::beginTransaction();

            if(strpos ( $object["city"] , "stad -"))
            {
                $object["city"] = substr($object["city"],0,strpos ( $object["city"] , " stad -") - 1);

            }

            $city = City::where('name',$object["city"])->first();


            if(empty($city))
            {
                $city = new City();
                $city->name = $object["city"];
                $city->save();
            }

        }
        catch(\Exception $e)
        {
            DB::rollBack();
        }

        $post = Post::where('url',$object["url"])->withTrashed()->first();
        if(empty($post))
        {
            try
            {
                $post = new Post();
                /*$geo = app('geocoder')->geocode($object["city"], $object["adress"])->get();
                $geo = $geo->first();
                if(empty($geo->getLatitude()))
                {
                    throw new \Exception('Empty geo data');

                }

                $post->lat = (string) $geo->getLatitude();
                $post->lon = (string) $geo->getLongitude();*/
            }
            catch(\Exception $e)
            {
                var_dump($e);
                $latLong = false;
            }

        }

        $status = array();
        $post->rooms = (string) $object["rooms"];
        $post->price = (string) $object["price"];
        $post->square_feet = (string) $object["square_feet"];
        $post->city_id = $city->id;
        $post->url = (string) $object["url"];
        $post->adress = (string) $object["adress"];
        $post->source = (string) $object["source"];
        $post->deleted_at = NULL;
        $status[] = $post->save();

        foreach($status as $statusItem)
        {
            if(!$statusItem)
            {
                DB::rollBack();
                return false;
            }
        }

        DB::commit();
        return true;
    }
}

