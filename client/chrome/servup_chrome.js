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

document.getElementById("skip_l_button").onclick = () =>
{
    serverPost("previous", null);
}

document.getElementById("skip_r_button").onclick = () =>
{
    serverPost("next", null);
}

document.getElementById("jog_l_button").onclick = () =>
{
    serverPost("back", null);
}

document.getElementById("jog_r_button").onclick = () =>
{
    serverPost("forward", null);
}

document.getElementById("pause_button").onclick = () =>
{
    serverPost("pause", null);
}

chrome.storage.local.get(["server_ip"]).then((result) =>
{
    document.getElementById("server_ip_input").value = result.server_ip;
});

chrome.storage.local.get(["handshake"]).then((result) =>
{
    document.getElementById("handshake_input").value = result.handshake;
});

setInterval(() =>
{
    let ip_str = document.getElementById("server_ip_input").value;
    let hand_str = document.getElementById("handshake_input").value;
    chrome.storage.local.set({ server_ip: ip_str });
    chrome.storage.local.set({ handshake: hand_str });
}, 750);
