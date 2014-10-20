var NS = 'http://superfeedr.com/xmpp-pubsub-ext';
var FIREHOSE = 'firehoser.superfeedr.com';


module.exports = function (client, stanzas) {
    stanzas.use(require('./lib/stanzas'));

    client.superfeedrAddFeed = function (feedInfo, cb) {
        if (typeof feedInfo === 'string') {
            feedInfo = {
                feed: feedInfo
            };
        }

        client.subscribeToNode(FIREHOSE, {
            node: feedInfo.feed,
            jid: feedInfo.jid,
            superfeedrFormat: feedInfo.format
        }, cb);
    };

    client.superfeedrRemoveFeed = function (feedInfo, cb) {
        if (typeof feedInfo === 'string') {
            feedInfo = {
                feed: feedInfo
            };
        }

        client.unsubscribeFromNode(FIREHOSE, {
            node: feedInfo.feed,
            jid: feedInfo.jid
        }, cb);
    };

    client.superfeedrListFeeds = function (jid, page, cb) {
        client.getSubscriptions(FIREHOSE, {
            jid: jid,
            superfeedrPage: page
        }, cb);
    };

    client.superfeedrRetrieveEntries = function (feed, cb) {
        client.getItems(FIREHOSE, feed, false, cb);
    };
};
