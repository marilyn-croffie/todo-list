function addTask()
{
  var input = document.getElementById("input");
  //get current text from input field
  var newTask = input.value;
  // only add new item to list if some text was entered
  
  if(newTask!="")
    {
      //create a new HTML list item 
      var item = document.createElement("li");
      //add HTML for buttons and new task text
      //note, need to use "because of" in HTML
      item.innerHTML=
'<input type="button" class="done" onclick="markDone(this.parentNode)" value="&#x2713;"/>' +
'<input type="button" class="remove" onclick="remove(this.parentNode)" value="&#x2715;"/>' + 
'<input type="button" class="important" value="!" onclick="setPriority(this.parentNode)" />' + 
newTask;
      
      //add new item as part of existing list
      document.getElementById("tasks").appendChild(item);
      input.value="";
      input.placeholder = "enter next task..."
    }
}

//change styling used for given item
function markDone(item)
{
     item.classList.toggle('finished');
}

function remove(item)
{
  //remove item completely from document
  if (confirm("Are you sure you want to delete this task"))
  {
    item.remove();
  }
     
}

function doAbout()
{
  var bio = document.getElementById("divAbout");
  
  if (!bio.innerHTML)
    {
      bio.innerHTML = "Author is M. Croffie";
      bio.className = "aboutColor";
    }
  else
    {
      bio.innerHTML = "";
    }
}

function setPriority(item)
{ 
  if (!item.classList.contains('priority'))
    {
      item.classList.add('priority');
      item.querySelector('input[value="!"]').classList.add('important');
    }
  else
    {
      item.classList.remove('priority');
      item.querySelector('input[value="!"]').classList.remove('important');
    }
}