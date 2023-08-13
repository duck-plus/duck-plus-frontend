type EventParamsMap = {
  page_view: { path: string };
  contact_btn: {};
  calc_btn: { dayCnt: string; cost: string; dailyCharge: number };
  sns_btn: { type: string; url: string; channelName: string };
};

type EventName = keyof EventParamsMap;
type Data<T extends EventName> = EventParamsMap[T];

/** GA4 wrapper */
const ga = {
  send: <T extends EventName>(eventName: T, data: Data<T>) => {
    if (process.env.NODE_ENV === "production" && process.env.REACT_APP_GA_ID) {
      gtag("event", eventName, {
        send_to: process.env.REACT_APP_GA_ID,
        ...(data ? data : {}),
      });
    } else {
      console.log(`[ga4] ${eventName}: ${JSON.stringify(data)}`);
    }
  },
} as const;

export default ga;
