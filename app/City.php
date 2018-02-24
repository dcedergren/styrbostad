<?php

namespace App;
use Cviebrock\EloquentSluggable\Sluggable;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use Sluggable;

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
    public function posts()
    {
    	return $this->hasMany('App\Post','city_id');
    }

    public function lan()
    {
        return $this->belongsTo('App\Lan', 'lan_id');
    }
}
