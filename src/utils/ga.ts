type EventParamsMap = {
  page_view: { path: string };
  contact_btn: { cafeName: string };
  calc_btn: { dayCnt: string; cost: string; dailyCharge: string };
  sns_btn: { cafeName: string; type: string; url: string; channelName: string };
};

type EventName = keyof EventParamsMap;
type Data<T extends EventName> = EventParamsMap[T];

/** GA4 wrapper */
const ga = {
  send: <T extends EventName>(eventName: T, data: Data<T>) => {
    const sendTo = process.env.REACT_APP_GA_ID;
    if (sendTo && process.env.NODE_ENV === "production") {
      gtag("event", eventName, {
        send_to: sendTo,
        ...(data ? data : {}),
      });
    } else {
      console.log(`[ga4] ${eventName}: ${JSON.stringify(data)}`);
    }
  },
} as const;

export default ga;
