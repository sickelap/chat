import './chat.html';

Template.chat.events({
    'click .logout'() {
        Meteor.logout();
    },
    'keyup .say'(ev, instance) {
        let value = ev.target.value;
        if (ev.keyCode !== 13 || value.length === 0) {
            return;
        }

        Meteor.call('say', instance.get('currentChannel'), message);

        ev.target.value = '';
    }
});

Template.chat.onCreated(() => {
    this.getCurrentChannel = () => this.state.get('currentChannel');

    this.autorun(() => {
        this.subscribe('messages', this.getCurrentChannel());
    });
});

Template.chat.helpers({
    messages() {
    }
});
