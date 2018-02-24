<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Fair Photo Agency</title>
    </head>
    <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" bgcolor="#515b69" style="margin:20px 0 0; padding:0;-webkit-text-size-adjust:none; -ms-text-size-adjust:none;">

        <table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%" bgcolor="#515b69" id="bodyTable" style="border-collapse:collapse;table-layout:fixed;margin:0 auto;">
            <tr>
                <td>

                    <!-- Hidden Preheader Text : BEGIN -->
                    <div style="display:none; visibility:hidden; opacity:0; color:transparent; height:0; width:0;line-height:0; overflow:hidden;mso-hide: all;">
                        UTDRAG
                    </div>
                    <!-- Hidden Preheader Text : END -->

                    <!-- Outlook and Lotus Notes dont support max-width but are always on desktop, so we can enforce a wide, fixed width view. -->
                    <!-- Beginning of Outlook-specific wrapper : BEGIN -->
                        <!--[if (gte mso 9)|(IE)]>
                            <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                        <![endif]-->
                    <!-- Beginning of Outlook-specific wrapper : END -->

                    <!-- Email wrapper : BEGIN -->
                    <table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="max-width:600px;margin:auto;" class="email-container">
                        <tr>
                          <td style="text-align:left;padding:20px 40px;font-family:sans-serif;font-size:16px;line-height:24px;color:#fff;background:#1a1b1d;">
                                    <h1 style="width:100%; text-align: center; color:#74c5a4;"> Styrbostad </h1>
                          </td>
                        </tr>
                        <tr>
                            <td>
                            <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
                              <tr>
                                <td style="padding:40px; font-family:sans-serif; font-size:16px; line-height:24px; color:#666666;">
                                    @yield('content')

                                </td>
                              </tr>
                              <tr>
                                <td style="padding:40px; font-family:sans-serif; font-size:16px; line-height:24px; color:#666666;"> Best wishes, Hypedgamers
                                </td>
                              </tr>

                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="text-align:center;padding:20px 40px;font-family:sans-serif;font-size:12px;line-height:18px;color:#fff;background:#515b69;">
                    <table border="0" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                        <tr>
                            <td style="width:50%;padding:0 10px 0 0;text-align:left;vertical-align:top;">
                                <div style="display:block;width:50%;margin-bottom:15px;">
                                    <img src="http://styrbostad.se/main_logo.png" style="width:50px;height:auto;" /><br />
                                </div>

                                <a href="https://www.facebook.com/styrbostad/" style="display:block;float:left;margin-right:5px;border:1px solid #fff;width:30px;height:30px;text-align:center;color:#fff;text-decoration:none;background:url({{URL::to('/')}}/images/mail_social_sprite.png) top 0px left 0px"></a>

                            </td>
                            <td style="width:50%;padding:0 0 0 10px;text-align:left;color:#fff;">
                                <a href="mailto:hello@styrbostad.se" style="display:block;margin-top:5px;color:#74c5a4;">hello@hypedgamers.com</a>
                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
            <tr>
                <td style="text-align:center;padding:10px 0;font-family:sans-serif;font-size:12px;line-height:18px;color:#444;background:transparent;">
                    © Styrbostad, All rights Reserved
                </td>
            </tr>
            <tr>
                <td style="text-align:center;padding:0;font-family:sans-serif;font-size:12px;line-height:18px;color:#9da936;background:transparent;">
{{--                     <a href="#" style="display:block;color:black;">Unsubscribe</a>
 --}}                </td>
            </tr>

        </table>
        <!-- End of Outlook-specific wrapper : BEGIN -->
        <!--[if (gte mso 9)|(IE)]>
                    </td>
                </tr>
            </table>
        <![endif]-->
        <!-- End of Outlook-specific wrapper : END -->

        </td>
        </tr>
        </table>

    </body>
</html>
