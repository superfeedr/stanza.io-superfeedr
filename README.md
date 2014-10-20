# stanza.io-superfeedr

## Setting up

```javascript
var client = require('stanza.io').createClient({
    jid: 'user@example.com',
    password: 'hunter2'
});

client.use(require('stanza.io-superfeedr'));

client.connect();
// ...
```

## Methods

```javascript
// 1. Add feed
client.superfeedrAddFeed('http://domain.tld/feed1.xml');

client.superfeedrAddFeed({
    feed: 'http://domain.tld/feed1.xml',
    jid: 'user@example.com',
    format: 'json'
}, function (err, res) {
    // do stuff
});


// 2. Remove feed
client.superfeedrRemoveFeed('http://domain.tld/oldfeed.xml');

client.superfeedrRemoveFeed({
    feed: 'http://domain.tld/oldfeed.xml',
    jid: 'user@example.com'
}, function (err, res) {
    // do stuff
});


// 3. List feeds
client.superfeedrListFeeds(client.jid, 2, function (err, res) {
    if (err) {
        console.log(err.error);
        return;
    }

    console.log(res.pubsub.subscriptions.list);
});


// 4. Retrieve entries

client.superfeedrRetrieveEntries('http://domain.tld/feed1.xml', function (err, res) {
    if (err) {
        console.log(err.error);
        return;
    }

    console.log(res.pubsub.retrieve.items);
});
```
