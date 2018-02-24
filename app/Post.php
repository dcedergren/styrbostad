<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Post extends Model
{
    use Sluggable;
    use SoftDeletes;
    
    protected $fillable = [
        'id', 'title', 'short_description','full_description','rooms','square_feet','price','city_id','url','adress','lon','lat','slug','created_at','updated_at'
    ];
     protected $dates = ['deleted_at'];
    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'adress'
            ]
        ];
    }
    public function images()
    {
        return $this->hasMany('App\PostImage','post_id');
    }
    public function city()
    {
        return $this->belongsTo('App\City','city_id');
    }
}
