function serverPost(instruction_str, url_str)
{
    chrome.storage.local.get(["server_ip"]).then((resulta) =>
    {
        chrome.storage.local.get(["handshake"]).then((resultb) =>
        {
            fetch("http://" + resulta.server_ip + ":3000/servup/" +
                instruction_str +
                "/" + resultb.handshake +
                "/" + encodeURIComponent(url_str),
            {
                method: "POST",
                mode: "no-cors"
            });
        });
    });
}

chrome.contextMenus.onClicked.addListener(
    (info, tab) =>
    {
        serverPost("play", info.linkUrl);
    }
);

chrome.contextMenus.create({
    id: "1234",
    title: "Cast to Servup Server",
    contexts: ['all']
});
