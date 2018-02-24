<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class StartCrawler extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'start:crawler';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Starts crawler and fetches objects';

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
        app('App\Http\Controllers\CrawlerController')->init();
    }
}
