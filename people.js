var People = new Meteor.Collection("people");

if(Meteor.isClient) {
 
 /* Read */
 Template.personList.people = function() {
   return People.find();
 };

 /* Create */
 Template.personForm.events({
  'click button' : function(e, t) {
    var el = t.find("#name");
    People.insert({name: el.value });
    el.value = "";
  },
  'keypress input': function(e, t){
    if(e.keyCode == 13) {
      var el = t.find("#name");
      People.insert({name: el.value });
      el.value = "";
    }
  }
 });

 /* Update */
 Template.person.editing = function(){
  return Session.get("edit-" + this._id);
 };
 Template.person.events({
  'click .name' : function(e, t) {
    Session.set("edit-" + t.data._id, true);
  },
  'keypress input': function(e, t){
    if(e.keyCode === 13) {
      // var persn = People.findOne(t.data._id);
      People.update(t.data._id, { $set: { name: e.currentTarget.value }});
      Session.set("edit-" + t.data._id, false);
    }
  },
  /* Delete */
  'click .del' : function(e,t){
    People.remove(t.data._id);
  }
 });
}

