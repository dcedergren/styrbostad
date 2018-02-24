<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">


        <url>
            <loc>https://styrbostad.se/</loc>
            <lastmod> 2017-06-04T12:12:24+00:00 </lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>https://styrbostad.se/login</loc>
            <lastmod> 2017-06-04T12:12:24+00:00 </lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>https://styrbostad.se/register</loc>
            <lastmod> 2017-06-04T12:12:24+00:00 </lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
    @foreach ($sitemapCities as $city)
        <url>
            <loc>https://styrbostad.se/hitta-lagenhet/{{$city->slug}}</loc>
            <lastmod>{{ $city->created_at->tz('UTC')->toAtomString() }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
    @endforeach
</urlset>