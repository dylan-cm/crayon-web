chrome.browserAction.onClicked.addListener(buttonClicked);
let on = false;
function buttonClicked(tab){
    if(on) on = false;
    else on = true;
    
    let msg = {
        txt: on.toString()
    }

    chrome.tabs.sendMessage(tab.id, msg);
}