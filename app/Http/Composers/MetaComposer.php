<?php namespace App\Http\Composers;
use App\Lan;
use Illuminate\Contracts\View\View;
use Route;
use Request;
use App\City;
use Illuminate\Support\Facades\DB;
use Cache;
use Auth;
use App\Post;
use App\Page;
class MetaComposer
{	

	public function compose (View $view)
	{	

		$returnArray = array();

        $returnArray["cities"] = Cache::remember('compose:cities', 5, function () {

			$cities = City::limit(8)->get();
			$cities = $cities->chunk(4);
			return $cities;
		});

        $returnArray["allCitys"] = Cache::remember('compose:allCitys', 5, function () {

			$allCitys = City::orderBy('name','ASC')->get();

			$allCitys = $allCitys->chunk($allCitys->count() / 2);
			return $allCitys;
		});

        $returnArray["lans"] = Cache::remember('compose:lan', 5, function () {
			$lan = Lan::has('cities')->with('cities')->get();
			$lan = $lan->chunk(round($lan->count() / 2));
			return $lan;
		});
			if(Route::getFacadeRoot()->current())
			{
				$returnArray["page"] = $this->getPage(Route::getFacadeRoot()->current()->uri());
				$returnArray["bodyClass"] = $returnArray["page"]->advanced_name ?? "default";

				if($returnArray["page"]->dynamic ?? false)
				{
					$returnArray["page"] = $this->dynamic($returnArray["page"]);
				}       	
			}
			else
			{
				$returnArray["bodyClass"] = "default";
				$returnArray["page"] = "";
			}
			
			 $view->with($returnArray);

	}
	public function dynamic($page)
	{		
        return Cache::remember('dynamic'.Route::current()->parameter('slug'), 5, function () use($page) {

        	try
        	{
        		switch ($page->advanced_name) {

				    case "object":
					    $post = Post::with('images')->withTrashed()->where('slug',Route::current()->parameter('slug'))->first();
					    $page->title = $post->title;
					    $page->description = strip_tags(substr(trim($post->full_description),0,140))."...";

					    foreach($post->images as $image)
					    {
					    	$page->addImage($image->url);
					    }
				    break;

				     case "city":
					    $city = City::where('slug',Route::current()->parameter('slug'))->first();

					    if(empty($city))
					    {
					    	return $page;
					    }
					    $page->title =  "Hyra lägenhet ".$city->name. ". Vi hjälper dig.";
					    $page->description = "Vi samlar annonser från hyresvärdar för att hyra lägenhet i ".$city->name.". Vi hittar kontinuerligt nya objekt, registrera en sökprofil så meddelar vi dig när vi hittar en lägenhet i ".$city->name;
					break;
				}	

        	}
        	catch(\Exception $e)
        	{
        		abort(404);
        	}

				
			return $page;
		});
	}

	public function getPage($route)
	{	
        return Cache::remember('route'.$route, 5, function () use($route) {
			return Page::where('route','=',$route)->first();
		});
	}

}
?>