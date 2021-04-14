
var user_id ="31mxoni6yvsgdwf3cdu7dv4nm3fi";
var client_id ="3820dc39516a420e98bb54fdb483bbed";
var client_secret ="6cb3960862f84aa8aff63e9226ff1f17";

var redirect_uri = encodeURI("// http://127.0.0.1:5500/Dom/index.html");

var Authorized = 'https://accounts.spotify.com/authorize';
var Token = 'https://accounts.spotify.com/api/token';
var webapi = 'https://api.spotify.com/v1/me';
var playlist =`https://api.spotify.com/v1/users/${user_id}/playlists`


var scope = [
    "playlist-modify-private",
    "user-follow-modify"
]
// var access_token= "BQCbn9Dq5mM2A5AKtjzEfSmwKsOUCRRcY3EGIgkQ-VTwvR1B0LZCdkRggQ8UEaYkFiR89qOU1fVKd31VXmk"
// var token_type= "Bearer"


function onPageLoad(){
    let query = window.location.search;
    if(query.length>0){
        const urlParams = new URLSearchParams(query);
        let code = urlParams.get('code')
        fetchAccessToken(code);
        // console.log(code);
        document.getElementById('home').style.display ="none";
        document.getElementById('spotify_content').style.display ="block"; 
    }    
}
function Authentication(){   
    
    let authURL = `
    ${Authorized}?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=user-follow-modify&state=e21392da45dbf4&code_challenge=KADwyz1X~HIdcAG20lnXitK6k51xBP4pEMEZHmCneHD1JhrcHjE1P3yU_NjhBz4TdhV6acGo16PCd10xLwMJJ4uCutQZHw&code_challenge_method=S256
    `
    window.location.href = authURL;
     
    // console.log(window.location.href);
}

function fetchAccessToken(code){
    let body = `grant_type=client_credentials&code=${code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`;
    callAuthorizationApi(body);  
    // console.log(body);
    
}

function callAuthorizationApi(body){   
    
    // fetch(Token,{
    //     method:"POST",
    //     body:body,
    //     headers: {
    //         "Content-type":'application/x-www-form-urlencoded',
    //         'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
    //     }
    // })
    // .then((resp)=>{
    //     console.log(resp);
    //     console.log(resp.url);
    // })
    // .catch(err=>console.log(err))

    let xhr = new XMLHttpRequest();
    xhr.open("POST",Token,true);
    xhr.setRequestHeader('content-Type','application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization','Basic '+ btoa(client_id+":"+client_secret));
    xhr.send(body);
    console.log(xhr)
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if(this.status == 200){
        var token_object = JSON.parse(this.responseText);

        var access_token = token_object.access_token;
        var token_type = token_object.token_type;
        console.log(access_token,token_type);
        
        // callPlaylist(access_token,token_type)
    }
}

function callPlaylist(access_token,token_type){
    // fetch('https://api.spotify.com/v1/me',{
    //     method:"POST",
    //     headers:{
    //         'content-Type':'application/x-www-form-urlencoded',
    //         'Authorization': 'Bearer ' + access_token,
    //     }
    // })
    // .then((resp)=>{
    //         console.log(resp);
    //         console.log(resp.url);
    // })
    // .then((data)=>console.log(data))

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("POST", "https://api.spotify.com/v1/me");
    oReq.setRequestHeader('content-Type','application/x-www-form-urlencoded');    
    oReq.setRequestHeader('Authorization',"Bearer "+access_token);
    oReq.send();
    console.log(oReq);
    // let xhr = new XMLHttpRequest();
    // xhr.open("POST",playlist,true);
    // xhr.setRequestHeader(');
    // xhr.setRequestHeader('Authorization',token_type+" "+access_token);
    // xhr.send(playlist);
    // console.log(xhr)
    // xhr.onload = handleAuthorizationResponse;
}

function reqListener () {
    console.log(this.responseText);
  }

function searchList(){
    document.getElementById('search').style.display ="block";
}
