function serverPost(instruction_str, url_str)
{
    browser.storage.local.get(["server_ip"]).then((resulta) =>
    {
        browser.storage.local.get(["handshake"]).then((resultb) =>
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

browser.menus.onClicked.addListener(
    (info, tab) =>
    {
        serverPost("play", info.linkUrl);
    }
);

browser.menus.create({
    id: "1234",
    title: "Cast to Servup Server",
    contexts: ['all']
});
