import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import './chat.html';
import './chat.css';
import './header.html';

import {Messages} from '../api/messages';

Template.chat.onCreated(function() {
  this.state = new ReactiveDict();

  if (!this.state.get('currentChannel')) {
    this.state.set('currentChannel', 'default');
  }

  this.autorun(() => {
    this.subscribe('messages', this.state.get('currentChannel'));
  });
});

Template.chat.events({
  'keyup .say'(ev, instance) {
    let message = ev.target.value;
    if (ev.keyCode !== 13 || message.length === 0) {
      return;
    }

    Meteor.call('say', instance.state.get('currentChannel'), message);

    ev.target.value = '';
  }
});

Template.chat.helpers({
  messages() {
    return Messages.find({});
  }
});
