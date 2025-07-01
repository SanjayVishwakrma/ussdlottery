const sessions = {};

function processUSSDRequest(sessionId, phoneNumber, text) {
  let response = '';
  const input = text.trim() === '' ? [] : text.split('*');
  const step = input.length;

  switch (step) {
    case 0:
      response = `CON Welcome to LuckyDraw!
1. Buy Ticket
2. View Result
3. Help`;
      break;

    case 1:
      if (input[0] === '1') {
        const ticket = Math.floor(100000 + Math.random() * 900000); // 6-digit ticket
        sessions[sessionId] = { phoneNumber, ticket };
        response = `END 🎟️ Ticket #${ticket} booked!
Draw at 9 PM.
Good luck!`;
      } else if (input[0] === '2') {
        const ticketInfo = sessions[sessionId];
        if (ticketInfo) {
          const won = ticketInfo.ticket % 2 === 0;
          response = `END 📄 Ticket #${ticketInfo.ticket}
Result: ${won ? '🎉 You WON!' : '🙁 Not a winner'}
Thanks for playing!`;
        } else {
          response = `END No ticket found for this session.
Please buy one first.`;
        }
      } else {
        response = `END ☎️ Call 1800-123-HELP for assistance.`;
      }
      break;

    default:
      response = `END ❌ Invalid input. Please start again.`;
  }

  return response;
}

module.exports = { processUSSDRequest };