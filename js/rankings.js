var show_inactive = false;

$(document).ready(function()
{
    var pingPongRef = new Firebase("https://crackling-fire-6808.firebaseio.com/hearthstone/");
    pingPongRef.on("value",handleRankings);

    initClickHandlers();
    setShowHideInactive();
});

function handleRankings(snapshot)
{
    var data = snapshot.val();
    Elo.setPingPong(data);
    genRankingsHtml(PingPong);
}

function genRankingsHtml(players)
{
    $("#rankings").empty();
    for( var p=0; p<players.length; p++ )
    {
        if( !players[p]['inactive'] || show_inactive )
        {
            $("#rankings").append(genRankHtml(players[p]));
        }
    }
}

function genRankHtml(player)
{
    var htmlString = "<li>";
    htmlString += "<a class='player' href='player.html?n=" + player['name'] + "'>";
    htmlString += "<span class='player_name'>" + player['name'] + "</span>";
    htmlString += "<span class='player_rank'>" + parseInt(player['rank']) + "</span>";
    htmlString += "<span class='player_rank'>" + parseInt(player['doubles-rank']) + "</span>";
    if( player['inactive'] )
    {
        htmlString += "<div class='player_inactive'>INACTIVE</div>";
    }
    htmlString += "</a>";
    htmlString += "</li>";
    return htmlString;
}

function initClickHandlers()
{
    $("#hidden").on("click", function()
    {
        show_inactive = !show_inactive;
        genRankingsHtml(PingPong);
        setShowHideInactive();
    });
}

function setShowHideInactive()
{
    if( show_inactive )
    {
        $("#hidden").text("Hide Inactive");
    }
    else
    {
        $("#hidden").text("Show Inactive");
    }
}
