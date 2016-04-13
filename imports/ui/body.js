
Template.body.onCreated(() => {
    this.state = new ReactiveDict();
    Meteor.subscribe('messages');
});