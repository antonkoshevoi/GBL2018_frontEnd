import { randColorName } from './colors';

/**
 *
 * @param thread
 * @returns {*}
 */
export const addColorsForParticipants = (thread) => {
  if (thread.private) {
    thread.user.color = randColorName();
  } else {
    thread.participants.map(participant => ({
      ...participant,
      color: randColorName()
    }));
  }
  return thread;
};

/**
 *
 * @param userId
 * @param thread
 * @returns {*|{}|Details.state.user|user|reducer}
 */
const gerParticipantInfo = (userId, thread) => {
  if (thread.private) {
    return thread.user;
  }
  return thread.participants.find(user => user.id === userId);
};

/**
 *
 * @param thread
 * @returns {*}
 */
export const buildMessagesQueue = (thread) => {
  let messages = [];
  let accumulatedText = [];
  let prevMessage = thread.messages[0];

  thread.messages.forEach(message => {
    if(prevMessage.userId === message.userId) {
      accumulatedText.push(message.body);
    } else {
      prevMessage.body = accumulatedText.reverse().join('\n\n');
      messages.push(prevMessage);
      accumulatedText = [
        message.body
      ]
    }

    prevMessage = message;
  });

  if (thread.messages.length > 0) {
    prevMessage.body = accumulatedText.reverse ().join ('\n\n');
    messages.push(prevMessage);
  }

  thread.messages = messages.map(message => {
    if (message.type === 'in') {
      return {
        ...message,
        user: gerParticipantInfo(message.userId, thread)
      }
    }
    return message;
  });
  return thread;
};

export const addOutgoingMessageToQuery = (thread, messageBody) => {
  let lastMessage = thread.messages[0];

  if (lastMessage && lastMessage.type === 'out') {
    lastMessage.body += '\n\n' + messageBody;
  } else {
    thread.messages.unshift({
      type: 'out',
      sending: true,
      body: messageBody
    });
  }

  return thread;
};

export const addIncomingMessageToQuery = (thread, message) => {
  let lastMessage = thread.messages[0];

  if (lastMessage && lastMessage.type === 'in' && lastMessage.userId === message.userId) {
    lastMessage.body += '\n\n' + message.body;
  } else {
    thread.messages.unshift({
      ...message,
      type: 'in',
      user: gerParticipantInfo(message.userId, thread)
    });
  }

  return thread;
};
