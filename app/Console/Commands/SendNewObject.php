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
class SendNewObject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:notifications';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Finds and sends notifications about new objects';

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
        $soldArticles = app('App\Http\Controllers\NotificationController')->sendNotifications();

    }
}