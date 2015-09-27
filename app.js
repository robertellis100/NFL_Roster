var playerService = PlayerService();
var playersManager = {
  positions:[],
  teams:[]
};
// var counterPosition;
// var counterTeam;
var allPlayers = {};
playerService.loadPlayers(function () {

  //var players = playerService.getPlayers();
  var players = playerService.getActiveOffensePlayers();

  // players.forEach(function (player) {
  //   $('.player-roster').append('<img src="' + player.photo + '"/>')
  // });
  //photo
  //fullname
  //position
  //jersey = number
  //pro_team

  players.forEach(function (player) {
    allPlayers[player.id] = player;
    if(playersManager.positions.indexOf(player.position)===-1){
      playersManager.positions.push(player.position);
      //counterPosition++;
    } 
    if(playersManager.teams.indexOf(player.pro_team)===-1){
      playersManager.teams.push(player.pro_team);
      //counterTeam++;
    }
    
    $("#player-select").append('<option value="'+player.id+'">'+player.lastname+ ', ' + player.firstname+'</option>');
    
  });
  
  // playersManager.teams.forEach(function(name){
  //   $("#team-select").append('<option value="'+playersManager.teams.indexOf(name)+'">'+playersManager.teams.name+'</option>');
  //   $("#position-select").append('<option value="'+playersManager.positions.indexOf(name)+'">'+playersManager.positions.name+'</option>');
  // })
  
 for (var i=0;i<playersManager.teams.length;i++){
   $("#team-select").append('<option value="'+i+'">'+playersManager.teams[i]+'</option>');
 }; 
 for (var i=0;i<playersManager.positions.length;i++){
   $("#position-select").append('<option value="'+i+'">'+playersManager.positions[i]+'</option>');
 }; 
  
   $( "#player-select" ).select2();   
   //https://select2.github.io/examples.html
   $( "#team-select" ).select2();
   $( "#position-select" ).select2();
   

$('#addPlayerBtn').on('click',function(){
    var playerId = $('#player-select').val();
    var playerToAdd = allPlayers["QB"];
    $('.player-roster').append('<img src="' + playerToAdd.photo + '"/>')
});


});
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
    getActivePlayers: function () {
      var filteredTeam = _players.filter(function(player) {
        if(player.pro_status === "A"){      
          return true;
        }
      });
      return filteredTeam;
    },
    getActiveOffensePlayers: function () {
      return _players.filter(function(player) {
        if(player.pro_status === "A" && player.position === "QB" || player.position === "RB" || player.position === "WR" || player.position === "TE"){      
          return true;
        }
      });
    },    
    
    getPlayersByTeam: function (team) {
      var requestedTeam = _players.filter(function (player) {
        if (player.pro_team === team) {
          return true;
        }
      });
      return requestedTeam;
    },
    
    getActiveOffensePlayersByTeam: function(team){
        //var requestedTeam = 
        this.getActiveOffensePlayers().filter(function(player) {
          if (player.pro_team === team) {
            return true;
          }
        });
      //return requestedTeam;
    },
    
    getActiveOffensePlayersByPosition: function(position){
        var requestedTeam = this.getActiveOffensePlayers().filter(function(player) {
          if (player.position === position) {
            return true;
          }
        });
      return requestedTeam;
    }
    
  }
}
    
			
   
      
      
      
      
      
      
      
      
      
      //ps.getPlayerByTeam(#inputTeam.value())
      
      
      
      
      
      //QB autocomplete for use within the draggable acordian
        //reference:
        //https://jqueryui.com/droppable/#shopping-cart
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
      
      
      