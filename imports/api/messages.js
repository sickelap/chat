export const Messages = Meteor.Collection('messages');

if (Meteor.isServer) {
    Meteor.publish('messages', (channel, limit = 50) => {
        check(channel, String);
        check(limit, Number);

        return Messages.find({channel}, {limit});
    });
}

Meteor.methods({
    'say'(channel, message) {
        check(channel, String);
        check(message, String);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Messages.insert({
            channel,
            message,
            userId: Meteor.userId(),
            username: Meteor.user().username,
            createdAt: new Date()
        });
    }
});