Template.postItem.helpers({
  ownPost: function () {
    return this.userId == Meteor.userId()
  },
  domain: function () {
    var e = document.createElement('a');
    return e.href = this.url, e.hostname;
  }
});
