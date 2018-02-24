<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $images = array();

     public function getImages()
    {
        return $this->images;
    }
    public function addImage($url)
    {
    	$this->images[] = $url;
    }

}
