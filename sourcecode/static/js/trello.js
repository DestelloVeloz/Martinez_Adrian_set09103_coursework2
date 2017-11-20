$(document).ready(function() {

  var authenticationFailure = function() {
   console.log('Failed authentication');

  };

  var boardLoadFailure = function() {
   console.log('Failed to load boards');
  };

 var cardLoadFailure = function() {
    console.log('Failed to load card');
 };

 var actionLoadFailure = function() {
    console.log('Failed to load action');
 };

  var authenticationSuccess = function() {
    updateLoggedIn();
    console.log('Successful authentication');
    var token = Trello.token();
    Trello.members.get("me", function(member){
         var welcometxt="Welcome "+member.fullName+"  ";
         $("#welcome").text(welcometxt);
       });
    //load boards
    loadBoards();

   };

  var updateLoggedIn = function() {
      var isLoggedIn = Trello.authorized();
      console.log(isLoggedIn);
      $("#loggedin").toggle(!isLoggedIn);
      $("#loggedout").toggle(isLoggedIn);
  };

  var loadCards=function(){
    var boardId = $('#boards').val();
    $('#cardsoractions').empty();
    $('#cardsoractions').toggle(true);

    Trello.get(
      '/members/me/cards',
      loadedCards,cardLoadFailure
    );
  }

  var loadActions=function(){
    var boardId = $('#boards').val();
    $('#cardsoractions').empty();
    $('#cardsoractions').toggle(true);
    Trello.get(
      '/members/me/actions',
      loadedActions,actionLoadFailure
    );
  }

  var loadedSelect= function(boards) {

    $.each(boards, function(index, value) {
      $('#boards')
        .append($("<option></option>")
        .attr("value",value.id)
        .text(value.name));


    });

    $('#boardsgroup').toggle(true);
    //load actions type to the board

    $('#actiontype')
      .append($("<option></option>")
      .attr("value","cards")
      .text("Cards"))
      .append($("<option></option>")
      .attr("value","actions")
      .text("Actions"));

    $('#actiontypegroup').toggle(true);

      //call to load card
      if($( "select#actiontype option:checked" ).val()=="cards"){
          loadCards();
      }else{
        //load actions
        loadActions();
      }

  };


  var loadBoards = function() {
    //Get the users boards
    Trello.get(
      '/members/me/boards/',
      loadedSelect,boardLoadFailure
    );
  };

  var loadedCards= function(cards) {
  var table= $("<table id='cardsoractionstable' class='table table-striped table-bordered'></table>");
  var header=$("<tr><th>Card Name</th><th>Card Description</th><th>Date of Last Activity</th><th>Due Date</th><th>Marked Completed ?</th><th>Closed ?</th></tr>");
  header.appendTo(table);
    $.each(cards, function(index, card) {
      $('#cardsoractions').toggle(true);
      var boardId = $( "select#boards option:checked" ).val();
      //only add cards that belong to the currently selected board
      var dueComplete;
      var closed;

      if(card.dueComplte==true){
        dueComplete="Yes";
      }else{
        dueComplete="No";
      }

      if(card.closed==true){
        closed="Yes";
      }else{
        closed="No";
      }

      if(boardId==card.idBoard){
        var tabledata=$("<tr><td class='bg-primary';>"+card.name+"</td><td class='bg-warning' >"+card.desc+"</td><td class='bg-danger' >"+card.dateLastActivity+"</td><td class='bg-info' >"+card.due+"</td><td class='bg-success' >"+dueComplete+"</td><td class='bg-warning'>"+closed+"</td></tr>");
        tabledata.appendTo(table);
        console.log($('#cardsoractionstable').html());
      }

    });


    table.appendTo($('#cardsoractions'));
    console.log($('#cardsoractions').html());
  };

  var loadedActions= function(actions) {
    $.each(actions, function(index, action) {
      var boardId = $( "select#boards option:checked" ).val();
      //only add cards that belong to the currently selected board
      console.log(action.data.board);
      console.log(action.data);
      console.log(action);
      if(typeof action.data.board.id !== 'undefined' && boardId==action.data.board.id){
        var action = $("<p><span class='badge' style='background:red';>" + action.type+ "</span> " + action.date+ "</p>");
        $('#cardsoractions').append(action);
      }

    });
      $('#cardsoractions').toggle(true);
  };

  //attempt to authenticate when page is refreshed
  Trello.authorize({
    interactive:false,
    success: authenticationSuccess

  });

  //login in
  $("#loggedin").click(function(){
    Trello.authorize({
      type: 'popup',
      name: 'Trello Web Api Application',
      scope: {
      read: 'true',
      write: 'true' },
      expiration: 'never',
      success: authenticationSuccess,
      error: authenticationFailure
    });
  });
  //login out
    $("#loggedout").click(function(){
      Trello.deauthorize();
      updateLoggedIn()
      window.location.replace("/");
    });


    $('#boards').change(function() {
      //call to load card
      if($( "select#actiontype option:checked" ).val()=="cards"){
          loadCards();
      }else{
        //load actions
        loadActions();
      }
    });

    $('#actiontype').change(function() {
      //call to load card
      if($( "select#actiontype option:checked" ).val()=="cards"){
          loadCards();
      }else{
        //load actions
        loadActions();
      }
    });


});

