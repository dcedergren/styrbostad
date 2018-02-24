<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use URL;
class NewObject extends Mailable
{
    use Queueable, SerializesModels;
    protected $post;
    protected $user;
    /**
     * Create a new message instance.
     *
     * @return void
     */
   public function __construct($post,$user)
    {
        $this->post = $post;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->name = $this->user->first_name. " ".$this->user->last_name;
        return $this->from('noreply@styrbostad.se')
        ->subject('Styrbostad - Ny lägenhet i '.$this->post->city->name. ", ".$this->post->adress)
        ->markdown('emails.newObject')
        ->with(['post' => $this->post,'user' => $this->user]);
    }
}
