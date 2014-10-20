var NS = 'http://superfeedr.com/xmpp-pubsub-ext';
var PSNS = 'http://jabber.org/protocol/pubsub';


module.exports = function (stanza) {
    console.log('Loading Superfeedr Content');

    var types = stanza.utils;

    var Status = stanza.define({
        name: 'superfeedrStatus',
        namespace: NS,
        element: 'status',
        fields: {
            feed: types.attribute('feed'),
            title: types.subText(NS, 'title'),
            // publisher: ??? The docs aren't clear on this one
            http: types.subText(NS, 'http'),
            httpCode: types.subAttribute(NS, 'http', 'code'),
            period: types.numberSub(NS, 'period'),
            nextFetch: types.dateSub(NS, 'next_fetch'),
            lastFetch: types.dateSub(NS, 'last_fetch'),
            lastParse: types.dateSub(NS, 'last_parse'),
            lastMaintenanceAt: types.dateSub(NS, 'last_maintenance_at'),
            entriesCountSinceLastMaintenance: types.numberSub(NS, 'entries_count_since_last_maintenance')
        }
    });


    stanza.withDefinition('subscriptions', PSNS, function (Subscriptions) {
        stanza.add(Subscriptions, 'superfeedrPage', {
            get: function () {
                var data = types.getAttributeNS(this.xml, 'page', '');
                if (!data) {
                    return 1;
                }
                var parsed = parseInt(data, 10);
                if (isNaN(parsed)) {
                    return 1;
                }

                return parsed;
            },
            set: function (value) {
                types.setAttributeNS(this.xml, NS, 'page', value.toString());
            }
        });
    });

    stanza.withDefinition('subscribe', PSNS, function (Subscribe) {
        stanza.add(Subscribe, 'superfeedrFormat', {
            get: function () {
                return types.getAttributeNS(this.xml, NS, 'format', 'atom');
            },
            set: function (value) {
                types.setAttributeNS(this.xml, NS, 'format', value);
            }
        });
    });

    stanza.withDefinition('subscription', PSNS, function (Subscription) {
        stanza.extend(Subscription, Status);
    });

    stanza.withDefinition('event', PSNS + '#event', function (Event) {
        stanza.extend(Event, Status);
    });

    // Make things nicer and put the superfeedr namespace declaration on the
    // root pubsub element.
    stanza.withDefinition('pubsub', PSNS, function (PubSub) {
        PubSub.prototype._PREFIXES.superfeedr = NS;
    });
};
