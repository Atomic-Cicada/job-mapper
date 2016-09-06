// let utils = require('./utils.js');

// placeholder publisher id, will be moved to config file
let PUBLISHER_ID = '4974722777681527';

let publisherVar = PUBLISHER_ID;
let versionVar = '2';
let formatVar = 'json';
let queryVar = 'java';
let locVar = 'austin';
let latLongVar = '1';
let coVar = 'us';
let userIpVar = '1.2.3.4';
let userAgentVar = 'Mozilla/%2F4.0%28Firefox%29';
let limitVar = '30';
let startVar = 25;

let queryBuilder = function() {
  /////////////////////////////////
  // Indeed API request parameters
  /////////////////////////////////

  // ----------------- //
  // PARAMETERS IN USE //
  // ----------------- //
  // publisher Publisher ID. Your publisher ID is "PUBLISHER ID HERE". This is assigned when you register as a publisher.
  let publisher = 'publisher=' + publisherVar;
  // v Version. Which version of the API you wish to use. All publishers should be using version 2. Currently available versions are 1 and 2. This parameter is required.
  let version = '&v=' + versionVar;
  // format  Format. Which output format of the API you wish to use. The options are "xml" and "json". If omitted or invalid, the XML format is used.
  let format = '&format=' + formatVar;
  // q Query. By default terms are ANDed. To see what is possible, use our advanced search page to perform a search and then check the url for the q value.
  let query = '&q=' + queryVar;
  // l Location. Use a postal code or a "city, state/province/region" combination.
  let loc = '&l=' + locVar;
  // latlong If latlong=1, returns latitude and longitude information for each job result. Default is 0.
  let latlong = '&latlong=' + latLongVar;
  // co  Search within country specified. Default is us See below for a complete list of supported countries.
  let co = '&co=' + coVar;
  // userip  The IP number of the end-user to whom the job results will be displayed. This field is required.
  let userIp = '&userip=' + userIpVar;
  // useragent The User-Agent (browser) of the end-user to whom the job results will be displayed. This can be obtained from the "User-Agent" HTTP request header from the end-user. This field is required.
  let userAgent = '&useragent=' + userAgentVar;
  // limit Maximum number of results returned per query. Default is 10
  let limit = '&limit=' + limitVar;
  // start Start results at this result number, beginning with 0. Default is 0.
  let start = '&start=' + startVar;


  // --------------------- //
  // PARAMETERS NOT IN USE //
  // --------------------- //
  /*
  // callback  Callback. The name of a javascript function to use as a callback to which the results of the search are passed. This only applies when format=json. For security reasons, the callback name is restricted letters, numbers, and the underscore character.
  let callback = '&callback=' + '';
  // radius  Distance from search location ("as the crow flies"). Default is 25.
  let radius = '&radius=' + '25';
  // sort  Sort by relevance or date. Default is relevance.
  let sort = '&sort=' + 'relevance';
  // st  Site type. To show only jobs from job boards use "jobsite". For jobs from direct employer websites use "employer".
  let siteType = '&st=' + '';
  // jt  Job type. Allowed values: "fulltime", "parttime", "contract", "internship", "temporary".
  let jobType = '&jt=' + '';
  // fromage Number of days back to search.
  let fromAge = '&fromage=' + '';
  // highlight Setting this value to 1 will bold terms in the snippet that are also present in q. Default is 0.
  let highlight = '&highlight=' + '';
  // filter  Filter duplicate results. 0 turns off duplicate job filtering. Default is 1.
  let filter = '&filter=' + '';
  // chnl  Channel Name: Group API requests to a specific channel
  let chnl = '&chnl=' + '';
  */

  // Built out URL from parameters
  let params = publisher + version + format + query + loc + latlong + co + userIp + userAgent + limit + start;
  let builtUrl = 'http://api.indeed.com/ads/apisearch?' + params;
  return builtUrl;
};

let url = queryBuilder();
console.log(url, 'URL');

$.ajax({
  url: url,
  type: 'GET',
  dataType: 'jsonp',
  // headers: window.headers,
  success: function(data) { console.log(data.results, 'RESULTS'); }
});
