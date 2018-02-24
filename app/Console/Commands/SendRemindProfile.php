<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Mail\newObject;
use Mail;        
use App\Post;
use App\User;
use App\Notification;
use App\UserPost;
use DB;
use App\Mail\RemindVerify;
use App\Mail\RemindSetProfile;
class SendRemindProfile extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'remind:setProfile';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reminds user to verify their account on styrbostad';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
       	$users = User::where('verified',1)->whereNull('updated_search_profile')->get();

        foreach($users as $user)
        {
            Mail::to($user)->send(new RemindSetProfile($user));
        }

    }
}