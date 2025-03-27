const admin = require("firebase-admin");

// Load your service account JSON
const serviceAccount = require("../dmca-android-47445-firebase-adminsdk-fbsvc-6ff3db5ec8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to send a single notification
const sendNotification = async (deviceToken, title, body) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: deviceToken, // Target device token
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

// Function to send notifications to multiple devices
const sendMulticastNotification = async (deviceTokens, title, body) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    tokens: deviceTokens, // Array of device tokens
  };
  console.log(deviceTokens)
  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log("Multicast Notification sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

sendNotification('dRW02WdKQbSzxZew0sL3QJ:APA91bFUZk0Pt0_Iy7QqPYEJZcR-D9SGF8dafDJ-rxW1jExnumRCOAI3WleJxTD2INYgoGkeFlHXHRTA8SZIlZjWs4uVkDTZ2JsDkpuHaEIBpEukP3nGKnU', 'dfdf', 'dfdf')
// Export the functions
module.exports = {
  sendNotification,
  sendMulticastNotification,
};
