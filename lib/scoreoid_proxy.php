<?php

/*
  Copyright (c) 2011, Scoroeid 
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Scoreoid nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  
  DOCUMENTATION AT: http://wiki.scoreoid.net/
  
  * @Author		Scoroeid
  * @version	1.0.0
  * @Language   PHP 
*/

class ScoreoidProxy {

    //API key
    public $api_key = '89418051bf6251d2fb6fbb8c505435d2e7c28ad4';

    //Game ID
    public $game_id = '6ip3VKd0u';

    //Encrption key
    public $encryption_key = 'kLorSe0l';

    //Current security setting
    public $security = 1;

    //Base URL
    public $api_url = 'http://www.scoreoid.com/api/';

    //API method
    public $response, $method;

    // Encryption algorithm
    public $algorithm = MCRYPT_DES;

    // Encryption mode
    public $mode = MCRYPT_MODE_ECB;

    function __construct() {

        //Get call parameters
        $parameters = $this->_params();

        //Set API URL according to params
        $this->api_url .= ! empty($_POST['method']) ? $_POST['method'] : 'getScores';
        if (!empty($_REQUEST['action'])) {
            switch ($_REQUEST['action']) {
                case 'encrypt':

                    //If encryption is enabled then encrypt and return
                    if (!empty($this->security)) {
                        echo $this->encrypt(http_build_query($parameters), $this->encryption_key);
                    } else {
                        echo 'The advanced security is not enabled.';
                    }
                    break;
                case 'curl_request':
                    $curl_parameters = $parameters;
                    //If encryption is enabled encrypt parameters
                    if (!empty($this->security)) {
                        $curl_parameters = array(
                            'game_id' => $this->game_id,
                            's' => $this->encrypt(http_build_query($curl_parameters), $this->encryption_key)
                        );
                    }
                    $this->curl_request($curl_parameters);
                    break;
            }
        } else {
            die('Please provide the action parameter.');
        }
    }

    function encrypt($data, $key) {
        return base64_encode(mcrypt_encrypt($this->algorithm, $key, $this->pkcs5_pad($data), $this->mode));
    }

    function decrypt($data, $key) {
        return $this->pkcs5_unpad(rtrim(mcrypt_decrypt($this->algorithm, $key, base64_decode($data), $this->mode)));
    }

    function pkcs5_pad($string) {
        $blocksize = mcrypt_get_block_size($this->algorithm, $this->mode);
        $pad = $blocksize - (strlen($string) % $blocksize);
        return $string . str_repeat(chr($pad), $pad);
    }

    function pkcs5_unpad($string) {
        $pad = ord($string{strlen($string)-1});
        if ($pad > strlen($string)) return false;
        if (strspn($string, chr($pad), strlen($string) - $pad) != $pad) return false;
        return substr($string, 0, -1 * $pad);
    }

    //Prepare parameters
    function _params() {

        //Response type
        $this->response = !empty($_POST['response']) ? $_POST['response'] : 'xml';

        //Prepare parameters array
        $parameters = array(
            'api_key' => $this->api_key,
            'game_id' => $this->game_id,
            'response' => $this->response
        );

        //Add the other POST parameters
        if (!empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $parameters[$k] = $v;
            }
        }
        return $parameters;
    }

    //Function curl request
    function curl_request($parameters) {

        //If parameters are an array url-ify the data for the POST
        if (is_array($parameters)) {
            $params_string = '';
            $n = 1;
            foreach ($parameters as $k => $v) {
                $params_string .= $k . '=' . urlencode($v);
                if ($n < count($parameters)) {
                    $params_string .= '&';
                }
                $n++;
            }
        } else {
            $params_string = 's=' . urlencode($parameters);
        }

        //Init connection
        $ch = curl_init();

        //Set the URL, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $this->api_url);
        curl_setopt($ch, CURLOPT_POST, is_array($parameters) ? count($parameters) : 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params_string);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        //Execute post
        $result = curl_exec($ch);

        if (empty($this->security)) {
            print $result;
        }
        else {
            print $this->decrypt($result, $this->encryption_key);
        }

        //Close connection
        curl_close($ch);

        return $result;
    }
}

new ScoreoidProxy();
	
