const formatSlackMessage = function (message) {
  return {
    text: message
  }
}

const sendSlackMessage = async function (message) {
  // send to slack api chat.postMessage
  return true;
}

module.exports = {formatSlackMessage, sendSlackMessage }
