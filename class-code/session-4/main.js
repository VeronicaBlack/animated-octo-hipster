var app  = (function() {  
  
  var elements = {
    noteField : document.querySelector('.write-note'),
    noteSubmit : document.querySelector('.submit-note'),
    noteList : document.querySelector('.notes')
  };
      
  window.notes = [];
  
  var attachEvents = function() {
    elements.noteSubmit.addEventListener('click', function(event) {
      event.preventDefault();
        var fieldValue = elements.noteField.value;
        
        var newNoteModel = new NoteModel(fieldValue);
        notes.push(newNoteModel);
        
        new NoteView(newNoteModel, elements.noteList).init();
        
        elements.noteField.value = '';
    });
  };

  var addAsFirstChild = function(parent, child) {
    var parentNode = parent,
      childNode = child;

    if(parentNode.firstChild) {
      parentNode.insertBefore(child, parent.firstChild);
    } else {
      parentNode.appencChild(child);
    }

  };

  var NoteModel = function(noteBodyText) {
    this.noteBodyText = noteBodyText;
    this.liked = false;
  };

  var NoteView = function(model, parentElement) {
    
    var index = notes.indexOf(model);

    this.listItem = document.createElement('li');
    this.paragraph = document.createElement('p');
    this.listItem.classList.add('note');
    
    this.paragraph.innerHTML = notes[index].noteBodyText;
    
    this.listItem.appendChild(this.paragraph);
    this.actions = document.createElement('ul');
    this.actions.classList.add('actions');
    this.removeButton = document.createElement('li');
    this.likeButton = document.createElement('li');
    this.removeButton.classList.add('remove' ,'icon-cancel');
    this.likeButton.classList.add('like' ,'icon-heart');
    this.actions.appendChild(this.removeButton);
    this.actions.appendChild(this.likeButton);
    this.listItem.appendChild(this.actions);
    elements.noteList.appendChild(this.listItem);
    var that = this;
    this.liked = false;
    this.like = function() {
      notes[index].liked = !notes[index].liked;
      //localStorage.setItem('notes', JSON.stringify(notes));
      console.log('I am liked', notes[index].liked);
      that.likeButton.classList.toggle('liked');
    };
    this.remove = function() {
      console.log('I am a goner');
      notes.splice(index,1);
      //localStorage.setItem('notes', JSON.stringify(notes));
      elements.noteList.removeChild(that.listItem);
    };
    this.attachEvents = function() {
      this.likeButton.addEventListener('click', this.like);
      this.removeButton.addEventListener('click', this.remove);
    };
    this.init = function() {
      this.attachEvents();
      addAsFirstChild(elements.noteList, this.listItem);
      return this;
    }; 
  };

  var init = function() {
    console.log('App init');
    attachEvents();
  };
  
  return {
    init : init,
    elements : elements,
    notes : notes
  };
})();

window.addEventListener('DOMContentLoaded', app.init);

/*
var dude = (function() {
  	
  var name = 'Justin Charles';
  var getName = function() {
  	return name;
  };
  var setName = function(newName) {
  	name = newName;
  };
  
  return { 
    getName : getName,
    setName : setName
  };  
  
})();


var shouter = (function() {
  var shout = function(name) {
     alert(name);
  };
  
  return {
    shout : shout
  };
  
})();
*/
/*
var Person = function(firstName, lastName, age, profession, hobby) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.profession = profession;
  this.hobby = hobby;
};
*/