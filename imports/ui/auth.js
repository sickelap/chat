import './auth.html';
import './auth.css';

Template.login.events({
  'click .login-with-facebook'() {
    Meteor.loginWithFacebook();
  },
  'click .login-with-google'() {
    Meteor.loginWithGoogle();
  },
  'click .login-with-twitter'() {
    Meteor.loginWithTwitter();
  }
});

Template.logout.events({
  'click .logout'() {
    Meteor.logout();
  }
});