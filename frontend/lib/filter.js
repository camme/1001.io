var registry = require('npm-stats')();
var async = require('async');
var moment = require('moment');
var request = require('request');
var GitHubApi = require('github');

var github = new GitHubApi({
    version: "3.0.0",
    debug: true,
    protocol: "https",
   // host: "github.my-GHE-enabled-company.com",
    //pathPrefix: "/api/v3", // for some GHEs
    timeout: 5000
});

exports.filter = function(content) {
    //var re = /http:\\\/\\\/local.1001.io(.*?)\\\//gm;
    var re = /http:\\\/\\\/local.1001.io:81\\\//g;
    content = content.replace(re, "/");
    var re = /http:\\\/\\\/www.1001.io:81\\\//g;
    content = content.replace(re, "/");
    return content;
}

exports.process = function(data, next) {

    var template = data.type;

    var processFunction = function(data, next) { next(null, data); };

    switch (template) {
        case "project": processFunction = aggregateProjectInfo; break;
        case "index": processFunction = startPage; break;
    }

    processFunction(data, next);

}


function aggregateProjectInfo(data, done) {


    async.each(data.post.links, function(link, next) {

        if (link.type == "github") {
            var repo = link.link;
            request({
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.60 Safari/537.36"
                },
                url: "https://api.github.com/repos/" + repo + "?client_id=27492085cb89037257e6&client_secret=f5650696614bc1303ac7efdd7738c00eb20a538a",
            }, function(err, res, body) {
                if (err) {
                    console.log(err);
                }
                var repoData = JSON.parse(body);
                link.subscribers = repoData.subscribers_count;
                link.forks = repoData.forks_count;
                link.watchers = repoData.watchers_count;
                next();
            });
        } else if (link.type == "npm") {
            var url = "https://api.npmjs.org/downloads/range/2000-01-01:2020-03-08/" + link.link
            request.get(url, function(err, res, body) {
                var stats = JSON.parse(body);
                link.inAWeek = 0;
                link.inAMonth = 0;
                link.total = 0;
                var aWeekAgo = moment().subtract('days', 8);
                var aMonthAgo = moment().subtract('days', 31);
                stats.downloads.forEach(function(date) {
                    var downloadDate = moment(date.day);
                    if (aWeekAgo.isBefore(date.day)) {
                        link.inAWeek += date.downloads;
                    }
                    if (aMonthAgo.isBefore(date.day)) {
                        link.inAMonth += date.downloads;
                    }
                    link.total += date.downloads;
                });
               next();
            });
        } else {
            next();
        }


    }, function(err) {

        done(err, data);          

    });

    ///repos/:owner/:repo/stats/contributors

}

function startPage(data, next) {

    for(var i = 0, ii = data.projects.length; i < ii; i++){
        var project = data.projects[i];
        for(var j = 0, jj = project.links.length; j < jj; j++){
            var link = project.links[j];
            if (link.link_type == "npm" && link.link.indexOf("/") > -1) {
                project.npm = {
                    name: link.link.substring(link.link.lastIndexOf("/")).replace(/\//g, "")
                };
                    //var downloads = registry.module(project.npm.name).downloads(function() {
                    //console.log(arguments);                                                           
                    //});
            }
        }
    }

    next(null, data);

}


