Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function (userId, post, fieldNames) {
    // May only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  postInsert:function(postAttributes){
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url});
      console.log(postWithSameLink);

    //Ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure the post has a title
    if(!postAttributes.title)
      throw new Meteor.Error(422, "please fill a headline");

    // check that there are no previous posts whit the same link
    if(postAttributes.url && postWithSameLink)
      throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);

    //pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'),{
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    // wait for 5 seconds
    if (! this.isSimulation) {
      var Future = Npm.require ('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function(){
        future.return();
      }, 5 * 1000);
      future.wait();
    }

    var postId = Posts.insert(post);

    return postId;
  }
});
