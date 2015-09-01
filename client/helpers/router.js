
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function () {
    return Meteor.subscribe('Posts');
  }
});

Router.map(function () {
  this.route('postsList', {path: '/'});

  this.route('postPage', {
    path: '/posts/:_id',
    data: function () {
      return Posts.findOne(this.params._id);
    }
  });

  this.route('postSubmit', {
    path: '/submit'
  });
});

var requireLogin = function () {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate)
    } else {
    this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'})
Router.onBeforeAction(requireLogin, {only: 'postSubmit'})
