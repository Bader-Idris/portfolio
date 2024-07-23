import { LocalNotifications } from "@capacitor/local-notifications";
import { PushNotifications } from "@capacitor/push-notifications";

export const scheduleLocalNotification = async (
  title,
  body,
  id = new Date().getTime(),
  attachments = []
) => {
  await LocalNotifications.schedule({
    notifications: [
      {
        title,
        body,
        id,
        schedule: { at: new Date(Date.now() + 1000 * 5) }, // Schedule for 5 seconds later
        sound: null,
        attachments,
        actionTypeId: "",
        extra: null
      }
    ]
  });
};

export const cancelLocalNotification = async (id) => {
  await LocalNotifications.cancel({ notifications: [{ id }] });
};

export const registerPushNotifications = () => {
  PushNotifications.requestPermissions().then((result) => {
    if (result.receive === "granted") {
      PushNotifications.register();
    }
  });

  PushNotifications.addListener("registration", (token) => {
    console.log("Push registration success, token: " + token.value);
  });

  PushNotifications.addListener("registrationError", (error) => {
    console.error("Push registration error: ", error);
  });

  PushNotifications.addListener("pushNotificationReceived", (notification) => {
    console.log("Push notification received: ", notification);
  });

  PushNotifications.addListener("pushNotificationActionPerformed", (notification) => {
    console.log("Push notification action performed: ", notification);
  });
};

export const scheduleWelcomeNotification = async () => {
  const title = "Congratulations!";
  const body = "Thank you for installing our portfolio app. We hope you enjoy using it!";
  const attachments = [{ id: "welcome-image", url: "../assets/logo.svg" }];

  await scheduleLocalNotification(title, body, new Date().getTime(), attachments);
};
