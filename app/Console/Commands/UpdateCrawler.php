<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UpdateCrawler extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:crawler';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetches objects and se if they are up to date.';

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
        app('App\Http\Controllers\CrawlerController')->update();
    }
}
