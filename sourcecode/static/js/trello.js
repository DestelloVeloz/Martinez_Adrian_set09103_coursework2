$(document).ready(function() {
  var token;
  var authenticationSuccess = function() {
   updateLoggedIn();
   console.log('Successful authentication');
   token = Trello.token();
   Trello.members.get("me", function(member){
        var welcometxt="Welcome "+member.fullName+"  ";
        $("#welcome").text(welcometxt);
      });
   //window.location.replace("/);
  };

  var authenticationFailure = function() {
   console.log('Failed authentication');
   alert('Failed authentication');
  };



  var updateLoggedIn = function() {
      var isLoggedIn = Trello.authorized();
      console.log(isLoggedIn);
      $("#loggedin").toggle(!isLoggedIn);
      $("#loggedout").toggle(isLoggedIn);
  };

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

    $("#loggedout").click(function(){

      Trello.deauthorize();
      updateLoggedIn()
      window.location.replace("/");
    });


});

