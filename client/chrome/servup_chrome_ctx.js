function serverPost(instruction_str, url_str)
{
    chrome.storage.local.get(["server_ip"]).then((resulta) =>
    {
        chrome.storage.local.get(["handshake"]).then((resultb) =>
        {
            fetch("http://" + resulta.server_ip + ":3000/servup/" + instruction_str,
            {
                method: "POST",
                headers:
                {
                    'Content-Type': 'application/json'
                },
                mode: "no-cors",
                body: JSON.stringify(
                {
                    handshake: resultb.handshake,
                    url: url_str
                })
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
    title: "Cast to TV",
    contexts: ['all']
});
