import React from 'react';
import Layout from '@theme/Layout';

function GetData(url) {
    $.ajax({
        type: 'GET',
        headers: {
            "Accept": "application/json",
        },
        url: url,
        cors: true,
        crossDomain: true,
        success: function (data, textStatus, request) {
            let reformatFileUrl = data.url
            // const json = JSON.stringify(data, null, '  ')
            console.log('url', reformatFileUrl);
            $.ajax({
                type: 'GET',
                headers: {
                    // 'Access-Control-Allow-Credentials': true,
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Accept': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                url: reformatFileUrl,
                // CORS: true,
                crossDomain: true,
                success: function (data, textStatus, request) {
                    console.log('OPTIONS', data)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.error('status', xhr.status);
                    console.error('err', thrownError);
                }
            })
        }
    });
}

export default function Reformat() {
    var GEOXO_API_URL_AUTH = "https://g5mhhyt2c4.execute-api.us-east-1.amazonaws.com/v1"
    const queryParams = new URLSearchParams(window.location.search)
    const cid = queryParams.get("cid")
    const fmt = queryParams.get("fmt")
    var url = GEOXO_API_URL_AUTH + "/dcs/" + cid + '?class=cf'
    var reformatFileUrl

    GetData(url)

    return (

        <Layout title="Reformat" description="Hello Reformat Page">
            <div id='layout' style={{
                'marginLeft': '50px'
            }}>
                <br />
                <h1>Reformat</h1>
                <div className="Reformat">
                    <p>Value of cid: {cid}</p>
                    <p>Value of fmt: {fmt}</p>
                    <p>Value of reformatFileUrl: {reformatFileUrl}</p>
                </div>
            </div>
        </Layout>
    )
}

