<?php
namespace App\Helpers;

use Carbon\Carbon;
use Auth;
use App\User;
use App\File;
use App\PostImage;
class CdnHelper
{       

    private $token = "";
    private $email = "timbergstedt@gmail.com";
    private $password = "vqvMRNV6wqRgzfHXZrIWaph2QbfJshUr";
    private $url = "https://cdn.styrbostad.se/api/";
    /**
     * Constructor
     * 
     * @param  nill   $request   Form Request
     * @return class object      Returns a Json response
    */
    function __construct()
    {
        $this->token = $this->login();
    }
    /**
    * Logges in to the API-
    * 
    * @param  Nill           
    * @return token             Returns a valid api-token.
    */
    private function login()
    {
        $endpoint = "auth/login";
        $data = array("email"=>$this->email,"password"=>$this->password);
        $response = $this->apiCall($data,$endpoint);
        if(!empty($response))
        {
            $token = json_decode($response);
            if(!empty($token->token))
            {
                return $token->token;
            }
        }
        else
        {   
            json_encode(array("Error"=>"Could not find API-token"));
            die();
        }

    }
        /**
    * Performes an API-call to set URL and with appropriate 
    * 
    * @param  $DataToCurl,     - STD Data object with required fields matching the demands of the API
              $endpoint        - API-endpoint to CURL    
    * @return $result          - returns the return from the API 
    */
    private function apiCall($dataToCurl,$endpoint)
    {
                // create a new cURL resource
                $ch = curl_init();
                $URL = $this->url.$endpoint;
                // set URL and other appropriate options
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_URL, $URL);
                
                $data = "{\"customerId\":\"M25094\",\"typeOfDate\":0}";
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $dataToCurl);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
                
                $result = curl_exec($ch);
                $report=curl_getinfo($ch);
                if(curl_errno($ch)) {
                   echo 'Curl error: ' . curl_error($ch);
                }
                // close cURL resource, and free up system resources
                curl_close($ch);
                return $result;
    }
    /**
    * Calls the means to upload new image to the CDN via the API
    * 
    * @param  $File            - The contents of the given file to upload
              $path            - Path to save on the CDN
    * @return $result          - returns the result given by the API
    */
    public function uploadImage($file,$path)
    {   
        $data = array("file"=>$file,"path"=>$path);
        $endpoint = "image/post?token=".$this->token;
        $result = $this->apiCall($data,$endpoint);
        return $result;
    }

    public function store($file,$postId,$orginalFile,$extension = NULL)
    {
        $returnArray = array();

        $folder = CdnHelper::random_str(15);
        $fileName = CdnHelper::random_str(5);
        if($extension)
        {
            $fileName = $fileName.".".$extension;
        }
        else
        {
            $fileName = $fileName.".jpg";
        }
        $filedata = $file;
        $completePath = "/images/".$folder."/".$fileName; //change this directory
        $status = $this->uploadImage($filedata,$completePath);
        if($status == "success")
        {
            $image = new PostImage();
            $image->url = "https://cdn.styrbostad.se/image/".$folder."/".$fileName;
            $image->post_id = $postId;
            $image->original = $orginalFile;
            $image->save();

            return $image;   
        }

    }
    public static function random_str($length, $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    {
        $str = '';
        $max = mb_strlen($keyspace, '8bit') - 1;
        for ($i = 0; $i < $length; ++$i) {
            $str .= $keyspace[random_int(0, $max)];
        }
        return $str;
    }
}