

var playerCreator ={

PlayerFactory : {
    _uniqueId:0,
    createPlayer:function(name,position,number){
        this._uniqueId++;
        return new Player(name,position,number,this.uniqueId);
    }
  },

    PlayersService : function(endpointUrl){
      var playersData = [];
      this.getPlayersByTeam = function(teamName){
        playersData.filter(function(player){
          if(player.team == teamName){
            return true;
            }
        });
      };
      this.getPlayersByPosition = function(position){
        playersData.filter(function(player){
          if(player.position == position){
            return true;
          }
        });
      };
    },
   loadPlayersData: function(){
        $.getJSON(endpointUrl,function(data){
          this.playersData = data.body.players; //maybe play with this
        });
         }, 

 loadPlayersData(); //call the function above every time we create a new service
    } 
 
//my origianl code is below
function addPlayer(){

var pName="Test Name";
var pPosition="Test Position"
var pNumber="Test #";
pName=$("#nameInput").val();
pPosition=$("#positionInput").val();
pNumber=$("#numberInput").val();

var htmlPlayerCard='<div class="player-card">'+
						'<div class="imageWrap">'+
								'<img src="images/fantasyTemp.png" class="playerImage"></img>'+
								'<span class="btn btn-danger" id="removePlayerBtn">Remove</span>'+
							'</div>'+
							'<div>'+
								'<label class="player-nam e">'+pName+'</label>'+
							'</div>'+
							'<div>'+
								'<label class="player-position">'+pPosition+'</label>'+
							'</div>'+
							'<div>'+
								'<label class="player-number">'+pNumber+'</label>'+
							'</div>'+
					'</div>';




$(".player-roster").append($(htmlPlayerCard));
$("#removePlayerBtn"+playerCardId).on("click",removePlayer);
}




$("#addPlayerBtn").on("click",addPlayer);

function removePlayer(){
	$(".player-card").remove();
}




					