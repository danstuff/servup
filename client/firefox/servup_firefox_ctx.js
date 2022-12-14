function serverPost(instruction_str, url_str)
{
    browser.storage.local.get(["server_ip"]).then((resulta) =>
    {
        browser.storage.local.get(["handshake"]).then((resultb) =>
        {
            fetch("http://" + resulta.server_ip + ":3000/" + instruction_str,
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

browser.menus.onClicked.addListener(
    (info, tab) =>
    {
        serverPost("servup", info.linkUrl);
    }
);

browser.menus.create({
    id: "1234",
    title: "Cast to TV",
    contexts: ['all']
});
