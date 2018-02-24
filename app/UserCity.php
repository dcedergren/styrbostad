<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserCity extends Model
{
	protected $fillable = ['name'];

    public function city()
    {
    	return $this->belongsTo('App\City','city_id');
    }
}
