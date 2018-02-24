<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Mail\ResetPassword;
use Mail;
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name','last_name','verify_code','email', 'password','receive_mail','updated_search_profile',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        Mail::to($this)->send(new ResetPassword($this,$token));

    }

    public function userCities()
    {
        return $this->hasMany('App\UserCity');
    }
    public function posts()
    {
        return $this->hasMany('App\UserPost');
    }
    public function unreadNotifications()
    {
        return $this->hasMany('App\Notification')->where('read',0)->orderBy('created_at', 'desc');
    }
    public function notifications()
    {
        return $this->hasMany('App\Notification');

    }
}
