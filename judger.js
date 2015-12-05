Papers = new Mongo.Collection("papers");

if (Meteor.isClient) {
  // counter starts at 0

  Template.body.helpers({
    resPapers: function (){
      return Papers.find({member: "resident"}, {sort:{average: -1}});
    },
    memInstPapers: function (){
      return Papers.find({member: "member1"}, {sort:{average: -1}});
    },
    memNonInstPapers: function (){
      return Papers.find({member: "member2"}, {sort:{average: -1}});
    },
    unkPapers: function (){
      return Papers.find( {$nor: [{member: "resident"},{member: "member1"}, {member: "member2"}]}, {sort:{average: -1}});
    }
  });

  Template.body.events({
    "submit .new-paper": function(event){
    event.preventDefault();
    var paperNumber = event.target.paperNumber.value;
    var paperName = event.target.paperName.value;
    var presenter = event.target.presenter.value;
    var science = Number(event.target.science.value);
    var presentation = Number(event.target.presentation.value);
    var importance = Number(event.target.importance.value);
    var questions = Number(event.target.questions.value);
    var total = science + presentation + importance;
    var average = (total/3).toFixed(2);
    var member = event.target.member.value;

    Papers.insert({
      paperNumber: paperNumber,
      paperName: paperName,
      presenter: presenter,
      science: science,
      presentation: presentation,
      importance: importance,
      questions: questions,
      total: total,
      average: average,
      member: member,
      createdAt: new Date()
    });

    event.target.paperNumber.value = "",
    event.target.paperName.value = "",
    event.target.presenter.value = "",
    event.target.science.value = "",
    event.target.presentation.value = "",
    event.target.importance.value = "",
    event.target.questions.value = "";
    event.target.member.value = "";

  },
  "click .delete-paper": function(event){
    event.preventDefault();
    var documentId = this._id;
    Papers.remove({_id: documentId});
  },
  "click [name=upMember]": function(event){
    event.preventDefault();
    var documentId = this._id;
    var upMember = event.target.value;
    Papers.update({_id: documentId}, {$set: {member: upMember}});
  },
  "change [name=upScience]": function(event){
    event.preventDefault();
    var documentId = this._id;
    var upScience = Number(event.target.value);
    Papers.update({_id: documentId}, {$set: {science: upScience}});
  },
  "change [name=upPresentation]": function(event){
    event.preventDefault();
    var documentId = this._id;
    var upPresentation = Number(event.target.value);
    Papers.update({_id: documentId}, {$set: {presentation: upPresentation}});
  },
  "change [name=upImportance]": function(event){
    event.preventDefault();
    var documentId = this._id;
    var upImportance = Number(event.target.value);
    Papers.update({_id: documentId}, {$set: {importance: upImportance}});
  },
  "click .update-paper": function(event){
    event.preventDefault();
    var documentId = this._id;
    var paper = Papers.findOne({_id: documentId});
    var science = Number(paper.science);
    var presentation = Number(paper.presentation);
    var importance = Number(paper.importance);
    var total = science + presentation + importance;
    var average = (total/3).toFixed(2);
    Papers.update({_id: documentId}, {$set: {average: average}});
  }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
