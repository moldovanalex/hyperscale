function getHtmlEmailContent(message, fileName) {
  const formattedMessage = convertMessageToList(message);

  return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
            }
            .logo {
                text-align: center;
                margin-bottom: -1rem;
            }
            .hyperscale {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 3rem;
            }
            .content {
                font-size: 16px;
                line-height: 1.5;
                color: #333333;
                text-align: left;
            }
            .content h2 {
                font-size: 24px;
                color: #444444;
                margin-bottom: 10px;
            }
            ul {
                padding: 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <img src="https://hyperscale-storage162636-dev.s3.eu-west-2.amazonaws.com/public-assets/mainLogo.png" alt="Your Logo" width="200">
            </div>
            <div class="hyperscale">
                HYPERSCALE
            </div>
            <div class="content">
                Here are the insights that we've generated from your file <b>${fileName.replace(
                  ".json",
                  ""
                )}</b>:
                ${formattedMessage}
            </div>
        </div>
    </body>
    </html>`;
}

function convertMessageToList(message) {
  const items = message.split("\n").filter((item) => item.trim() !== "");

  let listHtml = "<ul>";
  items.forEach((item) => {
    listHtml += `<li>${item.trim().replace(/^\d+\. /, "")}</li>`;
  });
  listHtml += "</ul>";

  return listHtml;
}

module.exports = {
  getHtmlEmailContent,
};
