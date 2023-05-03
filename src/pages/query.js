import React from 'react';
import Layout from '@theme/Layout';

export default function Query() {
    var GEOXO_API_URL_AUTH = "https://g5mhhyt2c4.execute-api.us-east-1.amazonaws.com/v1"
    var reformatFileUrl

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
                console.log('success onBtnClick', data, textStatus)
                $(document.body).css({ 'cursor': 'default' });
                if (data.results.error) {
                    let html = "<pre>" + JSON.stringify(data, null, '\t') + "</pre>"
                    $('#results').html(html)
                } else {
                    let html = FormatResults(data)
                    $('#results').html(html)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(`textStatus ${textStatus}`)
                console.log(`errorThrown ${errorThrown}`)
                let html = errorThrown;
                $('#results').html(html)
            }
        })
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
        // console.log(url)
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
                let html = FormatResults(data)
                $('#results').html(html)
                console.log(html)
            }
        });
    }

    function FormatResults(json) {
        let fmt = $('#format').val()
        let res
        switch (fmt) {
            case 'json':
                const str = JSON.stringify(json, null, '  ')
                console.log(str);
                res = `<b>Results:</b><pre>${encodeHTMLEntities(str)}</pre>`
                return res
            case 'html':
                console.log(json)
                res = JsonToHtml(json)
                return res
            case 'csv':
                res = JsonToCsv(json)
                return res
            default:
                res = 'Invalid format'
                return res
        }
    }

    function JsonToHtml(json) {
        let html = '<b>Results:</b><br><table>'
        let el
        if (json.sql) {
            html += "<b>SQL Query:</b>"
            html += encodeHTMLEntities(json.sql) + "<br/>"
        }
        if (json.results) {
            el = json.results[0]
            json = json.results
        } else {
            el = json[0]
        }
        if (el == null) {
            html += "NO RESULTS"
            return html
        }
        var keys = Object.keys(el)
        html += "<tr>"
        for (let k of keys) {
            if (k !== 'BinaryMsg') {
                html += `<th>${k}</th>`
            }
        }
        html += "</tr>"
        console.log(json)
        for (let j of json) {
            html += "<tr>"
            for (let k of keys) {
                if (k !== 'BinaryMsg') {
                    let v = j[k]
                    if (v) {
                        html += `<td>${encodeHTMLEntities(j[k].toString())}</td>`
                    } else {
                        html += `<td>null</td>`
                    }
                }
            }
            html += "</tr>"
        }

        html += "</table>"
        return html
    }

    function JsonToCsv(json) {
        let html = '<b>Results:</b><br>'
        let el
        if (json.results) {
            el = json.results[0]
            json = json.results
        } else {
            el = json[0]
        }
        var keys = Object.keys(el)
        html += "<tr>"
        for (let k of keys) {
            if (k !== 'BinaryMsg') {
                html += `${k},`
            }
        }
        html += "-<br/>"

        for (let j of json) {
            html += "<tr>"
            for (let k of keys) {
                if (k !== 'BinaryMsg') {
                    if (j[k]) {
                        html += `${encodeHTMLEntities(j[k].toString())},`
                    } else {
                        html += 'null,'
                    }
                }
            }
            html += "-<br/>"
        }

        return html
    }

    // cid:bafkreiadanxf5w62ihtghcs5ramy3pjix5yfvndov7q2443wkozcwsmcs4

    function encodeHTMLEntities(rawStr) {
        return rawStr.replace(/[\u00A0-\u9999<>\&]/g, ((i) => `&#${i.charCodeAt(0)};`));
    }

    function htmlEncode(input) {
        const textArea = document.createElement("textarea");
        textArea.innerText = input;
        return textArea.innerHTML.split("<br>").join("\n");
    }

    function onBtnGet() {
        var url = GEOXO_API_URL_AUTH + "/dcs/"
        var g = $('#g').val()
        var cls = $('#storageClass').val()
        const fmt = $('#format').val()

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
                reformatFileUrl = data.url
                const json = JSON.stringify(data, null, '  ')
                console.log(json);
                $(document.body).css({ 'cursor': 'default' });

                // let html = "<b>Results:</b><br/><pre>" + json + "</pre>"
                let html = FormatResults([data])
                const path = `/reformat?cid=${data.cid}&fmt=${fmt}`
                html += "<br/>"
                html += "<a href='" + reformatFileUrl + "' download='dcs.json'>xDownload</a><br/>"
                // html += "<a href='" + path + "'>Reformat File</a><br/>"

                $('#results').html(html)
            }
        });
    }

    function Reformat() {
        console.log(`Reformat`, reformatFileUrl)
    }

    return (
        <Layout title="Query" description="Hello Query Page">
            <div id='layout' style={{
                'marginLeft': '50px'
            }}>
                <br />
                <h1>DCS Query Examples</h1>
                <br />
                <label>Preferred Output Format:</label><br />
                <select id='format' name='format'>
                    <option value='html'>html</option>
                    <option value='json'>json</option>
                    <option value='csv'>csv</option>
                </select>
                <hr />
                <h2>SQL Query Data Example &nbsp;
                </h2>
                <div id="sqlquerydiv">
                    The query allows a user to make a request using natural language.  OpenAI ChatGPT will attempt to generate a complex SQL query.  The query will then be sent to ElasticSearch.  Both query and results are returned to the user.
                    <br />Examples:
                    <pre>
                        find three goes records with agency = 'NOANOS' since yesterday<br />
                        retrieve ten goes records from last two days<br />
                        find 3 goes records with platformId=CE44B7BA
                    </pre>
                </div >
                <br />

                <input type="text" id="q" name="q" size="80" maxLength='80' required defaultValue='list last two goes records' />
                <button onClick={onBtnClick} id='queryButton' name='queryButton'>Query</button>

                <br />
                <hr />
                <h2>Search Query Example</h2>
                <div id="querydiv">
                    The query allows a user to make a filtered request.  Filters can be applied using existing attribute:value
                    <pre>
                        agency:NOANOS<br />
                        platformId:CE44B7BA<br />
                        Baud:1200<br />
                        flags:0x00081c55
                    </pre>
                </div >
                <br />
                <label>limit:</label>
                <input type="number" id="limit" name="limit" required defaultValue='1' />
                <br />
                <input type="text" id="l" name="l" size="80" maxLength='80' required defaultValue='platformId:CE44B7BA' />
                <button onClick={onBtnList} id='listButton' name='listButton'>Query</button>

                <br />
                <hr />
                <h2>Get Example</h2>
                <div id="querydiv">
                    The query allows a user to download a DCP given a specific Content ID (cid).<br />
                    User can also specify a storage class such as s3,cf (Cloudfront) or r2 (CloudFlare if available)<br />
                    The system will return a presigned url valid for 15mn <br />
                    User can also download from the browser using the download button
                    <pre>
                        agency:NOANOS<br />
                        platformId:CE44B7BA<br />
                        Baud:1200<br />
                        flags:0x00081c55
                    </pre>
                </div >
                <br />
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

                <br />
                <a href='/react.js'>Code Snippet</a>

            </div >

        </Layout >
    );
}
