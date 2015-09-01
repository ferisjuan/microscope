Template.postSubmit.events({
  "submit form": function(e){
     e.preventDefault();

     var post = {
       title: $(e.target).find('[name=title]').val(),
       url: $(e.target).find('[name=url]').val(),
       message: $(e.target).find('[name=message]').val()
     }

     Meteor.call("postInsert", post, function(error, id){
       if(error)
         return alert(error.reason);
       Router.go('postList');
      //  Router.go('postPage', {_id: id});
     });
  }
});
