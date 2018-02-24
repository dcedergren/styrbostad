<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Route::get('/fyfan','NotificationController@sendNotifications');

//Route::get('/crawl','CrawlerController@init');
Auth::routes();

Route::get('/sitemap','HomeController@sitemap');
Route::post('/hitta/stad','HomeController@redirectToCity');
Route::get('/send/notificaiton/email/125123asdfsadf55123','NotificationController@sendNotifications');
Route::get('/', 'HomeController@index')->name('home');
Route::get('/notification/{id}','HomeController@notificationRedirect');
//Route::get('/city/{slug}','HomeController@redirectCity');
Route::get('/hitta-lagenhet/{slug}','HomeController@showCity');
Route::get('/hitta-lagenhet','HomeController@showDefault');
Route::get('/register/thx','HomeController@showThanks');
Route::get('/user/verify/{verify_code}','HomeController@verifyUser');
Route::get('/bostad/{city}','HomeController@showPostByCity');
Route::get('/contact/','HomeController@contactUs');
Route::get('/get/post/{slug}', 'HomeController@redirectToPost');
Route::get('/hyra-lagenhet/{slug}','HomeController@postClicked');

//sökprofil
Route::get('/profile', 'ProfileController@showProfile')->middleware('auth');
Route::get('/profile/settings', 'ProfileController@showProfileSettings')->middleware('auth');
Route::post('/profile/settings', 'ProfileController@storeProfileSettings')->middleware('auth');

//uppdatera användare
Route::post('/profile/user/update', 'ProfileController@updateUser')->middleware('auth');

// unsubscribe
Route::get('/user/unsubscribe/mail','ProfileController@unSubscribe');
Route::post('/user/unsubscribe/auth','ProfileController@unsubscribeAuth');
Route::get('/user/unsubscribed','ProfileController@unSubscribed');