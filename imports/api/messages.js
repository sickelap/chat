import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', (channel) => {
    return Messages.find({channel}, {limit: 1000});
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
      name: Meteor.user().profile.name,
      createdAt: new Date()
    });
  }
});
