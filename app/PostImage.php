<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostImage extends Model
{
    protected $fillable = [
        'id', 'url', 'post_id','original','created_at','updated_at'
    ];
}
