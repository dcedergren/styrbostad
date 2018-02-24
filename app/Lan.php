<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lan extends Model
{
	public function cities()
	{
		return $this->hasMany('App\City','lan_id');
	}
}
