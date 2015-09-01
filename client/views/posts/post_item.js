Template.postItem.helpers({
  domain: function () {
    var e = document.createElement('a');
    return e.href = this.url, e.hostname;
  }
});
