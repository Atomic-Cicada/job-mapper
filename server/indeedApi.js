'use strict';

let request = require('request');
let rp = require('request-promise');


module.exports = {
  queryBuilder: (queryVar, locationVar, limitVar, startVar) => {
    /////////////////////////////////
    // Indeed API request parameters
    /////////////////////////////////

    // ----------------- //
    // PARAMETERS IN USE //
    // ----------------- //
    // publisher Publisher ID. Your publisher ID is "PUBLISHER ID HERE". This is assigned when you register as a publisher.
    let publisher = 'publisher=' + process.env.INDEED_PUBLISHER_ID;
    // v Version. Which version of the API you wish to use. All publishers should be using version 2. Currently available versions are 1 and 2. This parameter is required.
    let version = '&v=' + '2';
    // format  Format. Which output format of the API you wish to use. The options are "xml" and "json". If omitted or invalid, the XML format is used.
    let format = '&format=' + 'json';
    // q Query. By default terms are ANDed. To see what is possible, use our advanced search page to perform a search and then check the url for the q value.
    let query = '&q=' + encodeURIComponent(queryVar.trim());
    // l Location. Use a postal code or a "city, state/province/region" combination.
    let loc = '&l=' + encodeURIComponent(locationVar.trim());
    // latlong If latlong=1, returns latitude and longitude information for each job result. Default is 0.
    let latlong = '&latlong=' + '1';
    // co  Search within country specified. Default is us See below for a complete list of supported countries.
    let co = '&co=' + 'us';
    // userip  The IP number of the end-user to whom the job results will be displayed. This field is required.
    let userIp = '&userip=' + '1.2.3.4';
    // useragent The User-Agent (browser) of the end-user to whom the job results will be displayed. This can be obtained from the "User-Agent" HTTP request header from the end-user. This field is required.
    let userAgent = '&useragent=' + 'Mozilla/%2F4.0%28Firefox%29';
    // limit Maximum number of results returned per query. Default is 10
    let limit = '&limit=' + encodeURIComponent(limitVar.trim());
    // start Start results at this result number, beginning with 0. Default is 0.
    let start = '&start=' + encodeURIComponent(startVar.trim(startVar));
    // fromage Number of days back to search.
    let fromAge = '&fromage=' + '1';

    // --------------------- //
    // PARAMETERS NOT IN USE //
    // --------------------- //
    
    /*
    // callback  Callback. The name of a javascript function to use as a callback to which the results of the search are passed. This only applies when format=json. For security reasons, the callback name is restricted letters, numbers, and the underscore character.
    let callback = '&callback=' + '';
    // radius  Distance from search location ("as the crow flies"). Default is 25.
    let radius = '&radius=' + '25';
    // st  Site type. To show only jobs from job boards use "jobsite". For jobs from direct employer websites use "employer".
    let siteType = '&st=' + '';
    // jt  Job type. Allowed values: "fulltime", "parttime", "contract", "internship", "temporary".
    let jobType = '&jt=' + '';
    // highlight Setting this value to 1 will bold terms in the snippet that are also present in q. Default is 0.
    let highlight = '&highlight=' + '';
    // filter  Filter duplicate results. 0 turns off duplicate job filtering. Default is 1.
    let filter = '&filter=' + '';
    // chnl  Channel Name: Group API requests to a specific channel
    let chnl = '&chnl=' + '';
    // sort  Sort by relevance or date. Default is relevance.
    let sort = '&sort=' + 'date';
    */
    

    // Built out URL from parameters
    let params = publisher + version + format + query + loc + latlong + co + userIp + userAgent + limit + start + fromAge;
    let builtUrl = 'http://api.indeed.com/ads/apisearch?' + params;
    return builtUrl;
  }
};
