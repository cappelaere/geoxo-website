import React from 'react';
import Layout from '@theme/Layout';

export default function Query() {
    var GEOXO_API_URL_AUTH = "https://g5mhhyt2c4.execute-api.us-east-1.amazonaws.com/v1"
    var TEST_API_URL = "https://ue2r8c8eo3.execute-api.us-east-1.amazonaws.com/v1"

    function onBtnClick() {
        var url = GEOXO_API_URL_AUTH + "/dcs/sql"
        var q = { query: $('#q').val() }
        console.log("event:" + JSON.stringify(q))
        console.log(url)
        $('#results').html('')
        $(document.body).css({ 'cursor': 'wait' });

        $.ajax({
            type: 'POST',
            headers: {
                "Accept": "application/json",
            },
            url: url,
            data: JSON.stringify(q),
            crossDomain: true,
            success: function (data, textStatus, request) {
                $(document.body).css({ 'cursor': 'default' });

                const json = JSON.stringify(data, null, '  ')
                console.log(json);
                let html = "<b>Results:</b><pre>" + json + "</pre>"
                $('#results').html(html)
            }
        });
    }

    function onBtnList() {
        // var url = TEST_API_URL + "/dcs/search"
        var url = GEOXO_API_URL_AUTH + "/dcs/search"
        var limit = $('#limit').val()
        var queryCommas = $('#l').val().split(',')
        const query = {}
        if (queryCommas) {
            console.log(queryCommas)
            for (let q of queryCommas) {
                const arr = q.split(':')
                console.log(arr)
                query[arr[0]] = arr[1]
            }
        }

        const data = { query: query, limit: limit }
        console.log("search:" + JSON.stringify(data))
        console.log(url)
        $('#results').html('')
        $(document.body).css({ 'cursor': 'wait' });

        $.ajax({
            type: 'POST',
            headers: {
                "Accept": "application/json",
            },
            url: url,
            data: JSON.stringify(data),
            cors: true,
            crossDomain: true,
            success: function (data, textStatus, request) {
                $(document.body).css({ 'cursor': 'default' });

                const json = JSON.stringify(data, null, '  ')
                console.log(json);
                let html = "<b>Results:</b><pre>" + json + "</pre>"
                $('#results').html(html)
            }
        });
    }

    function onBtnGet() {
        var url = GEOXO_API_URL_AUTH + "/dcs/"
        var g = $('#g').val()
        var cls = $('#storageClass').val()

        console.log("get:" + g + ' class:' + cls)
        var url = GEOXO_API_URL_AUTH + "/dcs/" + g + '?class=' + cls
        console.log(url)
        $('#results').html('')
        //$('#layout').attr("cursor", "wait")
        $(document.body).css({ 'cursor': 'wait' });

        $.ajax({
            type: 'GET',
            headers: {
                "Accept": "application/json",
            },
            url: url,
            cors: true,
            crossDomain: true,
            success: function (data, textStatus, request) {
                const url = data.url
                const json = JSON.stringify(data, null, '  ')
                console.log(json);
                $(document.body).css({ 'cursor': 'default' });

                let html = "<b>Results:</b><br/><pre>" + json + "</pre>"
                html += "<br/>"
                html += "<a href='" + url + "' download='dcs.json'>Download</a><br/>"

                $('#results').html(html)
            }
        });
    }

    return (
        <Layout title="Query" description="Hello Query Page">
            <div id='layout' style={{
                'marginLeft': '25px'
            }}>
                <br />
                <h1>DCS Query Examples</h1>
                <br />
                <h2>SQL Query Data Example</h2>
                <input type="text" id="q" name="q" size="80" maxLength='80' required defaultValue='list last two goes records' />
                <button onClick={onBtnClick} id='queryButton' name='queryButton'>Query</button>

                <br />
                <br />
                <h2>Search Query Example</h2>
                <label>limit:</label>
                <input type="number" id="limit" name="limit" required defaultValue='1' />
                <br />
                <input type="text" id="l" name="l" size="80" maxLength='80' required defaultValue='platformId:CE44B7BA' />
                <button onClick={onBtnList} id='listButton' name='listButton'>Query</button>

                <br />
                <br />
                <h2>Get Example</h2>
                <label>Storage Class:</label>
                <select id='storageClass' name='storageClass'>
                    <option value='cf'>cf</option>
                    <option value='s3'>s3</option>
                    <option value='r2'>r2</option>
                </select>
                <br />
                <input type="text" id="g" name="g" size="80" maxLength='80' required defaultValue='bafkreia7ti3bo53zhrgrdkbtice7yeqrn2e2yq43cxy62gn6dmjsgpkl6m' />
                <button onClick={onBtnGet} id='getButton' name='getButton'>Query</button>
                <br />
                <br />
                <div id='results'></div>
            </div>

        </Layout>
    );
}
