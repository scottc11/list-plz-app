'use strict';

var mongoose = require('mongoose');


var groupSchema = new mongoose.Schema({
  name: String,
  userIds: [String],
  groupCode: String
});

groupSchema.methods.getUserIds = function() {
  return this.userIds;
}

groupSchema.methods.addUser = function(userId) {
  this.userIds.push(userId);
}

groupSchema.methods.generateGroupCode = function() {
  const N = 5; // number of characters to create for code
  this.groupCode = (Math.random().toString(36)+'00000000000000000').slice(2, N+2);
}

var exists = function(groupCode, arrayOfGroupObjects) {
  for (var i = 0; i < arrayOfGroupObjects.length; i++) {
    if (arrayOfGroupObjects[i].groupCode == groupCode) {
      return true;
    }
  }
  return false;
}

// Check to see if the current group code already exists via another group in DB
groupSchema.methods.validateGroupCode = function(callback) {

  var _group = this;

  this.model('Group').find({ groupCode: _group.groupCode }, function(err, data) {
    console.log('-----------------');
    if (err) {
      console.log('there is an error in group schema method validateGroupCode ');
      return res.status(500).json({err: err.message});
    }

    // Generate a new group code that doesn't already exist in DB
    if (data.length >= 1) {
      var groupAlreadyExists = exists(_group.groupCode, data);

      while (groupAlreadyExists) {
        _group.generateGroupCode();
        groupAlreadyExists = exists(_group.groupCode, data);
      }
    }
  })
  .exec(callback);




};



var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
