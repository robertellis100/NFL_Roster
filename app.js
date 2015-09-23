var roster = {
  players: {},
  addPlayer: function addPlayer(player) {
    if (player.pName && player.pPosition && player.pNumber) {
      this.players[player.pID] = player;
      updatePlayers();
    }
    else {
      alert("Invalid Player Data. Contanct your network adminsitrators, though they wont have a solution to this issue.");
    }
  }
}

var Player = function (na, po, nu, id) {
  this.pName = na;
  this.pPosition = po;
  this.pNumber = nu;
  this.pID = id;
}

var PlayerFactory = {
  uID: 0,
  createPlayer: function (na, po, nu) {
    this.uID++;
    return new Player(na, po, nu, this.uID);
  }
};

var PlayersService = function (endpointUrl) {
  var playersData = [];
  this.getPlayersByTeam = function (teamName) {
    var filtered = playersData.filter(function (player) {
      if (player.team == teamName) {
        return true;
      }
    });
  };
  this.getPlayersByPosition = function (position) {
    playersData.filter(function (player) {
      if (player.position == position) {
        return true;
      }
    });
  };
};

function loadPlayersData() {
  $.getJSON(endpointUrl, function (data) {
    this.playersData = data.players; //maybe play with this
  });
};

loadPlayersData(); //call the function above every time we create a new service
    }
   
    
var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
var playerService = new PlayerService(apiUrl);

$('some-button').on('click', function () {
  var teamSelected = playerService.getPlayersByTeam($());
};
    
    
     
 
//my origianl code is below

function updatePlayers() {
  var rosterDiv = $(".player-roster");
  rosterDiv.htmlPCard('');
  for (var id in roster.players) {
    var player = roster.players[id];
    //without the if statement this loop throws an error
    if (!player) {
      //continue;
    }
    /*function addPlayer(){
    var pName="Test Name";
    var pPosition="Test Position"
    var pNumber="Test #";
    pName=$("#nameInput").val();
    pPosition=$("#positionInput").val();
    pNumber=$("#numberInput").val();*/

    var htmlPCard = '<div class="player-card">' +
						'<div class="imageWrap">' +
      '<img src="images/fantasyTemp.png" class="playerImage"></img>' +
      '<span class="btn btn-danger" id="removePlayerBtn">Remove</span>' +
      '</div>' +
      '<div>' +
      '<label class="player-nam e">' + pName + '</label>' +
      '</div>' +
      '<div>' +
      '<label class="player-position">' + pPosition + '</label>' +
      '</div>' +
      '<div>' +
      '<label class="player-number">' + pNumber + '</label>' +
      '</div>' +
      '</div>';

    rosterDiv.append(htmlPCard);
    //$(".player-roster").append($(htmlPCard));
    //$("#removePlayerBtn"+playerCardId).on("click",removePlayer);
  }
}

//$("#addPlayerBtn").on("click",addPlayer);

// function removePlayer(){
// 	$(".player-card").remove();
// }

//START HERE-- Need to connect form and use jQuery UI Autocomplete widget
//https://api.jqueryui.com/autocomplete/
//https://jqueryui.com/autocomplete/
//Calling the widget--
//http://api.jqueryui.com/jQuery.widget/
//I'll need to removed the "player number" input
// The source of the Autocomplete should be the players[] that was 
//obtained once from the API and stored as a local variable
//supposedly with the PlayerServices constructor;however, I don't fully understand how to use it,
//partly because I am confused if it indeed does grab all the players and store them in the array, 
// or if it is waiting to be used as a search function to compare input and return that...
//YES or NO on the match of the input
t

$(function () {

  $("#playerForm").on('submit', function (event) {
    event.preventDefault();
    var values = $(this).serializeArray();
    var pName = values[0].value;
    var pPosition = values[1].value;
    var pNumber = values[2].value;
    roster.addPlayer(PlayerFactory.createPlayer(pName, pPosition, pNumber));
  });

  $(".player-roster").on('click', '.remove', function (event) {
    delete roster.players[this.id];
    updatePlayers();
  });
})

//code from jake Monday Night 9/21-following along
var rosterController = new RosterController(PlayerFactory);
//var playersFromApi=[];

function PlayerService() {

  var _players = [];

  return {
    loadPlayers: function (cb) {
      var url = "http://bcw-getter.herokuapp.com/?url=";
      var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var apiUrl = url + encodeURIComponent(url2);
      $.getJSON(apiUrl, function (response) {
        _players = response.body.players;
        cb();
      })
    },
    getPlayers: function () {
      return _players.slice();
    },
    getPlayersByTeam: function (team) {
      var requestedTeam = _players.filter(function (player) {
        if (player.pro_team === team) {
          return true;
        }
      })
      return requestedTeam;
    }
  }
}
			
      
      
      
      
      
      
      
      
      
      
      //ps.getPlayerByTeam(#inputTeam.value())
      
      
      
      
      
      //QB autocomplete for use within the draggable acordian
      //$("#QBinput").on("change",function(){
        //filter through the array of players
        //maybe consider making a seperate array of only QBs to start with on load...
        //--which is filtered from the pure data and then deemed my pure list of QBs--
        //or load it when the QB portion of the acordian is opened
        
        
        //therefore for sturture I need an acordian of NFL players
            //the accordinan groups are for each position ie (QB,RB,TE, etc...)
                //within the body of the QB group in the accordian we want to show
                //all the QBs in the NFL --array of objects (pID,pName,pPosition,pNumber)
                //start the fetch to get all QBs from our pure list of players
                    //start the load spinner
                    //fetch of QBs is complete
                    //kill the load spinner
                //within the same div as the QB label in the accordian group
                //place three inputs which, act as filters
                    //each input has an auto complete which 
                    //filters based on the input as it is keyed in which
                    //modifies the array of players in the body of the group
                        //QB group
                        //with three input filters
                        //#nameInput
                            //input filter uses autocomplete
                            //the autocomplete is searching the QB array
                            //as changes happen to #nameInput
                            //the array of players listed in the body is modified
                            //through "display:none"
                              //reference: http://stackoverflow.com/questions/133051/what-is-the-difference-between-visibilityhidden-and-displaynone
                            //and the players that do not match the current criteria are not shown
                                //example of autocomplete looking by first letter in of item in array
                                  //var tags = [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ];
                                    // $( "#autocomplete" ).autocomplete({
                                    //   source: function( request, response ) {
                                    //           var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
                                    //           response( $.grep( tags, function( item ){
                                    //               return matcher.test( item );
                                    //           }) );
                                    //       }
                                    // }); 
                                  //therefore, my attempt at implementing the code is
                                    //  $( "#autocomplete" ).autocomplete({
                                    //   source: function( request, response ) {
                                    //           var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
                                    //           response( $.grep( /-/ps.getQBplayers()/-/), function( item ){
                                    //               return matcher.test( item );
                                    //           }) );
                                    //       }
                                    // }); 
                            
                
      //})
      
      
      //seperate not if I want it to be sticky... to keep the same position in the
      //window as it the window is scrolled
      //http://stickyjs.com/
      // another way to do it
      //http://stackoverflow.com/questions/2907367/have-a-div-cling-to-top-of-screen-if-scrolled-down-past-it
      
      
      